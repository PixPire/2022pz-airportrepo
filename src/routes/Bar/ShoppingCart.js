import React from "react";
import { Button, Table } from "react-bootstrap";
import { useContext } from "react";
import ShoppingCartContext from "../../context/ShoppingCartContext";
import { createContext, useState } from "react";

export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);

  const shoppingCartCtx = useContext(ShoppingCartContext);
  const handleDeleteFromCart = (item) =>{
    
    shoppingCartCtx.items = shoppingCartCtx.items.filter((x)=> x.id !== item.id);
    setCartItems(shoppingCartCtx.items);
    shoppingCartCtx.setActualItems(shoppingCartCtx.items);
  }

  return (
    <div>
      <h1 className="creator">AKTUALNE ZAMÓWIENIE</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nazwa</th>
            
            <th>Cena</th>
            <th>
              <img
                src={require("../../images/ThrashBin.jpg")}
                alt="not found :C"
                width="25"
                height="25"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {shoppingCartCtx.items.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.nazwa}</td>
                
                <td>{item.cena} PLN</td>
                <td>
                  <Button onClick={()=> handleDeleteFromCart(item)}>Usuń</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <form className="formM">
        <br></br>
        <button type="submit" id="przyciskPotwierdzenia">
          Potwierdź Zamówienie
        </button>
      </form>
    </div>
  );
}
//
