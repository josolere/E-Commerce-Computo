import React, { useState, useEffect } from "react";
import styles from "./buildPcUser.module.scss";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router"
import {getProductsBuild} from '../../gql/buildpc'
import Card from '../Cards/CardHome'
import {RenderElements} from './renderElements'


let categoriesId:number[] = []

/* 

function removeProduct(index:any){
    const asd = index;
} */



interface DetailsProduct {
    id: number,
    brand: string,
    image: string,
    name: string,
    price: number,
    details: string,
}

interface DetailsData {
    getProductsBuild: DetailsProduct[]
}

interface productData {
  name: string;
  price: number;
}

let products = [
  {
    request: "Elegí un procesador",
    name: "AMD Processor",
    price: "500000",
  },
  {
    request: "Elegí una placa madre",
    name: "Intel Processor",
    price: "400000",
  },
];

function removeProduct(index: any) {
  const asd = index;
}

/* const TableHeader = () => {
    return (
      
            <tr>

                <th>Nombre</th>
                <th>Precio</th>
                <th>Acción</th>
            </tr>
       
    )
} */

/* const TableBody = (props: any) => {
  const rows = props.productData?.map((row: any, index: any) => {
    return (
      <tr key={index}>
        <td>{row.request}</td>
        <td> </td>
        <td>{row.name}</td>
        <td>{row.price}</td>
        <td>
          <button onClick={() => removeProduct(index)}>Borrar</button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}; */




const BuildPcUser = (): JSX.Element => {
    
    let baseBrand = useParams()

    const name = ''
    
    const { data } = useQuery<DetailsData>(getProductsBuild)

    const productList = data?.getProductsBuild

    let filterFunction = (array:any, brand:string) => {
        let filteredArray = []
        if(brand === 'AMD'){
            filteredArray = array?.filter((product:any) => {
                if(product.brand === 'AMD')
                return true;
            })
        }else{
            filteredArray = array?.filter((product:any) => {
                if(product.brand === 'Intel')
                return true;
            })
        }
        return filteredArray
    }
    
    let filteredProducts = filterFunction(productList, 'AMD')
    console.log(filteredProducts)

    let products = 
        {
          request: "Elegí un procesador",
          name: "AMD Processor",
          price: "500000",
        }

  return (
    <React.Fragment>
      <div className={styles.mainElement}>
        <div className={styles.mainContainer}>
          <div className={styles.titulos}>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </div>

          <div className= {styles.buttonsInfo}>
              <button>Elegí un procesador</button>
              <p style={{fontSize:"0.9rem"}}>{products.name}</p>
              <span style={{fontSize:"0.9rem"}}>${products.price}</span>
              <button>Eliminar</button>
          </div>
          <div className= {styles.buttonsInfo}>
              <button>Elegí una motherboard</button>
              <p style={{fontSize:"0.9rem"}}>{products.name}</p>
              <span style={{fontSize:"0.9rem"}}>${products.price}</span>
              <button>Eliminar</button>
          </div>

        </div>
      </div>

      <div>
        <RenderElements products={filteredProducts}/>

      </div>
    </React.Fragment>
  );
};
export default BuildPcUser;




/*
    Traemos los productos con la query -----> 
    ↓
    Los filtramos ------> 
    ↓
    Pasarlos por props al componente que los va a renderizar(se renderizan)----->
    ↓
    Cuando el usuario elige, se va guardando la elección en el localStorage ---->
    ↓
    Agregar elección al carrito
*/