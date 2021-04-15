import React, { useEffect, useState } from 'react'
import search from './styleSearch.module.css'
import { useQuery, gql } from '@apollo/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/actions';
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

const GET = gql`
{
    getProducts (filter:{limit:12}) {
        id
        name
        price
        image
    }
}`;

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
        setMiddlware(namesproducts.filter(
            (name) =>
                name.toLowerCase().indexOf(searchInput.toLowerCase()) > -1))
        setAuto(middlware)
        if (e.currentTarget.value.length === 0) dispatch(setFilter(searchInput)) && setAuto([])
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.searchBar}>
                <div className={styles.bar}>
                    <input type="text"
                        placeholder='Buscar...'
                        onChange={handleChange}
                        value={searchInput}
                        className={search.inputSearch}
                    />
                    <button type="submit" className={search.buttonSearch}><FontAwesomeIcon icon={faSearch} /></button>
                </div>
                <Link className={styles.linksearch} to="/Home">
                    <div className={styles.option}>
                        {auto.length > 1 ? auto.slice(0, 2).map(search => <p onClick={e => {
                            dispatch(setFilter(search))
                            setAuto([])
                        }}>{search}</p>) :
                            <p onClick={() => dispatch(setFilter(''))} >Esperando
                            </p>}
                    </div>
                </Link>
            </form>
        </>
    )
}

export default InputSearch;
