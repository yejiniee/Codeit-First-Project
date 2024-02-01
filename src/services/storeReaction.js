export default async function storeReaction({ id, type }) {
  try {
    const response = await fetch(
      `https://openmind-api.vercel.app/3-2/questions/${id}/reaction/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      },
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (e) {
    return null;
  }
}
