const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateSlug = (text: string) => {
  text = text.substring(0, 50);
  return (
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "") +
    "-" +
    generateRandomNumber(10000, 99999)
  );
};
