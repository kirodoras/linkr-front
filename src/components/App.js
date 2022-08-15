import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";
import DeleteModalContext from "../contexts/deleteModalContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TimelinePage from "./pages/TimelinePage";
import UserPage from "./pages/UserPage";

export default function App() {
    // const apiUrl = "http://localhost:4000";
    const apiUrl = "https://linkr-social.herokuapp.com"

    const [user, setUser] = useState(getUser);
    const [showLogout, setShowLogout] = useState(false);
    const [update, setUpdate] = useState(false);
    const [deleteModal, setDeleteModal] = useState({status: false, postId: false});

    function getUser() {
        const userData = localStorage.getItem("userData");
        if (userData) {
            return JSON.parse(userData);
        }
        return {};
    }

    const authorization = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    const contextValue = { user, setUser, showLogout, setShowLogout, apiUrl, authorization, update, setUpdate };
    const deleteModalContextValue = { deleteModal, setDeleteModal };
    return (
        <UserContext.Provider value={contextValue}>
            <DeleteModalContext.Provider value={deleteModalContextValue}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                        <Route path="/timeline" element={<TimelinePage />} />
                        <Route path="/user/:id" element={<UserPage />} />
                    </Routes>
                </BrowserRouter>
            </DeleteModalContext.Provider>
        </UserContext.Provider>
    )
}