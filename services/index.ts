import { storage } from "./storage";

const base = "http://akumi.me:13550/api/";

export const postData = async (url: string, data: {}) => {
  try {
    const res = await fetch(base + url, {
      method: "post",
      credentials: "include",
      mode: "no-cors",
      headers: {
        Authorization: `bearer ${storage.token()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const rest = await res.json();
    if (rest) {
      return rest;
    }
  } catch (error) {
    return undefined;
  }
};
