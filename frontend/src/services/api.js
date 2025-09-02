import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // Backend URL
});

// Example: Chatbot call
export const sendMessageToChatbot = async (message) => {
  try {
    const res = await API.post("/chatbot", { message });
    return res.data;
  } catch (err) {
    console.error("Chatbot API Error:", err);
    return { reply: "Sorry, something went wrong." };
  }
};

// Example: Anonymous login (Firebase handled in backend)
export const anonymousLogin = async () => {
  try {
    const res = await API.get("/auth/anonymous-login");
    return res.data;
  } catch (err) {
    console.error("Auth Error:", err);
  }
};

export default API;
