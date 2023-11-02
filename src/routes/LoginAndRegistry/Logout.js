import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import * as UserApi from '../../api/UserApi';
const Logout = () => {
    UserApi.logout();
    //return window.location.href = '/';
    return <Navigate to='/'  />
};
  
  export default Logout;