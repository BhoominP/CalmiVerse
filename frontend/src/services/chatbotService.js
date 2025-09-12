const API_BASE_URL = 'http://localhost:5000/api';

class ChatbotService {
  async sendMessage(message, userId = 'user123') {
    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          user_id: userId
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Chatbot API error:', error);
      throw error;
    }
  }

  async getBreathingExercise() {
    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/start-breathing-exercise`, {
        method: 'POST'
      });
      return response.json();
    } catch (error) {
      console.error('Breathing exercise error:', error);
      throw error;
    }
  }

  async getCrisisHelp() {
    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/get-crisis-help`);
      return response.json();
    } catch (error) {
      console.error('Crisis help error:', error);
      throw error;
    }
  }
}

// -------------------------------
// Chatbot
// -------------------------------
export const sendMessageToChatbot = async (message) => {
  try {
    const res = await API.post("/chatbot/send", { message });
    return res.data;
  } catch (err) {
    console.error("Chatbot API Error:", err);
    return { reply: "Sorry, something went wrong." };
  }
};


export default new ChatbotService();
