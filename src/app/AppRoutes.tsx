import {Navigate, Route, Routes} from "react-router-dom";
import Repos from "./repos/Repos";
import App from "./App";
import Home from "./home/Home";

const AppRoutes = () => {

  return <Routes>
    <Route path={"/"} element={<App/>}>
      <Route path={"repos"} element={<Repos/>}/>
      <Route index element={<Home/>}/>
    </Route>
    <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>;
}

export default AppRoutes;