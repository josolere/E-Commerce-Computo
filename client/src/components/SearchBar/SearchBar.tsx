import React from 'react'
import ButtonSearch from './ButtonSearch'
import InputSearch from './InputSearch'
import search from './styleSearch.module.css'

const SearchBar = (): JSX.Element => {

    
    return (
        <>
            <div className={search.contenedor}>
                <InputSearch />
                <ButtonSearch />
            </div>
        </>
    )
}

export default SearchBar
