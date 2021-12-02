const fs = require("fs/promises");

const diveMovements = async () =>
  (await fs.readFile("input.txt", "utf-8")).split("\n");

(async () => {
  const movements = (await diveMovements()).map((e) => e.replace("\r", ""));

  // part 1
  // --------------------- //
  let depth = 0;
  let position = 0;

  for (const movement of movements) {
    const [instruction, step] = movement.split(" ");
    switch (instruction) {
      case "up":
        depth -= parseInt(step);
        break;
      case "down":
        depth += parseInt(step);
        break;
      case "forward":
        position += parseInt(step);
        break;
    }
  }
  console.log(
    `Current horizontal position: ${position}\n current depth: ${depth}`
  );

  console.log("Them multiplied together is: ", depth * position);
  // --------------------- //

  // part 2
  // --------------------- //

  depth = 0;
  position = 0;
  let aim = 0;

  for (const movement of movements) {
    const [instruction, step] = movement.split(" ");
    switch (instruction) {
      case "up":
        aim -= parseInt(step);
        break;
      case "down":
        aim += parseInt(step);
        break;
      case "forward":
        position += parseInt(step);
        if (aim !== 0) {
          depth += parseInt(aim) * parseInt(step);
        }
        break;
    }
  }

  console.log("\n\n\n");

  console.log(
    `Current horizontal position: ${position}\n current depth: ${depth}`
  );

  console.log("Them multiplied together is: ", depth * position);

  // --------------------- //
})();
