const getCardList = async ({
  sort: cardSort,
  LIMITSIZE: cardLimitSize,
  currentPage: current,
}) => {
  const url = `/subjects/?limit=${cardLimitSize}&offset=${(current - 1) * cardLimitSize}&sort=${cardSort}`;
  const response = await fetch(`https://openmind-api.vercel.app/3-2${url}`);
  const result = await response.json();
  return result;
};

export default getCardList;
