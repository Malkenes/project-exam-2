export const formatDate = (date: string) => {
  const result = new Date(date);
  const string = result.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return string;
};

export const isExpired = (date: string) => {
  const result = new Date(date);
  const current = new Date();
  return result < current;
};
