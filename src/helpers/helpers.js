export const formatDate = (dateString) => {
  const launchDate = new Date(dateString);
  const formattedDate = `${launchDate.getDate()} ${launchDate.toLocaleString(
    "default",
    { month: "long" }
  )} ${launchDate.getFullYear()} at ${launchDate.toLocaleTimeString()}`;
  return formattedDate;
};

export const getStatusStyle = (item) => {
  if (item.upcoming === false) {
    if (item.launch_success === true) {
      return {
        borderRadius: 12,
        backgroundColor: "#C8E6C9",
        color: "#4CAF50",
        height: "20px",
        width: "auto",
        textTransform: "none",
      };
    } else {
      return {
        borderRadius: 12,
        backgroundColor: "#FFCDD2",
        color: "#ff5252",
        height: "20px",
        width: "auto",
        textTransform: "none",
      };
    }
  } else {
    return {
      backgroundColor: "#FFD580",
      color: "brown",
      borderRadius: 12,
      height: "20px",
      width: "auto",
      textTransform: "none",
    };
  }
};

export const remToPixels = (remValue) => {
  const pixelsPerRem = 16;
  return remValue * pixelsPerRem;
};
