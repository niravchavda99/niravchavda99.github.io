import {Navigate, Route, Routes} from "react-router-dom";
import Projects from "./projects/Projects";
import App from "./App";
import Home from "./home/Home";
import {getThemeFromStorage} from "./Utils";
import {useState} from "react";

const AppRoutes = () => {
  const mode = getThemeFromStorage();
  const [theme, setTheme] = useState(mode);

  return <Routes>
    <Route path={"/"} element={<App theme={theme}/>}>
      <Route path={"projects"} element={<Projects theme={theme} toggleTheme={setTheme}/>}/>
      <Route index element={<Home theme={theme} toggleTheme={setTheme}/>}/>
    </Route>
    <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>;
}

export default AppRoutes;