import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext.js";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import TimelinePage from "./pages/TimelinePage.js";
import Timeline from './pages/Timeline.js'
import UserPage from "./pages/UserPage.js";
import Home from './shared/home.js'
////<Route path="/timeline" element={<Home />} />
export default function App() {
    const apiUrl = "http://localhost:4000";
    //const apiUrl = "https://linkr-32.herokuapp.com"

    const [user, setUser] = useState(getUser);
    const [showLogout, setShowLogout] = useState(false);

    function getUser() {
        const userData = localStorage.getItem("userData");
        if (userData) {
            return JSON.parse(userData);
        }
        return {};
    }

    // console.log(localStorage.getItem("userData"));

    const authorization = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    const contextValue = { user, setUser, showLogout, setShowLogout, apiUrl, authorization };

    return (
        <UserContext.Provider value={contextValue}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/hashtag/:hashtag" element={<Home/>} />
                    <Route path="/timeline" element={<Home />} />
                    <Route path="/user/:id" element={<UserPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}