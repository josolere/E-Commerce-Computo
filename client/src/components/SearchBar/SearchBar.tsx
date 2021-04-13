import React, { useEffect, useState } from 'react'
import search from './styleSearch.module.css'
import AsyncSelect from "react-select";
import {useQuery, gql} from '@apollo/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/actions';


interface Search{
    name:string
}


type FormElement = React.FormEvent<HTMLFormElement>;

const InputSearch = (): JSX.Element => {

   /*  const [display, setDisplay] = useState(false)
    const [options, setOptions] = useState([]) */
    const [searchInput, setSearchInput] = useState('')
    
    const dispatch = useDispatch();
    
     const handleSubmit = (e: FormElement) => {
        e.preventDefault()
        dispatch(setFilter(searchInput))
    } 
    
    const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value)
        console.log("estado" + searchInput)
        if(searchInput.length === 1) dispatch(setFilter(searchInput))
    }



    return (
        <>
            <form onSubmit={handleSubmit} className="searchBar">
                <input type="text"
                    placeholder='Buscar...'
                    onChange={(e) => handleChange(e)}
                    value={searchInput}
                    className={search.inputSearch}
                />
            <button type="submit" className={search.buttonSearch}><FontAwesomeIcon icon={faSearch}/></button>
            </form>
        </>
    )
}

export default InputSearch;
