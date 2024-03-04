const TEST_CASES_COUNT = 1000;
const TRAIT_COUNT = 6;

if (TRAIT_COUNT > 6) throw new Error("Please choose 6 or less traits!");

const fs = require("fs");

function getFromFile(filename) {
  try {
    const data = fs.readFileSync(`./traits/${filename}.txt`, "utf8");
    const dataArray = data.split("\n");
    return dataArray;
  } catch (error) {
    console.error("Error reading the file:", error);
  }
}

function getAll() {
  const filenames = ["breed", "clothes", "eyes", "hats", "mouth", "pet"];

  return filenames.reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: getFromFile(cur),
    };
  }, {});
}

const all = getAll();

const { breed, clothes, eyes, hats, mouth, pet } = all;

const randomElement = (myArray) =>
  myArray[Math.floor(Math.random() * myArray.length)];

let testcases = [];

for (let i = 0; i < TEST_CASES_COUNT; i++) {
  let str = [
    `Create a ${randomElement(breed)} cat`,
    `wearing ${randomElement(clothes)}`,
    `with ${randomElement(eyes)}`,
    `wearing ${randomElement(hats)}`,
    `with ${randomElement(mouth)} mouth`,
    `with ${randomElement(pet)} pet`,
  ];

  const res = str.slice(0, TRAIT_COUNT).join(", ");

  testcases.push(res);
}

var file = fs.createWriteStream("testcases.txt");
file.on("error", function (err) {
  /* error handling */
});
testcases.forEach(function (v) {
  file.write(v + "\n");
});
file.end();
