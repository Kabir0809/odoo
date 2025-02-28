import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/")
            .then(response => setMessage(response.data))
            .catch(error => console.error(error));
    }, []);

    return <div>{message}</div>;
}

export default App;
