

const addSuffixCorrespondToNumber = (input) => {
  let str = input.toString();
  if (str.endsWith("1")) {
    return "st";
  }
  if (str.endsWith("2")) {
    return "nd";
  }
  if (str.endsWith("3")) {
    return "rd";
  }
  return "th";
};

export const formateTime = (datestr) => {
  // datestr can be time stamp, date string etc... it returns date in this formate eg 6th, Nov 2023
  let date = new Date(datestr);
  const dayNumber = date.getDate();
  return `${dayNumber}${addSuffixCorrespondToNumber(
    dayNumber
  )}, ${date.toLocaleDateString("en-GB", {
    month: "short",
  })} ${date.getFullYear()}`;
};
