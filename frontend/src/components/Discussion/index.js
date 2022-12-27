import "./discussion.css";
import io from "socket.io-client";
import Chat from "../../Layouts/Chat/Chat";
import { useParams } from "react-router-dom";
import useToken from "../../useToken";
import Resource from "../../Resource";
import { Navigate } from "react-router-dom";

const socket = io.connect("http://localhost:4000");

function Discussion() {
    const { id } = useParams();
    const { userdata } = useToken;

    return (
        <Resource
            path={'/'}
            render={({ items }) => {
                const messages = [...items];
                return <Chat socket={socket} messagesInitial={messages} username={userdata.USERNAME} room={id} />
            }}
            ErrorComp={<Navigate to={'/'} replace />}
        />

    )
}

export default Discussion;