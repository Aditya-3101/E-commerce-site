export async function getCards() {
  // fetch("https://native-json.onrender.com/api/main/smartphones/cards")
  // .then(res)
  const res = await fetch("https://native-json.onrender.com/card");
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
      `https://native-json.onrender.com/smartphones/${id}`
    );
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
  } else {
    const res = await fetch(`https://native-json.onrender.com/smartphones`);
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
      `https://native-json.onrender.com/old_laptops/${id}`
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
    const res = await fetch(`https://native-json.onrender.com/old_laptops`);
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
  //https://native-json.onrender.com/search?Sbrand_like=asus
  const res = await fetch(
    `https://native-json.onrender.com/search?Sbrand_like=${para}`
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
//     `https://native-json.onrender.com/api/main/orders/get/data/min`,
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
