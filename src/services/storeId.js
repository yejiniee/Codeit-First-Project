export default async function storeId(name) {
  try {
    const response = await fetch(
      'https://openmind-api.vercel.app/3-2/subjects/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
        }),
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
