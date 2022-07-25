import characters from "./characters.js";
const encriptedMessage = document.getElementById("encriptedMessage");
const message = document.getElementById("message");
const secretCode = document.getElementById("code");
const encryptButton = document.getElementById("encrypt");
const decryptButton = document.getElementById("decrypt");
const copyButton = document.getElementById("copy");
const switchButton = document.getElementById("switch");
const findIndexOf = (array, sentenceLetter) => array.indexOf(sentenceLetter);
const duplicateArr = (arr, times) =>
  Array(times)
    .fill([...arr])
    .reduce((a, b) => a.concat(b));
const encriptMessage = (sentence, key = a, direction = true) => {
  if (!sentence || !key) alert("Insert message and key to decrypt!");
  let sentenceLettersIndex = [];
  let keyLetterIndex = [];
  let encriptedMessage;
  let keyLetters = key.toUpperCase().split("");
  const originKeys = keyLetters;
  const sentenceLetters = sentence.toUpperCase();
  if (sentenceLetters.length > keyLetters.length) {
    keyLetters = duplicateArr(
      originKeys,
      Math.ceil(sentenceLetters.length / keyLetters.length)
    );
  }
  for (let i = 0; i <= sentenceLetters.length - 1; i++) {
    sentenceLettersIndex.push(findIndexOf(characters, sentenceLetters[i]));
  }
  for (let j = 0; j <= keyLetters.length - 1; j++) {
    keyLetterIndex.push(findIndexOf(characters, keyLetters[j]));
  }
  encriptedMessage = sentenceLettersIndex
    .map((el, cur) =>
      direction === true
        ? characters.at(
            (sentenceLettersIndex[cur] + keyLetterIndex[cur]) %
              characters.length
          )
        : characters.at(sentenceLettersIndex[cur] - keyLetterIndex[cur])
    )
    .join("");
  return encriptedMessage;
};

encryptButton.addEventListener("click", (e) => {
  e.preventDefault();
  const arg1 = message.value;
  const arg2 = secretCode.value;
  encriptedMessage.value = encriptMessage(arg1, arg2);
});
decryptButton.addEventListener("click", (e) => {
  e.preventDefault();
  const arg1 = message.value;
  const arg2 = secretCode.value;
  console.log(encriptedMessage.value);
  encriptedMessage.value = encriptMessage(arg1, arg2, false);
});
switchButton.addEventListener("click", () => {
  const buttonStyle = getComputedStyle(encryptButton);
  console.log(buttonStyle);
  if (buttonStyle.display === "block") {
    encryptButton.style.display = "none";
    decryptButton.style.display = "block";
    encriptedMessage.placeholder = "Decrypted message";
  } else {
    decryptButton.style.display = "none";
    encryptButton.style.display = "block";
    encriptedMessage.placeholder = "Encrypted message";
  }
});
copyButton.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.clipboard.writeText(encriptedMessage.value);
  navigator.clipboard
    .readText()
    .then((clippedText) => (message.value = clippedText));
});
