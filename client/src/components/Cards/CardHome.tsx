import React from "react";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";

interface props {
  id?: number;
  name: string;
  image: string;
  price: number;
}

export default function Card({ name, image, price, id }: props) {
  return (
    <div className={styles.card}>
      <Link
        to={{
          pathname: "/Detalles",
          state: {
            id: id,
          },
        }}
      >
        <img src={image} />
        <span>{name}</span>
        <div className={styles.buttons}>
          <button className={styles.learn}>Detalles</button>

          <button className={styles.buy}>
            ${new Intl.NumberFormat().format(price)}
          </button>
        </div>
      </Link>
    </div>
  );
}
