import MainBody from "../shared/MainBody";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";

export default function Timeline() {
    const { user, apiUrl, authorization, followedUsers, setFollowedUsers } = useContext(UserContext);

    useEffect(() => {
        const URL = `${apiUrl}/follow/${user.userData.id}`;
        const AUT = authorization;

        const promise = axios.get(URL, AUT);
        promise.then((response) => {
            setFollowedUsers(response.data)
        }).catch((err) => {
            alert("Ocorreu um erro ao carregar os posts");
        });
    }, [apiUrl, user, authorization, setFollowedUsers]);

    console.log(followedUsers);

    return (
        <>
            <MainBody title={"timeline"} pageName={"timeline"} route={"timeline"} />
        </>
    );
}