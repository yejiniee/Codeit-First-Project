async function postAnswer(questionId, answer) {
  try {
    const response = await fetch(
      `https://openmind-api.vercel.app/3-2/questions/${questionId}/answers/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answer),
      },
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default postAnswer;
