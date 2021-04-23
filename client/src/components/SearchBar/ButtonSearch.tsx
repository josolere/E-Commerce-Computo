import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
/* import search from './styleSearch.module.css'
 */


const ButtonSearch = (): JSX.Element => {
    return (
        <>
            <button
                type='submit'
/*                 className={search.buttonSearch}
 */            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </>
    )
}

export default ButtonSearch
