import MainBody from "../shared/MainBody";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

export default function Timeline() {
    const { user } = useContext(UserContext);

    return (
        <>
            <MainBody title={"timeline"} pageName={"timeline"} route={`timeline/${user.userData.id}`} />
        </>
    );
}