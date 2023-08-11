export async function getCards() {
  const res = await fetch("https://native-api-production.up.railway.app/api/main/smartphones/cards");
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

export async function getMobiles(id) {
  if (id) {
    const res = await fetch(
      `https://native-api-production.up.railway.app/api/main/smartphones/get?id=${id ? id : ""}`
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
    const res = await fetch(`https://native-api-production.up.railway.app/api/main/smartphones`);
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
  const res = await fetch(
    `https://native-api-production.up.railway.app/api/main/laptops/old/${id ? id : ""}`
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
}

export async function getResults(para) {
  const res = await fetch(`https://native-api-production.up.railway.app/api/main/search/min/${para}`);
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
