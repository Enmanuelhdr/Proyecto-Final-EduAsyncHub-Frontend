import React from 'react';

interface BarProps {
  label: string;
  value: number;
  max: number;
}

const Bar: React.FC<BarProps> = ({ label, value, max }) => {
  const width = (value / max) * 100 + '%';
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="me-3">{label}</div>
        <div>{value}</div>
      </div>
      <div className="progress">
        <div className="progress-bar bg-danger" role="progressbar" style={{ width }} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}></div>
      </div>
    </div>
  );
};

interface UserCounts {
  students: number;
  teachers: number;
  administrators: number;
}

const UserComparisonBar: React.FC<UserCounts> = ({ students, teachers, administrators }) => {
  const max = Math.max(students, teachers, administrators);

  return (
    <div className="card shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-4 fw-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2 me-2 text-danger">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          Comparación de Usuarios
        </h5>
        <Bar label="Estudiantes" value={students} max={max} />
        <Bar label="Profesores" value={teachers} max={max} />
        <Bar label="Administradores" value={administrators} max={max} />
      </div>
    </div>
  );
};

export default UserComparisonBar;
