import {Navigate, Route, Routes} from "react-router-dom";
import App from "./App";

const AppRoutes = () => {
  return <Routes>
    <Route path={"/"} element={<App/>}/>
    <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>;
}

export default AppRoutes;