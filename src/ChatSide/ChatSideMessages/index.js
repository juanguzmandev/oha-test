import React from 'react';
import {NewMessage} from './NewMessage/';

const ChatSideMessages = ({ messages }) => {
  return (
    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full" style={{ maxHeight: "35rem", minHeight: "35rem" }}>
      {messages.forEach(message => {
        return <NewMessage message={message}/>
      })}
    </div>
  );
};

export { ChatSideMessages };
