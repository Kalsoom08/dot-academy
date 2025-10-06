import api from './api'; 


export const submitDoubt = async (courseId, topic, question) => {
  try {
    const response = await api.post('/user/api/doubt', {
      course: courseId,
      topic,
      question,
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting doubt:', error);
    throw error; 
  }
};
