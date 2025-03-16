export const secondsToTime = (seconds?: number): string => {
  if (!seconds) {
    return "0 sec";
  }
  if (seconds < 60) {
    return `${seconds} sec`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} min ${remainingSeconds} sec`;
};
