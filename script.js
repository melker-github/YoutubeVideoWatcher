const URL = 'https://www.youtube.com/watch?v=lWxno-TnaZo';
const videoLength = 1000 * 30; // milliseconds
const numberOfWindows = 10;
const numberOfRounds = 20;
const timeBetweenWindow = 150; // milliseconds
const timeBetweenRounds = 10000; // milliseconds

const windowList = [];

const openNewWindow = (n) => {
  if (!n) return;
  let newWindow = window.open(URL);
  newWindow.focus();
  windowList.push(newWindow);
  setTimeout(() => {
    openNewWindow(n-1)
  }, timeBetweenWindow)
}

const closeWindows = (arr) => {
  if (!arr.length) return;
  let w = arr[0]
  arr.shift();
  setTimeout(() => {
    w.close()
    closeWindows(arr)
  }, timeBetweenWindow)
}

const startRound = async (n) => {
  console.log('Round: ' + (numberOfRounds - n + 1))
  if (!n) return;
  openNewWindow(numberOfWindows);
  setTimeout(() => {
    closeWindows(windowList);
  }, videoLength)
  setTimeout(() => {
    startRound(n-1)
  }, videoLength + (timeBetweenWindow * numberOfWindows) + timeBetweenRounds)

}

startRound(numberOfRounds)
