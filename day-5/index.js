const fs = require("fs/promises");

const hydrothermalVentsInfo = () =>
  fs.readFile("input.txt", "utf-8").then((data) => data.split("\n").map((e) => e.replace("\r", "")));

const splitPoints = (points) => points.split(",");

const getSmallAndBig = (x, y) => {
  const small = x < y ? x : y;
  const big = x > y ? x : y;
  return [small, big];
};

const filterNonEqualPoints = (points) => {
  const removedUnequalPoints = points.reduce((points, curr) => {
    const [X, Y] = curr.split("->");
    const [xX, xY] = splitPoints(X);
    const [yX, yY] = splitPoints(Y);
    return xX === yX || xY === yY ? points.concat(curr) : points;
  }, []);

  return removedUnequalPoints;
};

const createDiagram = (data) => {
  const diagram = [];
  const biggestNumber = data.reduce((bigNum, curr) => {
    const [X, Y] = curr.split("->");
    const [, xY] = splitPoints(X);
    const [, yY] = splitPoints(Y);
    return xY >= yY ? (xY >= bigNum ? xY : bigNum) : yY >= bigNum ? yY : bigNum;
  }, 0);

  const dotArr = [];

  for (let i = 0; i <= biggestNumber; i++) {
    dotArr.push(".");
  }

  for (let i = 0; i <= biggestNumber; i++) {
    diagram.push(dotArr);
  }

  return diagram;
};

const fillDiagram = (diagram, points) => {
  const filledDiagram = points.reduce((_, curr) => {
    const [X, Y] = curr.split("->");
    const [xX, xY] = splitPoints(X);
    const [yX, yY] = splitPoints(Y);

    if (xX !== yX) {
      console.log("xX is not same as yX: ", X, "->", Y);
      let [small, big] = getSmallAndBig(xX, yX);
      const yPosition = xY; // could also pick yY.
      console.log(yPosition);

      for (small; small < big; small++) {
        if (isNaN(diagram[yPosition][small])) {
          diagram[yPosition][small] = 1;
          console.log(diagram);
        } else {
          diagram[yPosition][small]++;
        }
        //console.log(diagram);
      }
    } else if (xY !== yY) {
      console.log("xY is not same as yY: ", X, "->", Y);
      let [small, big] = getSmallAndBig(xY, yY);
      const xPosition = xX; // could also pick yX.

      for (small; small < big; small++) {
        if (isNaN(diagram[small][xPosition])) {
          diagram[small][xPosition] = 1;
        } else {
          diagram[small][xPosition]++;
        }
      }
    }

    return diagram;
  }, []);
  return filledDiagram;
};

(async () => {
  const hydroVentInfo = (await hydrothermalVentsInfo()).map((e) => e.replaceAll(" ", ""));

  // Part 1
  // --------------------------------------------- //
  const equalHydroVentPaths = filterNonEqualPoints(hydroVentInfo);
  const diagram = createDiagram(hydroVentInfo);

  const filledDiagram = fillDiagram(diagram, equalHydroVentPaths);

  console.log(filledDiagram);

  // --------------------------------------------- //
})();