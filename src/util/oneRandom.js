export default function oneRandom(array) {
  let random = getRandomInt(0, array.length -1 );
  return array[random];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}