export const getCssVar = (variableName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    variableName,
  );
};
