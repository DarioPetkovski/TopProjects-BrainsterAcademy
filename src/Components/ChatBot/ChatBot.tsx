import { useState } from "react";
import closeIcon from "../../assets/icons/close.png";
import chatbot from "../../assets/icons/chatbot.png";
import "./caht-bot.css";
import { easeInOut, motion } from "framer-motion";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen ? (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: easeInOut }}
          className="chatbot-container"
        >
          <div className="chatbot-close" onClick={toggleChatbot}>
            <img src={closeIcon} alt="Close Icon" />
          </div>
          <iframe
            title="Chatbot"
            className="chatbot-iframe"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/0e1b9f3c-b872-4a22-9f97-5ff0e0e63052"
          ></iframe>
        </motion.div>
      ) : (
        <div className="chatbot-icon" onClick={toggleChatbot}>
          <img src={chatbot} alt="Chatbot Icon" width="60" height="60" />
        </div>
      )}
    </div>
  );
}
