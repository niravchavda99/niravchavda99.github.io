import {Navigate, Route, Routes} from "react-router-dom";
import Projects from "./projects/Projects";
import App from "./App";
import Home from "./home/Home";
import {getFromStorage} from "./Utils";
import {useState} from "react";

const AppRoutes = () => {
  const mode = getFromStorage();
  const [darkMode, setDarkMode] = useState(mode);

  return <Routes>
    <Route path={"/"} element={<App darkMode={darkMode} toggleDarkMode={setDarkMode}/>}>
      <Route path={"projects"} element={<Projects/>}/>
      <Route index element={<Home darkMode={darkMode}/>}/>
    </Route>
    <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>;
}

export default AppRoutes;