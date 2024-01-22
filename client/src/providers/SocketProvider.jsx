import React from 'react';

const SocketContext = React.createContext(null);

export const useSocket = () => React.useContext(SocketContext);

const SocketProvider = ({ children }) => {

    const [socket, setSocket] = React.useState(null);

    const wssUrl = import.meta.env.VITE_API_URL || window.location.origin;

    React.useEffect(() => {
        const _socket = new WebSocket(wssUrl.replace(/^http/, 'ws'));
        _socket.onopen = () => setSocket(_socket);
        return () => _socket.close();
    }, []);

    return (
        <SocketContext.Provider value={socket} >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;