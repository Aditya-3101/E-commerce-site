export async function getCards() {
  // fetch("https://alike-burnt-auroraceratops.glitch.me/api/main/smartphones/cards")
  // .then(res)
  const res = await fetch("https://natify-api.onrender.com/cd/all");
  if (!res.ok) {
    // eslint-disable-next-line no-throw-literal
    throw {
      message: `${res.status}:Failed to fetch data`,
      code: res.status,
      statusText: res.statusText,
    };
  }
  const data = await res.json();
  return data;
}

export async function getMobiles(id) {
  if (id) {
    const res = await fetch(
      `https://natify-api.onrender.com/sm/${id}`
    );
    if (!res.ok) {
      throw {
        message: res.text,
        code: res.status,
        statusText: res.statusText,
      };
    }
    const data = await res.json();
    return data;
  } else {
    const res = await fetch(`https://natify-api.onrender.com/sm/all`);
    if (!res.ok) {
      throw {
        message: res.text,
        code: res.status,
        statusText: res.statusText,
      };
    }
    const data = await res.json();
    return data;
  }
}

export async function getLaptops(id) {
  if (id) {
    const res = await fetch(
      `https://natify-api.onrender.com/olp/${id}`
    );
    if (!res.ok) {
      throw {
        message: res.text,
        code: res.status,
        statusText: res.statusText,
      };
    }
    const data = await res.json();
    return data;
  } else {
    const res = await fetch(`https://natify-api.onrender.com/olp/all`);
    if (!res.ok) {
      throw {
        message: res.text,
        code: res.status,
        statusText: res.statusText,
      };
    }
    const data = await res.json();
    console.log(data);
    return data;
  }
}

export async function getResults(para) {
  //https://alike-burnt-auroraceratops.glitch.me/search?Sbrand_like=asus
  const res = await fetch(
    `https://natify-api.onrender.com/search/q?name=${para}`
  );
  if (!res.ok) {
    throw {
      message: res.text,
      code: res.status,
      statusText: res.statusText,
    };
  }
  const data = await res.json();
  return data || [];
}

// export async function getOrders(para) {
//   const res = await fetch(
//     `https://alike-burnt-auroraceratops.glitch.me/api/main/orders/get/data/min`,
//     {
//       method: "POST",
//       body: JSON.stringify({
//         num: para,
//       }),
//       headers: {
//         "Content-type": "application/json",
//       },
//     }
//   );
//   if (!res.ok) {
//     throw {
//       message: res.text,
//       code: res.status,
//       statusText: res.statusText,
//     };
//   }
//   const data = await res.json();
//   return data;
// }
