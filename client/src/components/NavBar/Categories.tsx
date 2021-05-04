import { useState } from "react";
import DropCategories from './DropDownCat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Dropdown.module.scss"
import { faList } from "@fortawesome/free-solid-svg-icons";


const SubDropCat = (props:any) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }
    return (  
        <div className={styles.menuItem} >
            <li className = {styles.navItem} >
        <a className={styles.link} onClick={handleOpen} >
        <FontAwesomeIcon icon={faList} style={{marginRight:'5%'}} />   {props.info}
        </a>
        {open && <DropCategories data ={handleOpen}></DropCategories>}
             </li>
        </div>
    );
}

export default SubDropCat