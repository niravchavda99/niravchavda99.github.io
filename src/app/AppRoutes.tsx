import {Navigate, Route, Routes} from "react-router-dom";
import Projects from "./projects/Projects";
import App from "./App";
import Home from "./home/Home";

const AppRoutes = () => {
  return <Routes>
    <Route path={"/"} element={<App/>}>
      <Route path={"projects"} element={<Projects/>}/>
      <Route index element={<Home darkMode={false}/>}/>
    </Route>
    <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>;
}

export default AppRoutes;