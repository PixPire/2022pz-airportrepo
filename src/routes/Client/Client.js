import { Link } from 'react-router-dom';
const Pasazer = () => {
    return (
        <>
          <h2>Pasażer</h2>
      
          <Link to="/bar">Bar pokładowy</Link>
          <Link to="/flights">Loty</Link>
          <Link to="/reserveTickets">Rezerwacja Biletów</Link>
        </>
      );
      };
  
  export default Pasazer;