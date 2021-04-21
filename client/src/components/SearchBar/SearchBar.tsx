import React, { useEffect, useState } from 'react'
/* import search from './styleSearch.module.css'
 */import { useQuery, gql } from '@apollo/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/actions';
import { GET } from "../../gql/searchbar"
import styles from "./searchbar.module.scss";
import { Link } from 'react-router-dom'

interface DetailsProduct {
    id: number
    brand: string
    image: string
    name: string
    price: number
    details: string
}

interface DetailsData {
    getProducts: DetailsProduct[]
}

interface Search {
    name: string
}

type FormElement = React.FormEvent<HTMLFormElement>;


const InputSearch = (): JSX.Element => {

    let namesproducts: Array<any> = [""]

    let idlist: Array<any> = []

    const { loading, error, data } = useQuery<DetailsData>(GET);
    if (data) {
        namesproducts = data?.getProducts.map(item => item.name)
        idlist = data?.getProducts.map(item => item)
    }

    const [auto, setAuto] = useState<Array<string>>([""])

    const [middlware, setMiddlware] = useState([""])

    const [searchInput, setSearchInput] = useState('')

    const dispatch = useDispatch();

    const handleSubmit = (e: FormElement) => {
        e.preventDefault()
        dispatch(setFilter(searchInput))
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value)
        setAuto(namesproducts.filter((name) =>
            name.toLowerCase().includes(searchInput.toLowerCase())
        ))
        // setAuto(middlware)
        if (e.currentTarget.value.length < 1) dispatch(setFilter("")) && setAuto([])
    }

    return (
        <div className={styles.alineSearch}>
            <form onSubmit={handleSubmit} className={styles.searchBar}>
                <div className={styles.bar}>
                    <input type="text"
                        placeholder='Buscar...'
                        onChange={handleChange}
                        value={searchInput}
/*                         className={search.inputSearch}
 */                    />
                    <button type="submit" /* className={search.buttonSearch} */><FontAwesomeIcon icon={faSearch} /></button>
                </div>
                {searchInput.length > 1 ? <div className={styles.linksearch} >

                    {auto.slice(0, 5).map(search => <span  onClick={e => {
                        dispatch(setFilter(search))
                        setAuto([])
                    }}>
                        <Link to='/Home'className={styles.listsearchbar}>
                            {search}
                        </Link>
                    </span>)}
                </div> :
                    <span></span>}
            </form>
        </div>
    )
}

export default InputSearch;
