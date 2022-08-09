import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Timeline from "./pages/Timeline";

export default function App() {

    const [user, setUser] = useState({});

    const contextValue = { user, setUser };

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