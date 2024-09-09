

import React, { useEffect, useState } from "react";
import useConversation from "../zustand/UseConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(true); // Default to true to show loading initially
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true); // Set loading true at the start
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );
          // Ensure that res.data is an array or initialize as empty array
          setMessage(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
          console.log("Error in getting messages", error);
          // Optionally set messages to empty array in case of error
          setMessage([]);
        } finally {
          setLoading(false); // Set loading false whether successful or not
        }
      } else {
        // Handle case where selectedConversation is not properly set
        setMessage([]);
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessage]);

  return { loading, messages };
};

export default useGetMessage;
