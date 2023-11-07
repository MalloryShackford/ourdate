export const truncate = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + '...';
};

export const getHistoryTitle = (history) => {
  const dateObj = new Date(history.datePlanInfo.date);
  const day = dateObj.toLocaleString('en-US', { weekday: 'long' });
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const dateNum = dateObj.getDate();
  const timeObj = new Date(`1970-01-01T${history.datePlanInfo.time}:00`);
  const formattedTime = timeObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const fullText = `${
    history.datePlanInfo.vibe.charAt(0).toUpperCase() + history.datePlanInfo.vibe.slice(1)
  } vibe near ${
    history.datePlanInfo.location.charAt(0).toUpperCase() + history.datePlanInfo.location.slice(1)
  } on ${day} ${month} ${dateNum} around ${formattedTime}.`;
  return fullText;
};
