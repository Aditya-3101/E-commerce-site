export const showFilter = (state = false, action) => {
  switch (action.type) {
    case "displayFilter":
      return (state = true);
    case "hideFilter":
      return (state = false);
    default:
      return state;
  }
};
