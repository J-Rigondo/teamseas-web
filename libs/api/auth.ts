import axios from "axios";

export async function refreshFunc() {
  const result = await axios.get("http://localhost:4000/auth/refresh", {
    withCredentials: true,
  });

  return result.data;
};