export const showIt = () => {
  return {
    type: "show",
  };
};

export const hideIt = () => {
  return {
    type: "hide",
  };
};

export const addItem = (para) => {
  return {
    type: "additem",
    payload: para || null,
  };
};

export const delItem = (para) => {
  return {
    type: "delitem",
    payload: para || null,
  };
};

export const displayFilter = () => {
  return {
    type: "displayFilter",
  };
};

export const hideFilter = () => {
  return {
    type: "hideFilter",
  };
};

export const displaySort = () => {
  return {
    type: "displaySort",
  };
};

export const hideSort = () => {
  return {
    type: "hideSort",
  };
};

export const finditem = (para) => {
  return {
    type: "finditem",
    payload: para || null,
  };
};
