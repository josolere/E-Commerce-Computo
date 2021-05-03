import { useState } from "react";
import DropdownMenu from "./Dropdown";
import styles from "./Dropdown.module.scss"





 
const NavBarItem = (props:any) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }
    
    return (  
        <div className={styles.menuItem} >
            <li className = {styles.navItem} >
        <a className={styles.link} onMouseEnter={handleOpen} >
            {props.info}
        </a>
        {open && <DropdownMenu data ={handleOpen}></DropdownMenu>}
             </li>
        </div>
    );
}
 
export default NavBarItem;