const fs = require('fs');

function decodeY(yValue) {
  return parseInt(yValue, 2);
}

function lagrangeInterpolation(roots) {
  const n = roots.length;
  let c = 0;

  for (let i = 0; i < n; i++) {
    let term = roots[i].y;

    for (let j = 0; j < n; j++) {
      if (i !== j) {
        term *= (0 - roots[j].x) / (roots[i].x - roots[j].x);
      }
    }

    c += term;
  }

  return Math.round(c);
}

function main() {

  const data = JSON.parse(fs.readFileSync('input.json', 'utf-8'));

  data.testCases.forEach((testCase) => {
    const { roots } = testCase;
    const decodedRoots = roots.map(root => ({
      x: root.x,
      y: decodeY(root.y)
    }));

    const secret = lagrangeInterpolation(decodedRoots);
    console.log(`Secret (c) for test case: ${secret}`);
  });
}

main();
