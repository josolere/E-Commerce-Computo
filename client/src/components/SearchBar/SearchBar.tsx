import React, { useState } from 'react'
/* import search from './styleSearch.module.css'
 */import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { setCategory, setFilter } from '../../redux/actions';
import { GET } from "../../gql/searchbar"
import styles from "./searchbar.module.scss";
import { Link, Redirect} from 'react-router-dom'

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


type FormElement = React.FormEvent<HTMLFormElement>;


const InputSearch = (): JSX.Element => {

    let namesproducts: Array<any> = [""]

    const { data } = useQuery<DetailsData>(GET);
    if (data) {
        namesproducts = data?.getProducts.map(item => item.name)
    }

    const [auto, setAuto] = useState<Array<string>>([""])


    const [searchInput, setSearchInput] = useState('')

    //Estado para manejar la location actual, que la funcionalidad de la searchBar no dependa de la ruta
    const [redirect, setRedirect] = useState(true)

    

    const dispatch = useDispatch();

    const handleSubmit = (e: FormElement) => {
        e.preventDefault()
        dispatch(setCategory([]))
        dispatch(setFilter(searchInput))
        setRedirect(false)
    }
    


    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value)
        setRedirect(true)
        setAuto(namesproducts.filter((name) =>
            name.toLowerCase().includes(searchInput.toLowerCase())
        ))
        
        if (e.currentTarget.value.length < 1) dispatch(setFilter("")) && setAuto([])
    }

    return (
        <div className={styles.alineSearch}>
            <form onSubmit={handleSubmit} className={styles.searchBar}>
                {!redirect && window.location.pathname !== "/Home" ? <Redirect to="/Home" />: false}
                <div className={styles.bar}>
                    <input type="text"
                        placeholder='Buscar...'
                        onChange={handleChange}
                        value={searchInput}
                   />
                    <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                </div>
                {searchInput.length > 1 ? <div className={styles.linksearch} >

                    {auto.slice(0, 5).map(search => <span  onClick={e => {
                        dispatch(setFilter(search))
                        dispatch(setCategory([]))
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
