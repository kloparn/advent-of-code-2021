const fs = require("fs/promises");

const getBinaryData = () =>
  fs.readFile("input.txt", "utf-8").then((data) => data.toString().split("\n"));

const mostCommonBinary = (binary) => {
  return binary.split("0").length > binary.split("1").length
    ? "0"
    : binary.split("0").length < binary.split("1").length
    ? "1"
    : "-1";
};

(async () => {
  const binaryData = (await getBinaryData()).map((binary) =>
    binary.replace("\r", "")
  );

  // part 1
  // --------------------- //
  const binaryLength = binaryData[0].length;
  let gammaRate = "";

  for (let i = 0; i < binaryLength; i++) {
    let tempLongBinary = "";
    for (const j of binaryData) {
      tempLongBinary += j[i];
    }
    gammaRate += mostCommonBinary(tempLongBinary);
  }
  console.log("Most common: ", gammaRate);

  const epsilonRate = parseInt(
    [...gammaRate]
      .map((e) => (e === "1" ? "0" : "1"))
      .join()
      .replaceAll(",", ""),
    2
  );
  gammaRate = parseInt(gammaRate, 2);

  console.log(
    `Part 1!\nMultiplying the gamma rate & the epsilon rate: ${gammaRate} * ${epsilonRate} = ${
      gammaRate * epsilonRate
    }`
  );
  // --------------------- //

  // Part 2
  // --------------------- //
  let oxygenRating = binaryData;
  let c02Rating = binaryData;
  let index = 0;

  while (oxygenRating.length > 1) {
    const indexBinary = oxygenRating
      .map((b) => b[index])
      .join()
      .replaceAll(",", "");

    const commonBinary = mostCommonBinary(indexBinary);

    const commonBinaryValue = commonBinary === "-1" ? "1" : commonBinary;

    oxygenRating = oxygenRating.filter((b) => b[index] === commonBinaryValue);

    index++;
  }

  index = 0;

  while (c02Rating.length > 1) {
    const indexBinary = c02Rating
      .map((b) => b[index])
      .join()
      .replaceAll(",", "");

    const leastCommonBinary =
      mostCommonBinary(indexBinary) === "1"
        ? "0"
        : mostCommonBinary(indexBinary) === "0"
        ? "1"
        : "-1";

    const leastCommonBinaryValue =
      leastCommonBinary === "-1" ? "0" : leastCommonBinary;

    c02Rating = c02Rating.filter((b) => b[index] === leastCommonBinaryValue);

    index++;
  }

  oxygenRating = parseInt(oxygenRating[0], 2);
  c02Rating = parseInt(c02Rating[0], 2);
  console.log(
    `\nPart 2!\noxygen rating: ${oxygenRating}\nc02 rating: ${c02Rating}\nlife support rating: ${
      oxygenRating * c02Rating
    }`
  );

  // --------------------- //
})();
