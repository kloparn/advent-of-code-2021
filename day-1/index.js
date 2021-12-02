const fs = require("fs/promises");

const sonarScan = async () =>
  (await fs.readFile("input.txt", "utf-8")).split("\n");

(async () => {
  const scanValues = (await sonarScan()).map((e) => parseInt(e));

  // part 1
  // --------------------- //
  const increments = scanValues.reduce((num, curr, index) => {
    if (index === 0) return num;
    else if (scanValues[index - 1] < curr) return num + 1;
    return num;
  }, 0);

  console.log(`total higher next values: ${increments}`);
  // --------------------- //

  // part 2
  // --------------------- //
  const sumOfIncrements = scanValues.reduce((num, curr, index) => {
    if (index + 2 > scanValues.length - 1) return num; 
    else if (index === 0) return num;
    else if (scanValues[index - 1] + curr + scanValues[index + 1] < curr + scanValues[index + 1] + scanValues[index + 2]) return num + 1;
    return num;
  }, 0);

  console.log(`total higher sums of three: ${sumOfIncrements}`);
  // --------------------- //
})();
