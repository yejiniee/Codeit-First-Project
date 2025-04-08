async function deleteSubject(questionId) {
  try {
    const response = await fetch(
      `https://openmind-api.vercel.app/3-2/subjects/${questionId}/`,
      { method: 'DELETE' },
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return null;
  } catch (error) {
    // console.error(error);
    return null;
  }
}

export default deleteSubject;
