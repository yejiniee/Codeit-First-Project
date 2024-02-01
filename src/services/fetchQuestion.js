async function fetchQuestion(subjectId, offset, limit) {
  try {
    const response = await fetch(
      `https://openmind-api.vercel.app/3-2/subjects/${subjectId}/questions/?limit=${limit}&offset=${offset}`,
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
export default fetchQuestion;
