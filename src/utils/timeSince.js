function timeSince(date) {
  const createdWhen = new Date(date);
  const now = new Date();
  const timeDiff = now - createdWhen;

  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const monthsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
  const yearsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));

  if (minutesDiff < 2) return '1 분전';
  if (minutesDiff < 60) return `${minutesDiff} 분전`;
  if (hoursDiff < 2) return '1 시간전';
  if (hoursDiff < 24) return `${hoursDiff} 시간전`;
  if (daysDiff < 2) return '1 일전';
  if (daysDiff <= 30) return `${daysDiff} 일전`;
  if (monthsDiff < 2) return '1 달전';
  if (monthsDiff < 12) return `${monthsDiff} 달전`;
  if (yearsDiff < 2) return '1 년전';
  return `${Math.floor(monthsDiff / 12)} 년전`;
}

export default timeSince;
