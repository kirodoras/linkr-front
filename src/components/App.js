import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";
import DeleteModalContext from "../contexts/deleteModalContext";
import ShareModalContext from "../contexts/shareModalContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TimelinePage from "./pages/TimelinePage";
import UserPage from "./pages/UserPage";
import HashtagPage from "./pages/HashtagPage";

export default function App() {
    const apiUrl = process.env.REACT_APP_MODE === "production" ? process.env.REACT_APP_API_URL : "http://localhost:4000";

    const [user, setUser] = useState(getUser);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [alreadyFollow, setAlreadyFollow] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [update, setUpdate] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ status: false, postId: false });
    const [shareModal, setShareModal] = useState({ status: false, postId: false });

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

    const contextValue = { user, setUser, showLogout, setShowLogout, apiUrl, authorization, update, setUpdate, followedUsers, setFollowedUsers, alreadyFollow, setAlreadyFollow };
    const deleteModalContextValue = { deleteModal, setDeleteModal };
    const shareModalContextValue = { shareModal, setShareModal };
    return (
        <UserContext.Provider value={contextValue}>
            <DeleteModalContext.Provider value={deleteModalContextValue}>
                <ShareModalContext.Provider value={shareModalContextValue}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/sign-up" element={<SignUpPage />} />
                            <Route path="/timeline" element={<TimelinePage />} />
                            <Route path="/user/:id" element={<UserPage />} />
                            <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
                        </Routes>
                    </BrowserRouter>
                </ShareModalContext.Provider>
            </DeleteModalContext.Provider>
        </UserContext.Provider>
    )
}