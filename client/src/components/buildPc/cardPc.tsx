import React from "react";
import styles from "./cardPc.module.scss";

interface IProps {
  name: string;
  image: string;
  price: number;
  id: number;
  action:(product:any) => void
  product : {}
}

const CardPc = ({ name, image, price, action, id, product }: IProps) => {
  return (
      <div className={styles.containerCards}>
    <div className={styles.card}>
      <div className={styles.img}>
        <img src={image} />
      </div>
      <div className={styles.name}>{name}</div>
      <span>${Intl.NumberFormat().format(price)}</span>
      <button className={styles.button} onClick={() => action(product)}>Agregar</button>
    </div>
    </div>
  );
};

export default CardPc;