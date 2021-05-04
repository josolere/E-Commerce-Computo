import React, { useState, useEffect } from "react";
import styles from "./buildPcUser.module.scss";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PRODUCT_COMPATIBILITIES } from "../../gql/buildPcgql"
import { categories } from "./mockCategories"
import BuildPc from "./buildPc"



interface productData {
  name: string;
  price: number;
}



const BuildPcUser = (): JSX.Element => {

  

  const { marca } : {marca:string} = useParams()

  const { data } = useQuery(GET_PRODUCT_COMPATIBILITIES, {variables: {idProduct: marca === "amd" ? 22 : 23}})
  
  return (
    <React.Fragment>
      <div className={styles.mainElement}>
        <div className={styles.mainContainer}>
          {/* <div className={styles.titulos}>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </div> */}
          
          {categories?.map((el:string)=>
              <div className= {styles.buttonsInfo}>
                  <Link to={`/armatupc/tipo/${el}`}>{el}</Link>
                  <p style={{fontSize:"0.9rem"}}></p>
                  <span style={{fontSize:"0.9rem"}}></span>
                  <button>Eliminar</button>
              </div>)}
        </div>
      </div>
    </React.Fragment>
  );
};
export default BuildPcUser;
