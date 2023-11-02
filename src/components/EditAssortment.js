import React from "react";

export default function Asortyment_edit() {
    
   
    return (
        <div>
            
        <form  className='formM'>
        <h1 className='creator'>KREATOR DODAWANIA NOWEGO PRODUKTU</h1>
            <input type="text" id="nazwa"   required placeholder="nazwa produktu">
            </input>
            <br></br>
            <input type="number" id="cena" padding="120px 200px"  required placeholder="cena produktu">
            </input>
            <br></br>
            <br></br>
            <button id="przyciskImage" >Dodaj Zdjęcie</button>
            <br></br>
            <br></br>
            <button type="submit" id="przyciskProduktu" >Dodaj Produkt</button>
            
        </form>
    </div>
    );
}
//