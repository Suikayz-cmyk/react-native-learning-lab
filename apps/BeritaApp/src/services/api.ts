import axios from "axios";
import Constants from "expo-constants";

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": Constants.expoConfig?.extra?.newsApiKey,
  },
});

export default api;
