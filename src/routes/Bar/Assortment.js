import {
  getAsortyment,
  putAsortymentId,
  deleteAsortymentId,
} from "../../api/AsortymentApi";
import { Button, Table } from "react-bootstrap";
import classes from "./Assortment.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import ShoppingCartContext from "../../context/ShoppingCartContext";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
export default function Assortment() {
  const history = useNavigate();
  const shoppingCartCtx = useContext(ShoppingCartContext);
  const handleAddToCart = (item) => {
    shoppingCartCtx.addToCart({
      id: item.id,
      nazwa: item.nazwa,
      image: item.image,
      cena: item.cena,
    });
    alert("Dodano produkt do wózka!");
    alert(item.nazwa);
  };

  const [menu, setMenu] = useState([]);
  const fetchData = () => {
    getAsortyment().then((response) => {
      setMenu(response.results);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id,nazwa) => {
    if(window.confirm(`Czy na pewno chcesz usunąć produkt ${nazwa}? `)==true)
    {
      deleteAsortymentId(id);
      var index = menu
        .map(function (e) {
          return e.id;
        })
        .indexOf(id);
      menu.splice(index, 1);
      alert(`Usunięto produkt ${nazwa}`);
      history('/assortment');
    }
  };

  const handleEdit = (id) => {
    localStorage.setItem("id", id);
  };

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let role = Cookies.get("role");

    if (role != "admin") {
      setIsAuthorized(true);
    }
  }, []);

  return (
    <div>
      <h1 className="creator">Oferta Baru Podniebnego</h1>

      <ul className={classes.list}>
        {menu.map((item) => {
          return (
            <li className={classes.item}>
              <div className={classes.card}>
                <tr>
                  <div className={classes.image}>
                    <img
                      src={item.image}
                      alt="Image Not Found"
                    />
                  </div>
                  <div className={classes.content}>
                    <h2>{item.nazwa}</h2>
                    <h2>{item.cena} PLN</h2>
                  </div>

                  <div className={classes.actions}>
                    <Button onClick={() => handleAddToCart(item)}>
                      Dodaj Do Koszyka
                    </Button>
                    </div>
                  
                    {isAuthorized == false && (
                      <div className={classes.actions}>
                        <Link to={`/assortmentEdit`}>
                          <Button onClick={() => handleEdit(item.id)}>
                            Edytuj
                          </Button>
                        </Link>
                        &nbsp;
                        <Button onClick={() => handleDelete(item.id,item.nazwa)}>
                          Usuń
                        </Button>
                      </div>
                    )}
                  
                </tr>
              </div>
            </li>
          );
        })}
      </ul>
      {/* //poprzednia tabela z produktami
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nazwa</th>
                <th>Zdjęcie</th>
                <th>Cena</th>

                <th>
                  <img
                    src={require("../../images/shoppingCart.jpg")}
                    alt="not found :C"
                    width="50"
                    height="50"
                  />
                </th>
                {isAuthorized == false && <th>-Czynności admina-</th>}
              </tr>
            </thead>
            <tbody>
              {menu.map((item) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.nazwa}</td>
                    <td>
                      <img
                        src={item.image}
                        alt="Image Not Found"
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>{item.cena} PLN</td>

                    <td>
                      <Button onClick={() => handleAddToCart(item)}>
                        Dodaj Do Koszyka
                      </Button>
                    </td>
                    <td>
                      {isAuthorized == false && (
                        <>
                          <Link to={`/assortmentEdit`}>
                            <Button onClick={() => handleEdit(item.id)}>
                              Edytuj
                            </Button>
                          </Link>
                          &nbsp;
                          <Button onClick={() => handleDelete(item.id)}>
                            Usuń
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {isAuthorized == false && (
            <Link className="d-grid gap-2" to="/assortmentAdd">
              <Button size="lg">Dodaj Nowy Produkt</Button>
            </Link>
          )}

          <br></br>
          <Link className="d-grid gap-2" to="/ShoppingCart">
            <Button size="lg">Przejdź do Koszyka</Button>
          </Link>
        </div>
        */}
         <Link className="d-grid gap-2" to="/ShoppingCart">
            <Button size="lg">Przejdź do Koszyka</Button>
          </Link>
    </div>
  );
}
