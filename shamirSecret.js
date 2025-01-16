const fs = require('fs');

function parseJSON(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function decodeValue(base, value) {
  return parseInt(value, base);
}

function lagrangeInterpolation(points, k) {
  let constant = 0;

  for (let i = 0; i < k; i++) {
    const [xi, yi] = points[i];
    let numerator = 1;
    let denominator = 1;

    for (let j = 0; j < k; j++) {
      if (i !== j) {
        const [xj] = points[j];
        numerator *= -xj;
        denominator *= (xi - xj);
      }
    }

    constant += yi * (numerator / denominator);
  }

  return Math.round(constant);
}

function solveForSecret(testCase) {
  const { n, k } = testCase.keys;
  const points = [];

  
  for (let i = 1; i <= n; i++) {
    if (testCase[i]) {
      const base = parseInt(testCase[i].base, 10);
      const value = testCase[i].value;
      const x = i;
      const y = decodeValue(base, value);
      points.push([x, y]);
    }
  }

  
  return lagrangeInterpolation(points, k);
}

function main() {
  const testCase1 = parseJSON('testcase1.json');


  const secret1 = solveForSecret(testCase1);
  const secret2 = solveForSecret(testCase2);

  console.log('Secret for Test Case 1:', secret1);
  console.log('Secret for Test Case 2:', secret2);
}


main();
