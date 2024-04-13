import React from 'react';
import axios from 'axios';

interface Props {
  id: string;
  comentario: string;
}

const Approve: React.FC<Props> = ({ id, comentario }) => {
 const [error, setError] = React.useState(false);

  const handleApprove = async () => {
    try {
   
      
      await axios.put(`http://www.eduasynchub.somee.com/api/Admisiones/Approve/${id}?comentario=${encodeURIComponent(comentario)}`);
     
    
    } catch (error) {
      
      console.error('Error al aprobar:', error);
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000);
    }
  };

  return (
    <>
      <button onClick={handleApprove} className='btn btn-success' >
      {error?"Error":"Aprobar"} 
      </button>
      
    </>
  );
}

export default Approve;
