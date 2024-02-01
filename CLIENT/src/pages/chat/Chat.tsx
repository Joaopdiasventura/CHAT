/* eslint-disable react-hooks/exhaustive-deps */
import { css } from "./Css";
import { useSocket } from "../../hooks/useSocket";
import { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";

const app = axios.create({
  baseURL: "https://chat-9549.onrender.com",
});

const Body = css();

interface Notification {
  name: string;
  content: string;
}

interface Chat {
  id: string;
  user: string;
  user_: string;
}

function Chat() {
  const [email, setEmail] = useState("");
  const [chats, setchats] = useState([]);
  const [currentChat, setChat] = useState<Chat | object>({});
  const userEmail = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null)

  const getEmail = async (token: string): Promise<string> => {
    const Email = await app.get(`/decode/${token}`).then((result) => result.data)
    setEmail(Email);
    return Email;
  };

  const socket = useSocket(email);

  const handleNotification = (msg: Notification) => {
    if ("Notification" in window) {
      if (Notification.permission == "granted") {
        new Notification("Você recebeu uma mensagem de " + msg.name, {
          body: msg.content,
        });
      } else if (Notification.permission != "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission == "granted") {
            new Notification("Você recebeu uma mensagem de " + msg.name, {
              body: msg.content,
            });
          }
        });
      }
    }
  };

  const getChats = async (email) => {
    const chats = await app
      .get(`/chat/${email}`)
      .then((Response) => Response.data);
    setchats(chats);
  };

  const nameFriend = (chat: Chat): string => {
    return chat.user == email ? chat.user_ : chat.user;
  };

  const getMessages = async (chat: Chat) => {
    setChat(chat);
    document.getElementById("amigo").innerHTML = nameFriend(chat);

    const messages = await app
      .get(`/message/${chat.id}`)
      .then((Response) => Response.data);

    document.getElementById("conversation").innerHTML = "";

    for (let i = 0; i < messages.length; i++) {
      criarElementoMensagem(messages[i]);
    }
    focus();
  };

  const criarElementoMensagem = (mensagem) => {
    const div = document.createElement("div");
    const paragrafo = document.createElement("p");

    if (mensagem.user == email) {
      div.classList.add("usuario");
    } else {
      div.classList.add("amigo");
    }

    paragrafo.textContent = mensagem.content;

    div.appendChild(paragrafo);
    document.getElementById("conversation").appendChild(div);
  };

  const showAdd = async () => {
    const addElement = document.querySelector("#add") as HTMLElement;
    if (addElement) {
      addElement.style.display = "flex";
    }
  };

  const hideAdd = async () => {
    const addElement = document.querySelector("#add") as HTMLElement;
    if (addElement) {
      addElement.style.display = "none";
    }
  };

  const addChat = async (event: FormEvent) => {
    event.preventDefault();
    await app.post("/chat", { user: email, user_: userEmail.current.value });
    getChats(email);
  };

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    if ("id" in currentChat) {
      const Content = content.current.value;
      content.current.value = "";
      await app.post("/message", {chat: currentChat.id, user: email, content: Content});
      await getMessages(currentChat);
      focus();
    }
  }

  const focus = () => {
    const conversation = document.getElementById("conversation");

    const ultima = conversation.lastElementChild;
  
    if (ultima) {
      ultima.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const Email = await getEmail(localStorage.getItem("token"));
      getChats(Email);
  
      if (socket) {
        socket.on("newMessage", handleNewMessage);
      }
    };
  
    const handleNewMessage = (notificationMsg) => {
      handleNotification(notificationMsg.data);
      if ("id" in currentChat) {
        const friend = nameFriend(currentChat);
        if (friend === notificationMsg.data.name) {
          getMessages(currentChat);
          setTimeout(() => {
            focus();
          }, 300);
        }
      }
    };
  
    fetchData();
  
    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [currentChat, email, getChats, getMessages, handleNotification, nameFriend, socket, focus]);  
  
  return (
    <Body>
      <div id="sidebar">
        <button id="out">LOGOUT</button>
        <button id="iadd" onClick={showAdd}>
          ADICIONAR CONTATO
        </button>
        <h2>CONTATOS: </h2>
        <div id="contacts">
          {chats.map((chat) => (
            <div
              className="contato"
              key={chat.id}
              onClick={() => {
                getMessages(chat);
              }}
            >
              <h2>{nameFriend(chat)}</h2>
            </div>
          ))}
        </div>
      </div>

      <div id="main">
        <h1 id="amigo">SELECIONE UMA CONVERSA</h1>
        <div id="conversation"></div>
        <form id="enviar" onSubmit={sendMessage}>
          <input type="text" id="conteudo" ref={content}/>
          <input type="submit" value="▶" />
        </form>
      </div>

      <div id="add">
        <form id="adicionar" onSubmit={addChat}>
          <p onClick={hideAdd}>X</p>
          <label htmlFor="email">DIGITE O EMAIL:</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={userEmail}
            required
          />{" "}
          <br />
          <input type="submit" value="ADICIONAR" id="addb" />
        </form>
      </div>
    </Body>
  );
}

export default Chat;