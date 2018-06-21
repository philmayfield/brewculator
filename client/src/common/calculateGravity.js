// convert brix to gravity

const calculateGravity = brix => {
  const num =
    1.000019 +
    0.003865613 * brix +
    0.00001296425 * brix ** 2 +
    0.00000005701128 * brix ** 3;
  return num.toFixed(3);
};

module.exports = calculateGravity;
