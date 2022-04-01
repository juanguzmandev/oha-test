import React from 'react';

const NewMessage = ({ message }) => {
  return (
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
              {message.data.user.first_name + ": " + message.data.message}
            </span>
          </div>
        </div>
        <img
          src="https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg"
          alt="My profile"
          className="w-6 h-6 rounded-full order-2"
        />
      </div>
    </div>
  );
};

export { NewMessage };
