import React, { useEffect, useState } from 'react'
import search from './styleSearch.module.css'
/* import AsyncSelect from "react-select";
 */import { useQuery, gql } from '@apollo/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/actions';
import styles from "./searchbar.module.scss"

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
    console.log(namesproducts)

    const [userinput, setUserinput] = useState("")

    const [auto, setAuto] = useState<Array<string>>([""])

    const [middlware, setMiddlware] = useState([""])

    const [searchInput, setSearchInput] = useState('')

    const [showoption, setShowoption] = useState(false)

    const [idtodetails, setIdtodeatils] = useState<number>()

    /*     const handleinput = (event:React.FormEvent<HTMLInputElement>) => {
            setSearchInput(event?.currentTarget.value)
            if (namesproducts) {
            setMiddlware(namesproducts.filter(
                (namesproducts) =>
                  namesproducts.toLowerCase().indexOf(searchInput.toLowerCase()) > -1))
            setAuto(middlware)
        }
        } */

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
        

        if (searchInput.length === 1) dispatch(setFilter(searchInput))
    }
    console.log(idtodetails)

    return (
        <>
            <form onSubmit={handleSubmit} className="searchBar">
                <input type="text"
                    placeholder='Buscar...'
                    onChange={handleChange}
                    value={searchInput}
                    className={search.inputSearch}
                />
                <button type="submit" className={search.buttonSearch}><FontAwesomeIcon icon={faSearch} /></button>
                <div className={styles.option}>
                    <label color="white">{auto}</label>
                </div>
            </form>
        </>
    )
}

export default InputSearch;
