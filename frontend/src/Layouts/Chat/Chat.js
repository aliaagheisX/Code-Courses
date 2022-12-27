import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import getDate from "../../getDate";

function Chat({ socket, username, room, messagesInitial }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState(messagesInitial);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed).toISOString();

            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: today,
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
            console.log("sent message")
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
            console.log("receved message")
        });
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent, ind) => {
                        return (
                            <div key={ind}
                                className="message"
                                id={username === messageContent.author ? "you" : "other"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{getDate(messageContent.time)} ago</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;