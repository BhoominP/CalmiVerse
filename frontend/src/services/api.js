import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // Backend URL
});

// -------------------------------
// Chatbot
// -------------------------------
export const sendMessageToChatbot = async (message) => {
  try {
    const res = await API.post("/chatbot", { message });
    return res.data;
  } catch (err) {
    console.error("Chatbot API Error:", err);
    return { reply: "Sorry, something went wrong." };
  }
};

// -------------------------------
// Anonymous login
// -------------------------------
export const anonymousLogin = async () => {
  try {
    const res = await API.get("/auth/anonymous-login");
    return res.data;
  } catch (err) {
    console.error("Auth Error:", err);
  }
};

// -------------------------------
// Screening APIs
// -------------------------------

// Save screening result
export const saveScreening = async (data) => {
  try {
    const res = await API.post("/screening/save", data);
    return res.data;
  } catch (err) {
    console.error("Save Screening Error:", err);
    throw err;
  }
};

// Fetch latest snapshot by email
export const fetchSnapshot = async (email) => {
  try {
    const res = await API.get(`/screening/snapshot/${email}`);
    return res.data;
  } catch (err) {
    console.error("Fetch Snapshot Error:", err);
    return null;
  }
};

export default API;
