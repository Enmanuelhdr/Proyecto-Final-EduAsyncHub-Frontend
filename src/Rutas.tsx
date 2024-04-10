import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import DashboardAdmin from "./pages/userViews/viewAdmin/DashboardAdmin";
import EventosAdmin from "./pages/userViews/viewAdmin/EventosAdmin";
import NoticiasAdmin from "./pages/userViews/viewAdmin/NoticiasAdmin";
import UsuariosAdmin from "./pages/userViews/viewAdmin/UsuariosAdmin";
import ApiLogin from "./api/ApiLogin";
import DashboardStudent from "./pages/userViews/viewStudent/DashboardStudent";
import DashboardTeacher from "./pages/userViews/viewTeacher/DashboardTeacher";
import Noticias from "./pages/Noticias";
import Eventos from "./pages/Eventos";
import Nosotros from "./pages/Nosotros";
import NotFound from "./pages/NotFound";
import EventoView from "./pages/userViews/views/EventoView"
import Cookies from "universal-cookie";
import NoticiaView from "./pages/userViews/views/NoticiaView";
import AddTeacherSubjects from "./pages/userViews/viewAdmin/AddTeacherSubjects";
import Calificar from "./pages/userViews/viewTeacher/Calificar";
import Asistencia from "./pages/userViews/viewTeacher/Asistencia";
import Calendar from "./pages/userViews/viewAdmin/Calendar";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Rutas() {
  const cookies = new Cookies();
  const [userRole, setUserRole] = useState("");
  const cookieRole = cookies.get("userRole");
  localStorage.setItem("youare", userRole);

  const updateUserRole = (role: string) => {
    const cookies = new Cookies();
    cookies.set("userRole", role);
    setUserRole(role);
  };

  const isAuthenticated = (role: string, redirectPath: string = "/login") => {
    if (cookieRole === role) { 
      return <Outlet />;
    } else {
      return <Navigate to={redirectPath} replace />;
    }
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Rutas publicas */}
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<ApiLogin updateUserRole={updateUserRole} />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/eventos/:id" element={<EventoView />} />
        <Route path="/noticias/:id" element={<NoticiaView />} />

        {/* Rutas privadas */}
        <Route element={(isAuthenticated("Administrador", "/login"))}>
          <Route path="/dashboardAdministrador" element={<DashboardAdmin />} />
          <Route path="/usuariosAdmin" element={<UsuariosAdmin />} />
          <Route path="/eventosAdmin" element={<EventosAdmin/>}/>
          <Route path="/noticiasAdmin" element={<NoticiasAdmin/>}/>
          <Route path="/materiasAdmin" element={<AddTeacherSubjects/>} />
          <Route path="/actividades" element={<Calendar/>}/>
         
        </Route>

        <Route element={(isAuthenticated("Estudiante", "/login"))}>
          <Route path="/dashboardEstudiante" element={<DashboardStudent />} />
        </Route>

        <Route element={(isAuthenticated("Profesor", "/login"))}>
          <Route path="/dashboardProfesor" element={<DashboardTeacher />} />
          <Route path="/calificar/:materiaId/:gradoId" element={<Calificar/>} />
          <Route path="/asistencia/:materiaId/:gradoId/" element={<Asistencia/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
