import React, { useState } from "react";
import styles from './SubMenu.module.scss'
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";



interface IProps{
    item:{title:string, subNav:{title:string}[]}
}

const SubMenu = ({item}:IProps): JSX.Element => {

  const [subnav, setSubnav] = useState(false);

  const showSubNav = () => setSubnav(!subnav);

  return (
    <div className={styles.containerCategories}>
      <div >
        <button onClick={showSubNav} value={item.title}>
          {item.title}
          <div className={styles.iconT}>
            {subnav ? <AiOutlineUp /> : <AiOutlineDown />}
          </div>
        </button>
      </div>
      <div >
        {subnav &&
          item.subNav.map((item: { title: string }, i: number) => {
            return (
              <button className={styles.botonSec} key={i}>
                {item.title}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default SubMenu;