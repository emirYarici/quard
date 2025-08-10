import storage from '../../infra/storage';
import {Question} from '../../types/question.types';

export const getQuestionsByDate = async (dateString: string) => {
  const questions = await storage.getQuestions();
  const temp: Question[] = [];
  const targetDate = new Date(dateString);
  questions.forEach(question => {
    const date = new Date(question.dateAdded);

    const year = date.getUTCFullYear(); // or date.getFullYear() if you want local time
    const month = date.getUTCMonth(); // 0-indexed: January is 0
    const day = date.getUTCDate(); // 1-31
    console.log(targetDate.toDateString(), date.toDateString(), 'alov');
    if (
      targetDate.getUTCFullYear() === year &&
      month === targetDate.getUTCMonth() &&
      targetDate.getUTCDate() === day
    ) {
      temp.push(question);
    }
  });

  return temp;
};
