const fs = require("fs/promises");

const hydrothermalVentsInfo = () =>
  fs.readFile("input.txt", "utf-8").then((data) => data.split("\n").map((e) => e.replace("\r", "")));

const filterNonEqualPoints = (points) => {
  const removedUnequalPoints = points.reduce((points, curr) => {
    const [X, Y] = curr.split("->");
    return X[0] === Y[0] || X[2] === Y[2] ? points.concat(curr) : points;
  }, []);

  return removedUnequalPoints;
};

const createDiagram = (data) => {
  const diagram = [];
  const biggestNumber = data.reduce((bigNum, curr) => {
    const [X, Y] = curr.split("->");
    const xY = X.split(",")[1]; // Y for the first pos
    const yY = Y.split(",")[1]; // Y for the second pos
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
    const xXY = X.split(","); // Y for the first pos
    const yXY = Y.split(","); // Y for the second pos

    if (xXY[0] !== yXY[0]) {
    } else if (xXY[2] !== yXY[2]) {
    } else {
      console.log("both are the same: ", X, "->", Y);
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
