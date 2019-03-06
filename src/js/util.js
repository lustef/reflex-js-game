export const createElementWithClass = (_htmlTag, _classList) => {
  const element = document.createElement(_htmlTag);
  element.classList.add(..._classList);
  return element
}

export const getRandomInt = (min, max) => {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}