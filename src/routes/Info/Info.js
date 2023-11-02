import { Link } from 'react-router-dom';
const Informacja = () => {
    return (
        <>
          <h2>Informacja</h2>
    
          <Link to="/about-airport">O lotnisku</Link>
          <Link to="/about-us">O nas</Link>
          <Link to="/faq">FAQ</Link>
        </>
      );
    };
  
  export default Informacja;