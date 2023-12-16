export const loginUser = (state = [], action) => {
  switch (action.type) {
    case "login":
      return [...state, action.payload];
    case "logout":
      return state[0].filter((par) => par.userID !== action.payload);
    default:
      return state;
  }
};
