import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import DashboardAdmin from "./pages/userViews/viewAdmin/DashboardAdmin";
import ApiLogin from "./api/ApiLogin";
import DashboardStudent from "./pages/userViews/viewStudent/DashboardStudent";
import DashboardTeacher from "./pages/userViews/viewTeacher/DashboardTeacher";
import Noticias from "./pages/Noticias";
import Eventos from "./pages/Eventos";
import NotFound from "./pages/NotFound";
import Cookies from "universal-cookie";
import { useState } from "react";

function Rutas() {
  const cookies = new Cookies();
  const [userRole, setUserRole] = useState("");
  const cookieRole = cookies.get("userRole");
  localStorage.setItem("youare",userRole)
  
  
  const updateUserRole = (role: string) => {
    const cookies = new Cookies();
    cookies.set("userRole", role);
    setUserRole(role);
    
  };

  const isAuthenticated = (role: string,  redirectPath: string = "/") => {
    
    
    if (cookieRole === role) { 
      return <Outlet />;
    } else {
      return <Navigate to={redirectPath} replace />;
    }
  
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<ApiLogin updateUserRole={updateUserRole} />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/eventos" element={<Eventos />} />

        {/* Rutas privadas */}
        <Route element={(isAuthenticated("Administrador", "/login"))}>
        
          <Route path="/dashboardadmin" element={<DashboardAdmin />} />
        </Route>


        <Route element={(isAuthenticated("Estudiante", "/login"))}>
          <Route path="/dashboardstudent" element={<DashboardStudent />} />
        </Route>


        <Route element={(isAuthenticated("Profesor", "/login"))}>
          <Route path="/dashboardteacher" element={<DashboardTeacher />} />
        </Route>
      </Routes>

      
    </BrowserRouter>
  );
}

export default Rutas;