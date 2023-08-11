export const showSort = (state = false, action) => {
  switch (action.type) {
    case "displaySort":
      return (state = true);
    case "hideSort":
      return (state = false);
    default:
      return state;
  }
};
