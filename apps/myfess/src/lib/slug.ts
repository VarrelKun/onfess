const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateSlug = (text: string) => {
  return (
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "") +
    "-" +
    generateRandomNumber(1000, 9999)
  );
};
