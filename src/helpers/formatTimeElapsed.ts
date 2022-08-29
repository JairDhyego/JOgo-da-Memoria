const formatTimeElapsed = (seconds: number): string => {
  let minutos = Math.floor(seconds / 60);
  seconds -= minutos * 60;

  let secString = `${seconds < 10 ? "0" + seconds : seconds}`;
  let minString = `${minutos < 10 ? "0" + minutos : minutos}`;
  return `${minString}:${secString}`;
};

export default formatTimeElapsed;
