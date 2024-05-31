// src/app/wordle/Words.js
import wordleBank from './wordle-bank.txt';

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;

  console.log('wordleBank:', wordleBank); // Debug statement

  const wordArr = wordleBank.split(/\r?\n/).map(word => word.trim()); // Handle different line endings and trim whitespace
  todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
  wordSet = new Set(wordArr);

  return { wordSet, todaysWord };
};
