import React, { Fragment, useState, useRef, useEffect } from "react";

import { ChatBar } from "./ChatBar/";
import { ChatBarHeader } from "./ChatBar/ChatBarHeader/";

import { ChatBarList } from "./ChatBar/ChatBarList/";
import { ChatBarListSearch } from "./ChatBar/ChatBarList/ChatBarListSearch/";
import { ChatBarListContacts } from "./ChatBar/ChatBarList/ChatBarListContacts/";

import { Contact } from "./ChatBar/ChatBarList/ChatBarListContacts/Contact/";

import { ChatSide } from "./ChatSide/";
import { ChatSideHeader } from "./ChatSide/ChatSideHeader/";
import { ChatSideMessages } from "./ChatSide/ChatSideMessages/";
import { ChatSideWriter } from "./ChatSide/ChatSideWriter/";

import axios from "axios";
//import { io } from "socket.io-client";

import "./index.css";

function App() {
  const [token, setToken] = useState("");
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({});

  const askData = () => {
    var email = prompt("Email");
    var pw = prompt("Contraseña");

    return { email: email, pw: pw };
  };

  useEffect(() => {
    if (token === "") {
      var login = askData();

      if (login.email !== "" || login.pw !== "") {
        axios
          .post("https://api.chat.oha.services/api/token/?create=false", {
            email: login.email,
            password: login.pw,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            alert("Un error ha ocurrido, por favor intente de nuevo más tarde");
          });
      } else {
        alert("Los datos no son correctos. Por favor, ingréselos de nuevo");
        askData();
      }
    }
  }, []);

  const messageContent = useRef("");
  const searchTerms = useRef("");

  const contacts = [
    {
      id: 1,
      name: "Juan",
      pic: "https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg",
      preview: "Hola, ¿Qué tal?",
    },
    {
      id: 2,
      name: "Gabriel",
      pic: "https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg",
      preview: "¿Ya está listo el nuevo feature?",
    },
    {
      id: 3,
      name: "Jesús",
      pic: "https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg",
      preview: "¿Qué hay de nuevo para hoy?",
    },
    {
      id: 4,
      name: "Pedro",
      pic: "https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg",
      preview: "Buenos días",
    },
    {
      id: 5,
      name: "Fernando",
      pic: "https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg",
      preview: "¿Cuáles son los cambios para hoy?",
    },
    {
      id: 6,
      name: "Rosalba",
      pic: "https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg",
      preview: "¿Qué comiste hoy?",
    },
    {
      id: 7,
      name: "Andrés",
      pic: "https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg",
      preview: "¿Qué tal les fué hoy?",
    },
    {
      id: 8,
      name: "Gerardo",
      pic: "https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg",
      preview: "¿Para cuándo estará listo?",
    },
    {
      id: 9,
      name: "María",
      pic: "https://i.pinimg.com/originals/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg",
      preview: "¿Vas a la oficina hoy?",
    },
  ];

  var messages = [];

  var results = contacts;

  const createMessageBubble = (message) => {
    messages.push(message);
    console.log(messages);
    messageContent.current.value = "";
  };

  const sendMessage = () => {
    const message = messageContent.current.value;

    if (message !== "") {
      let socket = new WebSocket(
        "wss://api.chat.oha.services/ws/rooms/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imd1em1hbmp1YW4zMDExQGdtYWlsLmNvbSIsImlhdCI6MTY0ODgyNzg4MywiZXhwIjoxNjQ4OTE0MjgzLCJqdGkiOiJkNjYyZGUwOS05NTBkLTQ4YzYtYjAyNC0wM2NjNTNmODA4OTgiLCJvcmlnX2lhdCI6MTY0ODgyNzg4M30.KtlqqNNCw4kzOHx9Q9hoPgeNNLuZX9BhiFo0DC3mj1A"
      );

      socket.onopen = (e) => {
        {/*alert("[open] Conexión establecida");*/}
        {/*alert("Enviando al servidor");*/}
        socket.send(
          JSON.stringify({
            type: "chat",
            data: {
              message: message,
            },
          })
        );
      };

      socket.onmessage = function (event) {
        {/*alert("[message] : " + event.data);*/}
        var newMessage = JSON.parse(event.data);
        console.log(newMessage);

        if(newMessage.type === 'chat') {
          createMessageBubble(newMessage);
          console.log(newMessage);
        }
      };

    } else {
      alert("Mensaje vacío. Escribe algo para enviar");
    }
  };

  const applySearchFilter = (filter) => {
    results = contacts.filter((contact) => contact.name === filter);
  };

  return (
    <Fragment>
      <div className="w-full flex justify-center my-6 items-center">
        <img className="w-12 h-12" alt="Oha Services Logo" src="favicon.ico" />
      </div>
      <div
        className="w-6/12 flex flex-row m-20 mt-0 rounded-lg shadow-2xl divide-x-2 justify-center p-1 overflow-hidden"
        style={{ height: "46em" }}
      >
        <ChatBar>
          <aside className="flex flex-col w-1/4 content-start divide-y-2 overflow-scroll overflow-x-hidden">
            {/*<p>{estado === true ? "Verdad" : "Falso"}</p>*/}
            <ChatBarHeader>
              <div
                className="w-full m-1 flex items-center"
                style={{ height: "5.5rem" }}
              >
                <h1 className="text-gray-400 text-left text-3xl m-2">Chats</h1>
                <button
                  type="button"
                  className="inline-flex items-center justify-center ml-20 rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    width="512.000000pt"
                    height="512.000000pt"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="h-5 w-5 text-gray-400"
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      fill="#9ca3af"
                      stroke="none"
                    >
                      <path d="M2492 5109 c-45 -13 -108 -80 -121 -126 -7 -26 -11 -392 -11 -1130 l0 -1093 -1113 -2 -1113 -3 -41 -27 c-63 -41 -88 -90 -88 -169 0 -54 5 -72 27 -106 15 -22 44 -51 65 -64 l38 -24 1112 -3 1113 -2 2 -1113 3 -1112 24 -38 c13 -21 42 -50 64 -65 34 -23 52 -27 107 -27 55 0 73 4 107 27 22 15 51 44 64 65 l24 38 3 1112 2 1113 1113 2 1112 3 38 24 c21 13 50 42 65 64 23 34 27 52 27 107 0 55 -4 73 -27 107 -15 22 -44 51 -65 64 l-38 24 -1112 3 -1113 2 -2 1113 -3 1112 -24 38 c-47 76 -151 113 -239 86z" />
                    </g>
                  </svg>
                </button>
              </div>
            </ChatBarHeader>
            <ChatBarList>
              <ChatBarListSearch>
                <div style={{ height: "9%" }}>
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 p-4 bg-gray-200 rounded-md py-3 m-2"
                    placeholder="Buscar chat"
                    ref={searchTerms}
                    onChange={() =>
                      applySearchFilter(searchTerms.current.value)
                    }
                  />
                  <div
                    className="relative items-center inset-y-0 hidden sm:flex"
                    bis_skin_checked="1"
                    style={{ left: "75%", top: "-80%" }}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                      onClick={() =>
                        applySearchFilter(searchTerms.current.value)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </ChatBarListSearch>
              <ChatBarListContacts>
                <ul>
                  {results.map((contact) => (
                    <Contact
                      key={contact.id}
                      name={contact.name}
                      pic={contact.pic}
                      preview={contact.preview}
                    />
                  ))}
                </ul>
              </ChatBarListContacts>
            </ChatBarList>
          </aside>
        </ChatBar>
        <ChatSide>
          <section className="flex flex-col w-3/4 justify-center m-2 ml-0 mr-0">
            <ChatSideHeader />
            <ChatSideMessages messages={messages}/>
            <ChatSideWriter
              button={
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                >
                  <span className="font-bold">Enviar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 ml-2 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              }
            >
              <input
                type="text"
                placeholder="¡Escribe tu mensaje!"
                ref={messageContent}
                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
              />
            </ChatSideWriter>
          </section>
        </ChatSide>
      </div>
    </Fragment>
  );
}

export default App;
