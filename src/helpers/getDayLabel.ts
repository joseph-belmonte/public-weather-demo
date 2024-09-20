export const getDayLabel = (startTime: Date): string => {
  return new Date(startTime).toLocaleDateString("en-US", { weekday: "long" });
};
