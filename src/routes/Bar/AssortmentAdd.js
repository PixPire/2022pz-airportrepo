import * as AsortymentApi from '../../api/AsortymentApi';
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import React,{useState, useEffect} from 'react';


export default function AssortmentAdd() {

    const history = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [nazwa,setNazwa]=useState(null);
    const [cena,setCena]=useState(null);
    const [zdjecie,setZdjecie]=useState(null);
  


    const onChangeAssortment=(e)=> 
    {
        const{id,value}=e.target;
        if(id==="nazwa")
        {
            setNazwa(value);
        }
        if(id==="cena")
        {
            setCena(value);
        }
        if(id==="zdjecie")
        {
            setZdjecie(value);
        }
        
    }
    function handleAssortment(e)
    {
        e.preventDefault();
        let assortnemtObject=
        {
           nazwa:nazwa,
            cena:cena,
            image:zdjecie
        }
        console.log(assortnemtObject);
        
        AsortymentApi.postAsortyment(assortnemtObject).then(response => {
            history('/assortment');
            if (response.status === 201) {
                alert("Product added");
            }});
            
    }

    useEffect(()=>{
        let role = Cookies.get('role');

     if (role == 'admin') {
        setIsAuthorized(false);
     }

   
}, [])
  
    if(isAuthorized)
    {
        return("Musisz być zalogowany jako admin");
    }
    return (
        
        <div>
            
        <form  onSubmit={handleAssortment} className='formM'>
        <h1 className='creator'>KREATOR DODAWANIA NOWEGO PRODUKTU</h1>
            <input type="text" id="nazwa" value = {nazwa} onChange={(e)=> onChangeAssortment(e)}   required placeholder="Nazwa produktu">
            </input>
            <br></br>
            <input type="number" id="cena" value ={cena} onChange={(e)=> onChangeAssortment(e)}   required placeholder="Cena produktu">
            </input>
            <br></br>
            <br></br>
            <input type="text" id="zdjecie" value ={zdjecie} onChange={(e)=> onChangeAssortment(e)}  required placeholder="Link do zdjęcia">
            </input>
            <br></br>
            <button type="submit" id="przyciskProduktu" >Dodaj Produkt</button>
        </form>
    </div>
    );
}
