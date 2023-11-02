import { menuItems } from '../menuItems';
import MenuItems from './MenuItems';
// import logoStrony from '../images/logoStrony.png';
import Cookies from 'js-cookie';

const Navbar = () => {
  let role = Cookies.get('role');
  console.log("Navbar call, role: ");
  console.log(role);
  console.log("All cookies: ");
  console.log(Cookies.get());

  if (role) {
    menuItems.contents[menuItems.indexes.ZalogujId] = {
      title: 'Wyloguj',
      url: '/logout'
    };

    menuItems.contents[menuItems.indexes.RejestracjaId] = {
      title: 'Dane użytkownika',
      url: '/user-data'
    };
    if(role==='admin'){
      menuItems.contents[menuItems.indexes.PracownikId] = {
        title: 'Pracownik',
        url: '/worker',
        submenu: [
          {
            title: 'Pilot',
            url: 'pilot',
          },
          {
            title: 'Admin',
            url: 'admin',
          },
        ],
      };
    }else if(role==='pilot'){
      menuItems.contents[menuItems.indexes.PracownikId] = {
        title: 'Pracownik',
        url: '/worker',
        submenu: [
          {
            title: 'Pilot',
            url: 'pilot',
          },
        ],
      };
    }else if(role==='editor'){
      menuItems.contents[menuItems.indexes.EdytorId] = {
        title: 'Edytor',
        url: '/articleEditor',
      };
    }
  }
  else{
    menuItems.contents[menuItems.indexes.ZalogujId] =     {
      title: 'Zaloguj',
      url: '/login',
    };

    menuItems.contents[menuItems.indexes.RejestracjaId] = {
      title: 'Rejestracja',
      url: '/registry'
    };
    menuItems.contents[menuItems.indexes.PracownikId] = {
      title: null,
      url: null
    };
    menuItems.contents[menuItems.indexes.EdytorId] = {
      title: null,
      url: null
    };
  }



  return (
    <nav>
      <ul className="menus">
        {menuItems.contents.map((menu, index) => {
          const depthLevel = 0;

            return (
              <MenuItems items={menu} key={index} depthLevel={depthLevel} />
            );
          
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
