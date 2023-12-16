export const Status = (state = "idle", action) => {
  switch (action.type) {
    case "loading":
      return (state = "loading");
    case "delayed":
      return (state = "delayed");
    default:
      return state;
  }
};
