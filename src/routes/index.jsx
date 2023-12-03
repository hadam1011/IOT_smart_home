import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home.jsx";
import Log from "../pages/log.jsx";
import Login from "../pages/login.jsx";
import Charts from "../pages/charts.jsx";

const RouterPages = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} >
                    <Route path="/logs" element={<Log />} />
                    <Route path="/chart" element={<Charts />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default RouterPages;