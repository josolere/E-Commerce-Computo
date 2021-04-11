import React, { useState } from 'react'
import search from './styleSearch.module.css'
import {useQuery, gql} from '@apollo/client'

interface Search{
    name:string
}


type FormElement = React.FormEvent<HTMLFormElement>;

const InputSearch = (): JSX.Element => {

    const [searchInput, setSearchInput] = useState('')
    
    const handleSubmit = (e: FormElement) => {
        e.preventDefault()
    }
    return (
        <>
            <form onSubmit={handleSubmit} action="">
                <input type="text"
                    placeholder='Buscar...'
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    className={search.inputSearch}
                />
            </form>
        </>
    )
}

export default InputSearch
