import React, { useState } from 'react'
/* import search from './styleSearch.module.css'
 */

const InputSearch = ():JSX.Element => {

    const [searchInput, setSearchInput] = useState('')  

    return (
        <>
            <form action="">
                <input type="text"
                    placeholder='Buscar...'
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                />
            </form>
        </>
    )
}

export default InputSearch
