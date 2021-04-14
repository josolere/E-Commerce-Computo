import React, { useState} from "react";
import styles from './SubMenu.module.scss'
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCategory } from '../../redux/actions';



interface IProps{
    item:{title:string, subNav:{title:string, id:number}[]}
}

const SubMenu = ({item}:IProps): JSX.Element => {

  const [subnav, setSubnav] = useState(false);
  const [select, setSelect] = useState([])
  
  const showSubNav = () => setSubnav(!subnav);

  const dispatch = useDispatch();

  const filterCategories = (e:any) => {
      dispatch(setCategory([e.target.value]))
  }
  

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
          item.subNav.map((item: { title: string, id:number}, i: number) => {
            return (
              <button onClick ={e => filterCategories(e)} className={styles.botonSec} key={i} value={item.id}>
                {item.title}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default SubMenu;