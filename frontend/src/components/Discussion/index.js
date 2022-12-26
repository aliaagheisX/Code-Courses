import "./discussion.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "../../Layouts/Chat/Chat";
import { useParams } from "react-router-dom";
import useToken from "../../useToken";

const socket = io.connect("http://localhost:4000");

function Discussion() {
    const { id } = useParams();
    const { userdata } = useToken;

    return (

        <Chat socket={socket} username={userdata.USERNAME} room={id} />
    )
}

export default Discussion;