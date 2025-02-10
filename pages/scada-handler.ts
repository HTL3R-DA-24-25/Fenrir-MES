import axios from "axios";

const API_BASE_URL = process.env.SCADA_API_BASE_URL;

let cookie = "";

axios.interceptors.request.use(
  (config) => {
    if (cookie) {
      config.headers["Cookie"] = `${cookie}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.defaults.withCredentials = true;

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/${username}/${password}`,
      { withCredentials: false }
    );

    if (response.headers["set-cookie"]) {
      cookie = response.headers["set-cookie"][0];
    } else {
      throw new Error("No cookie found in response headers");
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async (username: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/logout/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export const getAllDataPoints = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/datapoint/getAll`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data points:", error);
    throw error;
  }
};
