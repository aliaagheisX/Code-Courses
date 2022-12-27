import "./discussion.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "../../Layouts/Chat/Chat";
import useToken from "../../useToken";
import { Navigate, useParams } from "react-router-dom";
import api from "../../api";
import Resource from "../../Resource";

const socket = io.connect("http://localhost:4000");

function Discussion() {
    const { id } = useParams()
    const { userdata } = useToken();

    useEffect(() => { joinRoom() }, [])

    const joinRoom = () => {
        socket.emit("join_room", id);
    };

    return (
        <Resource
            path={api.getDiscussion(id)}
            render={({ items: { messages: data } }) => {
                const messages = data.map((m) => ({
                    author: m.SENDER,
                    message: m.TXT,
                    time: m.SENDDATETIME
                }))
                return <Chat messagesInitial={messages} socket={socket} username={userdata.USERNAME} room={id} />
            }}
            ErrorComp={<Chat messagesInitial={[]} socket={socket} username={userdata.USERNAME} room={id} />}
        />

    );
}

export default Discussion;