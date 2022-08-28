export const createGameId = (): string => {
  let str = (Math.random() + 1).toString(36);
  return str.substring(str.length - 5);
};
