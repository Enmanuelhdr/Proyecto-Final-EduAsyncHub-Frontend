import React from 'react';
import axios from 'axios';

interface Props {
  id: string;
  comentario: string;
}

const Reject: React.FC<Props> = ({ id, comentario }) => {
 const [error, setError] = React.useState(false);

  const handleReject = async () => {
    try {
   
      
      await axios.put(`http://www.eduasynchub.somee.com/api/Admisiones/Reject/${id}?comentario=${encodeURIComponent(comentario)}`);
     
    
    } catch (error) {
      
      console.error('Error al Rechazar:', error);
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000);
    }
  };

  return (
    <>
      <button onClick={handleReject} className='btn btn-danger' >
      {error?"Error":"Rechazar"} 
      </button>
      
    </>
  );
}

export default Reject;