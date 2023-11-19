import {Navigate, Route, Routes} from "react-router-dom";
import App from "./App";
import Home from "./home/Home";
import {Projects} from "./projects/Projects";

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={"/"} element={<App/>}>
                <Route path={"projects"} element={<Projects/>}/>
                <Route index element={<Home/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
}

export default AppRoutes;