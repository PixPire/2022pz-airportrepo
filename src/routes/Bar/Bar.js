import { Link } from 'react-router-dom';
const Bar= () => {
    return (
        <>
          <h2>Bar</h2>    
          <Link to="/assortment">Asortyment baru</Link>
          <Link to="/assortment-add">Dodaj asortyment</Link>
        </>
    );
};
  
  export default Przyklad;