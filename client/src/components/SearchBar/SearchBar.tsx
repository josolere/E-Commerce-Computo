import React, { useState } from 'react'
import search from './styleSearch.module.css'
import {useQuery, gql} from '@apollo/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/actions';

interface DetailsProduct {
    id: number,
    brand: string,
    image: string,
    name: string,
    price: number,
    details: string,
}

interface DetailsData {
    getProducts: DetailsProduct[]
}

interface Search{
    name:string
}

type FormElement = React.FormEvent<HTMLFormElement>;

const GET_PRODUCT = gql` 
    query {
        getProducts {
            id
            name
        }
    }
`;

const InputSearch = (): JSX.Element => {

    const { loading, error, data } = useQuery<DetailsData>(GET_PRODUCT);

    const products = data?.getProducts

    let namesproducts = products?.map(item => item.name)

    const [userinput, setUserinput] = useState("")

    const [auto, setAuto] = useState<Array<string>>([""])
   
    const [middlware, setMiddlware] = useState([""])

    const [searchInput, setSearchInput] = useState('')

    console.log(namesproducts)

    const dispatch = useDispatch()

    const handleinput = (event:React.FormEvent<HTMLInputElement>) => {
        setSearchInput(event?.currentTarget.value)
        if (namesproducts) {
        setMiddlware(namesproducts.filter(
            (namesproducts) =>
              namesproducts.toLowerCase().indexOf(searchInput.toLowerCase()) > -1))
        setAuto(middlware)
    }
    }
    
    console.log(auto)

    const handleSubmit = (e: FormElement) => {
        e.preventDefault()
        dispatch(setFilter(searchInput))
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="searchBar">
                <input type="text"
                    placeholder='Buscar...'
                    onChange={handleinput}
                    value={searchInput}
                    className={search.inputSearch}
                />
            <button className={search.buttonSearch}><FontAwesomeIcon icon={faSearch}/>{auto}</button>
            </form>
        </>
    )
}

export default InputSearch
