import React, { useEffect, useState } from 'react'
import search from './styleSearch.module.css'
import AsyncSelect from "react-select";
import {useQuery, gql} from '@apollo/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


interface Search{
    name:string
}


type FormElement = React.FormEvent<HTMLFormElement>;

const InputSearch = (): JSX.Element => {

   /*  const [display, setDisplay] = useState(false)
    const [options, setOptions] = useState([]) */
    const [searchInput, setSearchInput] = useState('')
    
    
    const handleSubmit = (e: FormElement) => {
        e.preventDefault()
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="searchBar">
                <input type="text"
                    placeholder='Buscar...'
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    className={search.inputSearch}
                />
            <button className={search.buttonSearch}><FontAwesomeIcon icon={faSearch}/></button>
            </form>
        </>
    )
}

export default InputSearch
