// this folder is created to manage state globally


import { create } from 'zustand'

const UseConversation = create((set) => ({
  // firstly no user is selected
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({selectedConversation}),
  messages: [],
  setMessage: (messages) => set( { messages } ),
}));

export default UseConversation;


