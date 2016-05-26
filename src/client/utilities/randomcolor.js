const getRandomHex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export { getRandomHex };

const getRandomHexColors = (amount) => {
  const colors = [];

  let tally = 0;
  while (tally < amount) {
    const tempColor = getRandomHex();

    if (colors.indexOf(tempColor) === -1) {
      colors.push(tempColor);
      tally++;
    }
  }

  return colors;
};

export { getRandomHexColors };

const randomRgbVal = () => Math.floor(Math.random() * 256);

const getRandomRgb = () => {
  const r = randomRgbVal();
  const g = randomRgbVal();
  const b = randomRgbVal();
  return `rgb(${r}, ${g}, ${b})`;
};

export { getRandomRgb };

const getRandomRgba = (transparency) => {
  const r = randomRgbVal();
  const g = randomRgbVal();
  const b = randomRgbVal();
  const a = transparency || Math.random();
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export { getRandomRgba };

const getRandomRgbColors = (amount) => {
  const colors = [];

  let tally = 0;
  while (tally < amount) {
    const tempColor = getRandomRgb();

    if (colors.indexOf(tempColor) === -1) {
      colors.push(tempColor);
      tally++;
    }
  }

  return colors;
};

export { getRandomRgbColors };

const getRandomRgbaColors = (amount, transparency) => {
  const colors = [];

  let tally = 0;
  while (tally < amount) {
    const tempColor = getRandomRgba(transparency);

    if (colors.indexOf(tempColor) === -1) {
      colors.push(tempColor);
      tally++;
    }
  }

  return colors;
};

export { getRandomRgbaColors };
