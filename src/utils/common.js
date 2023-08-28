export const decimetersToCentimeters = (decimeters) => {
  return decimeters * 10;
};

export const hectogramsToKilograms = (hectograms) => {
  return hectograms / 10;
};

export const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
};
