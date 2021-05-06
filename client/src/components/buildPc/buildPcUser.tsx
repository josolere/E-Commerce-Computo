import React, { useState, useEffect } from "react";
import styles from "./buildPcUser.module.scss";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PRODUCT_COMPATIBILITIES } from "../../gql/buildPcgql";
import { GET_CATEGORIES } from "../../gql/productDetailsGql";
import CardPc from "./cardPc";
import { HiPlusSm } from "react-icons/hi";

let priceSubTotal = 0;
let quantity = 0;

const BuildPcUser = (): JSX.Element => {

  const { marca }: { marca: string } = useParams();

  const { data } = useQuery(GET_PRODUCT_COMPATIBILITIES, {
    variables: { idProduct: marca === "amd" ? 5 : 7 },
  });

  const { data: dataR } = useQuery(GET_CATEGORIES);

  const results = data?.getProductsCompatibilities;

  const categories = dataR?.getCategory;

  const [filterProducts, setFilterProducts]: any = useState([]);

  const [showProducts, setShowProducts] = useState(false);

  const [selectedProducts, setSelectedProducts]: any = useState([]);

  let productsToRender: any[] = [];

  let addLocalStorage = async (product: {
    id: number;
    price: number;
    name: string;
    image: string;
    Categories: [{}];
  }) => {
    let arrayProducts: any = [];
    const count = 1;

    const { id, price, name, image, Categories } = product;
    
    priceSubTotal = priceSubTotal + price;

    quantity = quantity + 1;

    if (!localStorage.getItem("buildLocal")) {
      arrayProducts.push({ id, price, count, name, image, Categories });
      localStorage.setItem("buildLocal", JSON.stringify(arrayProducts));
      localStorage.setItem("quantity", JSON.stringify(quantity));
      localStorage.setItem("priceSubTotal", JSON.stringify(priceSubTotal));
      productsToRender = productsToRender?.concat(selectedProducts);
    }
    if (localStorage.getItem("buildLocal")) {
      let localProducts: any = localStorage.getItem("buildLocal"); //Obtiene el contenido de buildLocal en en localStorage
      localProducts = JSON.parse(localProducts); //Parsea la wea de json a JS
      //Filtra el contenido previo de local Storage para que vengan solo los productos que no son el actual
      arrayProducts = localProducts.filter((item: any) => item.id !== product.id);
      //Pushea al contenido previo el producto que queremos agregar
      arrayProducts.push({ id, count, price, name, image, Categories });
      //Convierte a una string el array de productos nuevo y lo manda al local storage de vuelta
      localStorage.setItem("buildLocal", JSON.stringify(arrayProducts));
      localStorage.setItem("quantity", JSON.stringify(quantity));
      localStorage.setItem("priceSubTotal", JSON.stringify(priceSubTotal));
      localStorage.setItem("productsLocal", JSON.stringify(arrayProducts));

      productsToRender = productsToRender?.concat(arrayProducts);
    }
  };

  const deleteLocaStorageLess = (id: number) => {
    if (localStorage.getItem("buildLocal")) {
      let productLocal: any = localStorage.getItem("buildLocal");
      productLocal = JSON.parse(productLocal);
      const newLocal = productLocal?.filter((filt: any) => filt.id !== id);
      localStorage.setItem("buildLocal", JSON.stringify(newLocal));
      localStorage.setItem("productsLocal", JSON.stringify(newLocal));

      const newquantity = productLocal?.filter((filt: any) => filt.id === id);
      let quantity: any = localStorage.getItem("quantity");

      let quantityDelete = quantity - newquantity[0]?.count;
      localStorage.setItem("quantity", JSON.stringify(quantityDelete));

      let SubTotal: any = localStorage.getItem("priceSubTotal");

      let priceSubTotal =
      SubTotal - newquantity[0]?.price * newquantity[0]?.count;
      localStorage.setItem("priceSubTotal", JSON.stringify(priceSubTotal));
    }
  };

  const handleSelect = (product: any) => {
    setSelectedProducts([...selectedProducts, product]);
    setShowProducts(!showProducts);
    addLocalStorage(product);
  };

  const handleFilter = (e: any) => {

    const valores = results.slice().filter((el: { Categories: [{}] }) =>
      el.Categories.find((el: any) => el.name === e.currentTarget.value));
    setShowProducts(!showProducts);
    setFilterProducts(valores);
  };

  if (productsToRender?.length === 0) {
    let localProducts: any = localStorage.getItem("buildLocal");
    productsToRender = JSON.parse(localProducts);
  }

  const handleDelete = (e: any) => {
    setSelectedProducts(
      selectedProducts.filter((el: { Categories: [{}] }) =>
      el.Categories.find((el: any) => el.name !== e.currentTarget.value)
      )
    );
  };

  const handleRedirCart = () => {
    window.location.href = "http://localhost:3000/Carrodecompras";
  };

  console.log(selectedProducts)

  return (
    <React.Fragment>
      <div className={styles.mainElement}>
        <div className={styles.mainContainer}>
          {!showProducts ? (
            categories?.map((category: { name: string }) => (
              <div className={styles.buttonsInfo}>
                <button
                  className={styles.buttonCat}
                  value={category.name}
                  onClick={(e: React.MouseEvent<HTMLElement>) =>
                    handleFilter(e)
                  }
                >
                  {category.name}
                </button>

                {productsToRender &&
                productsToRender.find((el: any) =>
                  el.Categories.find((el: any) => el.name === category.name)
                ) ? (
                  <div className={styles.details}>
                    <div>
                      <img
                        src={
                          productsToRender.find((el: any) =>
                            el.Categories.find(
                              (el: any) => el.name === category.name
                            )
                          ).image
                        }
                      ></img>
                    </div>

                    <p>
                      {
                        productsToRender.find((el: any) =>
                          el.Categories.find(
                            (el: any) => el.name === category.name
                          )
                        ).name
                      }
                    </p>

                    <span>
                      $
                      {Intl.NumberFormat().format(
                        productsToRender?.find((el: any) =>
                          el.Categories.find(
                            (el: any) => el.name === category.name
                          )
                        ).price
                      )}
                    </span>

                    <button 
                      className={styles.buttonElim}
                      value={
                        productsToRender.find((el: any) =>
                          el.Categories.find(
                            (el: any) => el.name === category.name
                          )
                        ).id
                      }
                      onClick={(e: any) => {
                        deleteLocaStorageLess(
                          productsToRender.find((el: any) =>
                            el.Categories.find(
                              (el: any) => el.name === category.name
                            )
                          ).id
                        );
                        handleDelete(e);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                ) : (
                  <button disabled={!selectedProducts.find((el:any) => el.Categories.find((el:any) => el.name === "Motherboards"))
                 && category.name !== "Motherboards"}
                    value={category.name}
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                      handleFilter(e)
                    }
                    className={styles.add}
                  >
                    <HiPlusSm className={styles.icon} /> Add{" "}
                  </button>
                )}
              </div>
            ))
          ) : (
            <div>
              <button onClick={() => setShowProducts(!showProducts)}>
                Volver Atras
              </button>
              {filterProducts.map((product: any) => (
                <>
                  <CardPc
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    id={product.id}
                    action={handleSelect}
                    product={product}
                  />
                </>
              ))}
            </div>
          )}
          {!showProducts ? <button  className={styles.addCart} onClick={handleRedirCart}>Sumar al Carrito</button> : false}
        </div>
      </div>
    </React.Fragment>
  );
};


export default BuildPcUser;