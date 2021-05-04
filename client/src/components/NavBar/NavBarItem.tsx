import { useState } from "react";
import DropdownMenu from "./Dropdown";
import styles from "./Dropdown.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

const NavBarItem = (props:any) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }
    
    return (  
        <div className={styles.menuItem} >
            <li className = {styles.navItem} >
        <a className={styles.link} onClick={handleOpen} >
        <FontAwesomeIcon icon={faUserAlt} style={{marginRight:'5%'}} />   {props.info}
        </a>
        {open && <DropdownMenu data ={handleOpen}></DropdownMenu>}
             </li>
        </div>
    );
}
 
export default NavBarItem;