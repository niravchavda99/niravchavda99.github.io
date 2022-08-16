import {Navigate, Route, Routes} from "react-router-dom";
import App from "./App";
import Projects from "./projects/Projects";

const AppRoutes = () => {
  return <Routes>
    <Route path={"/projects"} element={<Projects/>}/>
    <Route path={"/"} element={<App/>}/>
    <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>;
}

export default AppRoutes;