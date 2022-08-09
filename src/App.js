import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import ResetCss from "./styles/ResetCss";

export default function App() {
    return (
        <BrowserRouter>
            <ResetCss />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}