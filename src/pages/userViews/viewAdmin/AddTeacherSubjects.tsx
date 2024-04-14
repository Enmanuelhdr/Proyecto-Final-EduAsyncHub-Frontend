import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import { IoIosAddCircleOutline } from "react-icons/io";
import NavBar from "../../../components/NavBar";
import NavBarData from "../../../data/AdminNavbard.json";

interface User {
  usuarioId: string;
  nombre: string;
  contraseña: string;
  correoElectronico: string;
  estudiante: null;
  profesore: null;
  rol: null;
  rolId: number;
}

interface FormData {
  teacherUserId: string;
  materiaId: number;
  gradoId: number;
}

const AddTeacherSubjects: React.FC = () => {
  const cookies = new Cookies();
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<FormData>({
    teacherUserId: "",
    materiaId: 0,
    gradoId: 0,
  });
  const [temporalTeacherId, setTemporalTeacherId] = useState("");
  const [temporalTeacherName, setTemporalTeacherName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const token = cookies.get("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get<User[]>(
        "http://www.eduasynchub.somee.com/api/Admin/ObtenerProfesores"
      );

      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error("Error: API response is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async () => {
    try {
      const response: AxiosResponse<User[]> = await axios.post(
        `http://www.eduasynchub.somee.com/api/Teacher/AsignarMaterias?teacherUserId=${formData.teacherUserId}&materiaId=${formData.materiaId}&gradoId=${formData.gradoId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response:", response.data);
      setSuccessMessage("Materia asignada correctamente");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setErrorMessage("El Profesor ya tiene asignada esa materia en ese grado");

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (user: User) => {
    setTemporalTeacherId(user.usuarioId);
    setTemporalTeacherName(user.nombre);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTemporalTeacherId("");
    setTemporalTeacherName("");
  };

  return (
    <>
      <NavBar
        brand="Asignar Materias"
        goto="/materiasAdmin"
        navData={NavBarData}
      />

      <div className="container">
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="table-responsive pt-4">
          <h1 className="d-flex justify-content-center">Profesores</h1>
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th className="sticky-th">Id</th>
                <th className="sticky-th">Nombre</th>
                <th className="sticky-th">Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.usuarioId}>
                  <th scope="row">{user.usuarioId}</th>
                  <td>{user.nombre}</td>
                  <td>
                    <button
                      type="button"
                      className="btn"
                      data-toggle="tooltip"
                      title="Asignar materia"
                      onClick={() => {
                        openModal(user);
                        setFormData({
                          ...formData,
                          teacherUserId: user.usuarioId,
                        });
                      }}
                    >
                      <IoIosAddCircleOutline
                        className="text-primary fs-3 "
                       
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}

      {modalOpen && (
        <div
          className="modal fade show"
          id="modalAsignar"
          aria-labelledby="viewModalLabel"
          aria-hidden="true"
          tabIndex={-1}
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Asignar Materia</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="">
                  <p className="fw-bold">
                    {temporalTeacherName} ({temporalTeacherId})
                  </p>
                </div>

                <form className="form ">
                  <div className="form-group mb-2">
                    <label className="fw-bold">
                      Materia
                      <select
                        className="form-select"
                        name="materiaId"
                        id="materiaId"
                        value={formData.materiaId}
                        onChange={handleChange}
                        required
                      >
                        <option value="1">Lengua Española</option>
                        <option value="2">Ciencias Matematicas</option>
                        <option value="3">Ciencias Naturales</option>
                        <option value="4">Ciencias Sociales</option>
                        <option value="5">Civica</option>
                        <option value="6">Informatica</option>
                        <option value="7">
                          Formacion Humana, Integral y Religiosa
                        </option>
                        <option value="8">Educacion Fisica</option>
                        <option value="9">Educacion Sexual</option>
                        <option value="10">Ingles</option>
                        <option value="11">Frances</option>
                        <option value="12">Educacion Artistica</option>
                      </select>
                    </label>
                  </div>

                  <div className="form-group mb-2">
                    <label className="fw-bold">
                      Grado ID
                      <select
                        className="form-select"
                        name="gradoId"
                        id="gradoId"
                        value={formData.gradoId}
                        onChange={handleChange}
                        required
                      >
                        <option value="1">Primero de Primaria</option>
                        <option value="2">Segundo de Primaria</option>
                        <option value="3">Tercero de Primaria</option>
                        <option value="4">Cuarto de Primaria</option>
                        <option value="5">Quinto de Primaria</option>
                        <option value="6">Sexto de Primaria</option>
                        <option value="7">Primero de Secundaria</option>
                        <option value="8">Segundo de Secundaria</option>
                        <option value="9">Tercero de Secundaria</option>
                        <option value="10">Cuarto de Secundaria</option>
                        <option value="11">Quinto de Secundaria</option>
                        <option value="12">Sexto de Secundaria</option>
                      </select>
                    </label>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={closeModal}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    handleSubmit();
                    setTemporalTeacherId("");
                    closeModal();
                  }}
                >
                  Asignar Materia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTeacherSubjects;
