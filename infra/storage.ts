// services/QuestionStorage.js - Debug Version
import ReactNativeBlobUtil from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Question} from '../types/question.types';

const STORAGE_KEY = 'questions';

class QuestionStorage {
  appDir;
  imageDir;
  constructor() {
    this.appDir = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/YKSApp`;
    this.imageDir = `${this.appDir}/images`;
    this.initializeDirectories();
  }

  async initializeDirectories() {
    try {
      console.log('🗂️ Initializing directories...');
      console.log('📁 App dir:', this.appDir);
      console.log('🖼️ Image dir:', this.imageDir);

      const appExists = await ReactNativeBlobUtil.fs.exists(this.appDir);
      console.log('📁 App directory exists:', appExists);

      if (!appExists) {
        await ReactNativeBlobUtil.fs.mkdir(this.appDir);
        console.log('✅ App directory created');
      }

      const imageExists = await ReactNativeBlobUtil.fs.exists(this.imageDir);
      console.log('🖼️ Image directory exists:', imageExists);

      if (!imageExists) {
        await ReactNativeBlobUtil.fs.mkdir(this.imageDir);
        console.log('✅ Image directory created');
      }

      // Directory contents kontrol et
      await this.debugDirectoryContents();
    } catch (error) {
      console.error('❌ Directory initialization error:', error);
    }
  }

  async debugDirectoryContents() {
    try {
      console.log('🔍 Checking directory contents...');

      const appDirExists = await ReactNativeBlobUtil.fs.exists(this.appDir);
      if (appDirExists) {
        const appFiles = await ReactNativeBlobUtil.fs.ls(this.appDir);
        console.log('📁 App directory files:', appFiles);
      }

      const imageDirExists = await ReactNativeBlobUtil.fs.exists(this.imageDir);
      if (imageDirExists) {
        const imageFiles = await ReactNativeBlobUtil.fs.ls(this.imageDir);
        console.log('🖼️ Image directory files:', imageFiles);
      }
    } catch (error) {
      console.error('❌ Debug directory error:', error);
    }
  }

  async saveQuestion(
    croppedImageUri,
    ocrText,
    subjectId = 0,
    subSubjectId = 0,
    isTyt: boolean,
  ) {
    try {
      console.log('💾 Starting save question...');
      console.log('📸 Cropped image URI:', croppedImageUri);

      await this.initializeDirectories();

      const timestamp = Date.now();
      const fileName = `question_${timestamp}.jpg`;
      const permanentPath = croppedImageUri
        ? `${this.imageDir}/${fileName}`
        : undefined;

      console.log('📄 Generated filename:', fileName);
      console.log('📍 Permanent path:', permanentPath);

      if (croppedImageUri && permanentPath) {
        // URI'yi temizle
        let sourceUri = croppedImageUri.uri || croppedImageUri;
        if (typeof sourceUri === 'string') {
          sourceUri = sourceUri.replace('file://', '');
        }

        console.log('🔗 Source URI (cleaned):', sourceUri);
        console.log('🎯 Target path:', permanentPath);

        // Kaynak dosyanın var olup olmadığını kontrol et
        const sourceExists = await ReactNativeBlobUtil.fs.exists(sourceUri);
        console.log('✅ Source file exists:', sourceExists);

        if (!sourceExists) {
          console.error('❌ Source file does not exist!');
          throw new Error(`Source file does not exist: ${sourceUri}`);
        }

        // Dosyayı kopyala
        await ReactNativeBlobUtil.fs.cp(sourceUri, permanentPath);
        console.log('✅ Image copied successfully');

        // Kopyalanan dosyanın var olup olmadığını kontrol et
        const targetExists = await ReactNativeBlobUtil.fs.exists(permanentPath);
        console.log('✅ Target file exists after copy:', targetExists);

        if (targetExists) {
          const stats = await ReactNativeBlobUtil.fs.stat(permanentPath);
          console.log('📊 File stats:', {
            size: stats.size,
            type: stats.type,
            lastModified: stats.lastModified,
          });
        }
      }

      // const formData = new FormData();
      // formData.append('image', {
      //   permanentPath,
      //   type: 'image/jpeg',
      //   name: fileName,
      // });

      // const res = await fetch('http://128.8.0.80:5000/ocr', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      // const json = await res.json();
      // console.log('json.text', json.text);

      const question: Question = {
        id: `q_${timestamp}`,
        imagePath: permanentPath,
        fileName,
        ocrText: ocrText || '',
        subjectId,
        subSubjectId,
        dateAdded: new Date().toISOString(),
        reviewCount: 0,
        isMastered: false,
        notes: '',
        examId: isTyt ? 0 : 1,
        difficulty: 1,
        tags: [],
        solutionImagepath: undefined,
      };

      console.log('📝 Question object created:', {
        id: question.id,
        imagePath: question.imagePath,
        ocrTextLength: question.ocrText.length,
      });

      const questions = await this.getQuestions();
      questions.unshift(question);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(questions));

      console.log('💾 Question saved to AsyncStorage');
      console.log('📊 Total questions:', questions.length);

      // Save sonrası directory'yi tekrar kontrol et
      await this.debugDirectoryContents();

      return question;
    } catch (error) {
      console.error('❌ Save question error:', error);
      throw error;
    }
  }

  async getQuestions(): Promise<Question[]> {
    try {
      console.log('📖 Getting questions from AsyncStorage...');
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const questions = stored ? JSON.parse(stored) : [];

      console.log('📊 Found questions in storage:', questions.length);

      // Her question için file existence kontrol et
      for (const question of questions) {
        if (question.imagePath) {
          const exists = await ReactNativeBlobUtil.fs.exists(
            question.imagePath,
          );
          console.log(`🖼️ Question ${question.id} image exists:`, exists);
          if (!exists) {
            console.warn(
              `⚠️ Missing image for question ${question.id}: ${question.imagePath}`,
            );
          }
        }
      }

      return questions;
    } catch (error) {
      console.error('❌ Get questions error:', error);
      return [];
    }
  }

  async getFilteredQuestions(filter = 'all') {
    console.log('🔍 Getting filtered questions:', filter);
    const questions = await this.getQuestions();

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

  async deleteQuestion(questionId) {
    try {
      console.log('🗑️ Deleting question:', questionId);
      const questions = await this.getQuestions();
      const index = questions.findIndex(q => q.id === questionId);

      if (index !== -1) {
        const question = questions[index];
        console.log('📍 Question image path:', question.imagePath);

        if (question.imagePath) {
          const fileExists = await ReactNativeBlobUtil.fs.exists(
            question.imagePath,
          );
          console.log('🖼️ Image file exists before delete:', fileExists);

          if (fileExists) {
            await ReactNativeBlobUtil.fs.unlink(question.imagePath);
            console.log('✅ Image file deleted');
          }
        }

        questions.splice(index, 1);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(questions));

        console.log('✅ Question deleted from storage');
        return true;
      }

      console.log('❌ Question not found');
      return false;
    } catch (error) {
      console.error('❌ Delete question error:', error);
      return false;
    }
  }

  async updateQuestion(questionId, updates) {
    try {
      const questions = await this.getQuestions();
      const index = questions.findIndex(q => q.id === questionId);

      if (index !== -1) {
        questions[index] = {...questions[index], ...updates};
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
        console.log('✅ Question updated:', questionId);
        return questions[index];
      }

      return null;
    } catch (error) {
      console.error('❌ Update question error:', error);
      return null;
    }
  }

  async incrementReviewCount(questionId) {
    const question = await this.getQuestionById(questionId);
    if (question) {
      return this.updateQuestion(questionId, {
        reviewCount: question.reviewCount + 1,
        lastReviewed: new Date().toISOString(),
      });
    }
    return null;
  }

  async markAsMastered(questionId, isMastered = true) {
    return this.updateQuestion(questionId, {isMastered});
  }

  async getQuestionById(questionId) {
    const questions = await this.getQuestions();
    return questions.find(q => q.id === questionId);
  }

  async getStats() {
    const questions = await this.getQuestions();
    return {
      total: questions.length,
      mastered: questions.filter(q => q.isMastered).length,
      needsReview: questions.filter(q => !q.isMastered).length,
      subjects: [...new Set(questions.map(q => q.subject))],
    };
  }

  // Debug helper - tüm sistem durumunu kontrol et
  async debugSystemStatus() {
    console.log('🔍 =============DEBUG SYSTEM STATUS=============');

    try {
      // 1. Directory status
      await this.debugDirectoryContents();

      // 2. AsyncStorage status
      const questions = await this.getQuestions();
      console.log('📊 AsyncStorage questions count:', questions.length);

      // 3. Available directories
      console.log('📁 Available directories:', {
        DocumentDir: ReactNativeBlobUtil.fs.dirs.DocumentDir,
        CacheDir: ReactNativeBlobUtil.fs.dirs.CacheDir,
        DownloadDir: ReactNativeBlobUtil.fs.dirs.DownloadDir,
      });

      console.log('🔍 ===========================================');
    } catch (error) {
      console.error('❌ Debug system status error:', error);
    }
  }

  async getStorageInfo() {
    try {
      const questions = await this.getQuestions();
      let totalSize = 0;
      let existingFiles = 0;
      let missingFiles = 0;

      for (const question of questions) {
        if (question.imagePath) {
          const exists = await ReactNativeBlobUtil.fs.exists(
            question.imagePath,
          );
          if (exists) {
            existingFiles++;
            const stat = await ReactNativeBlobUtil.fs.stat(question.imagePath);
            totalSize += parseInt(stat.size);
          } else {
            missingFiles++;
            console.warn(`⚠️ Missing file: ${question.imagePath}`);
          }
        }
      }

      return {
        questionCount: questions.length,
        existingFiles,
        missingFiles,
        totalSizeBytes: totalSize,
        totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      };
    } catch (error) {
      console.error('❌ Storage info error:', error);
      return {
        questionCount: 0,
        existingFiles: 0,
        missingFiles: 0,
        totalSizeBytes: 0,
        totalSizeMB: '0',
      };
    }
  }
  async addSolutionImageToQuestion(solutionImageUri, question: Question) {
    try {
      const timestamp = Date.now();
      const fileName = `question_${timestamp}.jpg`;
      const permanentPath = solutionImageUri
        ? `${this.imageDir}/${fileName}`
        : undefined;

      console.log('📄 Generated filename:', fileName);
      console.log('📍 Permanent path:', permanentPath);

      if (solutionImageUri && permanentPath) {
        // URI'yi temizle
        let sourceUri = solutionImageUri.uri || solutionImageUri;
        if (typeof sourceUri === 'string') {
          sourceUri = sourceUri.replace('file://', '');
        }

        console.log('🔗 Source URI (cleaned):', sourceUri);
        console.log('🎯 Target path:', permanentPath);

        // Kaynak dosyanın var olup olmadığını kontrol et
        const sourceExists = await ReactNativeBlobUtil.fs.exists(sourceUri);
        console.log('✅ Source file exists:', sourceExists);

        if (!sourceExists) {
          console.error('❌ Source file does not exist!');
          throw new Error(`Source file does not exist: ${sourceUri}`);
        }

        // Dosyayı kopyala
        await ReactNativeBlobUtil.fs.cp(sourceUri, permanentPath);
        console.log('✅ Image copied successfully');

        // Kopyalanan dosyanın var olup olmadığını kontrol et
        const targetExists = await ReactNativeBlobUtil.fs.exists(permanentPath);
        console.log('✅ Target file exists after copy:', targetExists);

        if (targetExists) {
          const stats = await ReactNativeBlobUtil.fs.stat(permanentPath);
          console.log('📊 File stats:', {
            size: stats.size,
            type: stats.type,
            lastModified: stats.lastModified,
          });
        }
      }

      const questions = await this.getQuestions();
      const index = questions.findIndex(q => q.id === question.id);

      if (index !== -1) {
        questions[index] = {
          ...questions[index],
          solutionImagepath: permanentPath,
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
        console.log('✅ Question updated:', question.id);
        return questions[index];
      }
    } catch (error) {
      console.error('❌ solution image error', error);
    }
  }

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

      console.log('✅ Temp files cleaned');
    } catch (error) {
      console.error('❌ Cleanup error:', error);
    }
  }

  async exportQuestions() {
    try {
      const questions = await this.getQuestions();
      const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        questions,
      };

      const exportPath = `${ReactNativeBlobUtil.fs.dirs.DownloadDir}/yks_questions_backup.json`;
      await ReactNativeBlobUtil.fs.writeFile(
        exportPath,
        JSON.stringify(exportData, null, 2),
        'utf8',
      );

      console.log('✅ Questions exported to:', exportPath);
      return exportPath;
    } catch (error) {
      console.error('❌ Export error:', error);
      throw error;
    }
  }

  async clearAllData() {
    try {
      await AsyncStorage.clear();
      console.log('Tüm veriler temizlendi');
    } catch (error) {
      console.error('Veri temizleme hatası:', error);
    }
  }
}

export default new QuestionStorage();
