import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import logoStrony from '../images/logoStrony.png';

const Header = () => {
  return (
    <header>
      <div className="nav-area">
        <a href="/">
      <img src={logoStrony} alt="logo" className="logoStrony" width="100px" height="80px"/>
      </a>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
