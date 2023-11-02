import { Link } from 'react-router-dom';
const Pracownik = () => {
    return (
        <>
          <h2>Pracownik</h2>
      
          <Link to="/pilot">Pilot</Link>
          <Link to="/admin">Admin</Link>
        </>
    );
};
  
export default Pracownik;