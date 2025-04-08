const postQuestion = async (subjectId, question) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(
      `https://openmind-api.vercel.app/3-2/subjects/${subjectId}/questions/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: question }),
      },
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // console.error('질문 등록 실패 : ', error);
    throw error;
  }
};

export default postQuestion;
