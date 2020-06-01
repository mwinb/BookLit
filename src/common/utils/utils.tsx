export const getMaxWidth = (windowWidth: number, max: number, min: number, cutOff: number) =>
  windowWidth < cutOff ? max : min;
