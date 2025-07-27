// services/QuestionStorage.js
import ReactNativeBlobUtil from 'react-native-blob-util';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

class QuestionStorage {
  appDir;
  imageDir;
  constructor() {
    this.appDir = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/YKSApp`;
    this.imageDir = `${this.appDir}/images`;
    this.initializeDirectories();
  }

  // Uygulama başlangıcında klasörleri oluştur
  async initializeDirectories() {
    try {
      const appExists = await ReactNativeBlobUtil.fs.exists(this.appDir);
      if (!appExists) {
        await ReactNativeBlobUtil.fs.mkdir(this.appDir);
        console.log('App directory created');
      }

      const imageExists = await ReactNativeBlobUtil.fs.exists(this.imageDir);
      if (!imageExists) {
        await ReactNativeBlobUtil.fs.mkdir(this.imageDir);
        console.log('Image directory created');
      }
    } catch (error) {
      console.error('Directory initialization error:', error);
    }
  }

  // Soru kaydetme
  async saveQuestion(croppedImageUri, ocrText, subject = 'matematik') {
    try {
      await this.initializeDirectories();

      const timestamp = Date.now();
      const fileName = `question_${timestamp}.jpg`;
      const permanentPath = `${this.imageDir}/${fileName}`;

      // Temp'ten permanent'a kopyala (moveFile yerine copyFile daha güvenli)
      await ReactNativeBlobUtil.fs.cp(
        croppedImageUri.uri.replace('file://', ''),
        permanentPath,
      );
      console.log('Image copied to:', permanentPath);

      const question = {
        id: `q_${timestamp}`,
        imagePath: permanentPath,
        fileName: fileName,
        ocrText: ocrText || '',
        subject: subject,
        dateAdded: new Date().toISOString(),
        reviewCount: 0,
        isMastered: false,
        notes: '',
        difficulty: 1,
        tags: [],
      };

      // Mevcut soruları al
      const questions = this.getQuestions();
      questions.unshift(question);

      // MMKV'ye kaydet
      storage.set('questions', JSON.stringify(questions));
      console.log('Question saved with ID:', question.id);

      return question;
    } catch (error) {
      console.error('Save question error:', error);
      throw error;
    }
  }

  // Tüm soruları getir
  getQuestions() {
    try {
      const questions = storage.getString('questions');
      return questions ? JSON.parse(questions) : [];
    } catch (error) {
      console.error('Get questions error:', error);
      return [];
    }
  }

  // Filtrelenmiş sorular
  getFilteredQuestions(filter = 'all') {
    const questions = this.getQuestions();

    switch (filter) {
      case 'needs_review':
        return questions.filter(q => !q.isMastered);
      case 'mastered':
        return questions.filter(q => q.isMastered);
      case 'recent':
        return questions.slice(0, 20);
      default:
        return questions;
    }
  }

  // Konuya göre filtrele
  getQuestionsBySubject(subject) {
    const questions = this.getQuestions();
    return questions.filter(q => q.subject === subject);
  }

  // Soru güncelleme
  updateQuestion(questionId, updates) {
    try {
      const questions = this.getQuestions();
      const index = questions.findIndex(q => q.id === questionId);

      if (index !== -1) {
        questions[index] = {...questions[index], ...updates};
        storage.set('questions', JSON.stringify(questions));
        console.log('Question updated:', questionId);
        return questions[index];
      }

      return null;
    } catch (error) {
      console.error('Update question error:', error);
      return null;
    }
  }

  // Soru silme
  async deleteQuestion(questionId) {
    try {
      const questions = this.getQuestions();
      const questionIndex = questions.findIndex(q => q.id === questionId);

      if (questionIndex !== -1) {
        const question = questions[questionIndex];

        // Image dosyasını sil
        const fileExists = await ReactNativeBlobUtil.fs.exists(
          question.imagePath,
        );
        if (fileExists) {
          await ReactNativeBlobUtil.fs.unlink(question.imagePath);
          console.log('Image file deleted:', question.imagePath);
        }

        // Listeden çıkar
        questions.splice(questionIndex, 1);
        storage.set('questions', JSON.stringify(questions));

        console.log('Question deleted:', questionId);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Delete question error:', error);
      return false;
    }
  }

  // İnceleme sayısını artır
  incrementReviewCount(questionId) {
    const question = this.getQuestionById(questionId);
    if (question) {
      return this.updateQuestion(questionId, {
        reviewCount: question.reviewCount + 1,
        lastReviewed: new Date().toISOString(),
      });
    }
    return null;
  }

  // Öğrenildi olarak işaretle
  markAsMastered(questionId, isMastered = true) {
    return this.updateQuestion(questionId, {isMastered});
  }

  // ID ile soru getir
  getQuestionById(questionId) {
    const questions = this.getQuestions();
    return questions.find(q => q.id === questionId);
  }

  // Storage stats
  getStats() {
    const questions = this.getQuestions();
    return {
      total: questions.length,
      mastered: questions.filter(q => q.isMastered).length,
      needsReview: questions.filter(q => !q.isMastered).length,
      subjects: [...new Set(questions.map(q => q.subject))],
    };
  }

  // Temizlik - eski temp dosyaları sil
  async cleanupTempFiles() {
    try {
      const tempDir = ReactNativeBlobUtil.fs.dirs.CacheDir;
      const files = await ReactNativeBlobUtil.fs.ls(tempDir);

      for (const file of files) {
        if (file.startsWith('RNCamera') || file.startsWith('temp_')) {
          const filePath = `${tempDir}/${file}`;
          const exists = await ReactNativeBlobUtil.fs.exists(filePath);
          if (exists) {
            await ReactNativeBlobUtil.fs.unlink(filePath);
          }
        }
      }
      console.log('Temp files cleaned');
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }

  // Backup/Export functionality
  async exportQuestions() {
    try {
      const questions = this.getQuestions();
      const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        questions: questions,
      };

      const exportPath = `${ReactNativeBlobUtil.fs.dirs.DownloadDir}/yks_questions_backup.json`;
      await ReactNativeBlobUtil.fs.writeFile(
        exportPath,
        JSON.stringify(exportData, null, 2),
        'utf8',
      );

      console.log('Questions exported to:', exportPath);
      return exportPath;
    } catch (error) {
      console.error('Export error:', error);
      throw error;
    }
  }

  // Storage info
  async getStorageInfo() {
    try {
      const questions = this.getQuestions();
      let totalSize = 0;

      for (const question of questions) {
        const exists = await ReactNativeBlobUtil.fs.exists(question.imagePath);
        if (exists) {
          const stat = await ReactNativeBlobUtil.fs.stat(question.imagePath);
          totalSize += parseInt(stat.size);
        }
      }

      return {
        questionCount: questions.length,
        totalSizeBytes: totalSize,
        totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      };
    } catch (error) {
      console.error('Storage info error:', error);
      return {questionCount: 0, totalSizeBytes: 0, totalSizeMB: '0'};
    }
  }
}

// Singleton instance
export default new QuestionStorage();
