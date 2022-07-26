import React, { useState } from "react";
import { CreateProduct } from "../features/products/CreateProduct";

import "../style/dashboard.css";
import { IoIosAddCircle } from "react-icons/io";
import ProductList from "../features/products/ProductList";
const Dashboard = () => {
  const [add, setAdd] = useState(false);

  return (
    <div>
      {!add ? (
        <div className="mode">
          <p>Add new Dish</p>

          <button className="add__button" onClick={() => setAdd(!add)}>
            <IoIosAddCircle />
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="add">
        {add ? (
          <>
            <CreateProduct add={add} setAdd={setAdd} />
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="center">
        <ProductList />
      </div>
    </div>
  );
};

export default Dashboard;
