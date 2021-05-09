import { Link } from "react-router-dom";
import styles from "./Dropdown.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, gql } from '@apollo/client';
import { useDispatch } from "react-redux";
import { setCategory, setFilter } from "../../redux/actions";
import { GET_CATEGORIES } from "../../gql/categoriesGql"
import Cards from '../Cards/CardsHome';

export interface model {
    id: number;
    name: string
}

interface DetailsData {
    getCategory: model[]
}

const DropCategories = (props: any) => {

    const { loading, error, data } = useQuery<DetailsData>(GET_CATEGORIES)
    const categories = data?.getCategory

    const reset = 0
    const dispatch = useDispatch()

    const filterCategories = (e: any) => {
        if (e.target.value) {
            dispatch(setCategory([e.target.value]))
        }
        else {
            dispatch(setCategory([]))
        }
        dispatch(setFilter(""))
    }

    return (
        <div className={styles.dropdown} onMouseLeave={props.data}>
            <div className={styles.orderdiv}>
                <button className={styles.ButtonDrops} onClick={e => filterCategories(e)}>Todos</button>
                {categories?.map((item: model, i: number) => {
                    return <button onClick={e => filterCategories(e)} value={item.id}
                        className={styles.ButtonDrops}>{item.name}</button>;
                })}
            </div>
        </div>
    )
}

export default DropCategories