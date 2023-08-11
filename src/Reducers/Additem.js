export const Item = (state = [], action) => {
  switch (action.type) {
    case "additem":
      return [...state, action.payload];
    case "delitem":
      return state.filter((par) => par.ProductId !== action.payload);
    default:
      return state;
  }
};
