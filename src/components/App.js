import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import UserContext from "../contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Timeline from "./pages/Timeline";

export default function App() {
    //const apiUrl = "http://localhost:4000";
    const apiUrl = "https://linkr-32.herokuapp.com"

    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const authorization = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    const contextValue = { user, setUser, apiUrl, authorization };

    return (
        <UserContext.Provider value={contextValue}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/timeline" element={<Timeline />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}