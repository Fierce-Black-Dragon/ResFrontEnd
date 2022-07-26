import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
// import { setCredentials } from "./";
import "./productStyle/products.css";
import { useGetProductsQuery } from "./productApiSlice";
import { setProducts } from "./productSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  let regular = [];

  // const dailyDishes = data?.
  // const Specials = data?.products.filter(
  //   (product) => product.isSpecial === true
  // );

  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();

  const regularProducts = data?.products.filter(
    (product) => product.isSpecial === false
  );
  const SpecialProduct = data?.products.filter(
    (product) => product.isSpecial === true
  );

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <div className="all">
        <div className="dishes">
          <h5>Regular dishes</h5>
          <div className="dailyDishes">
            {regularProducts?.map((product) => {
              return <Product key={product.id} {...product} edit />;
            })}
          </div>
          <h5>Special Dishes</h5>
          <div className="Special">
            {SpecialProduct?.map((product) => {
              return <Product key={product.id} {...product} />;
            })}
          </div>
        </div>
      </div>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default ProductList;
