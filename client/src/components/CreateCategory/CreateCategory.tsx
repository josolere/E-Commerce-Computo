import React, { useState, useEffect } from 'react'
import styles from './loguin.module.scss'
import styles1 from "./CreateCategory.module.scss"
import { NEW_CATEGORY } from "../../gql/categoriesGql"
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORIES } from "../../gql/categoriesGql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import styles2 from '../Users/Edit.module.scss';
import { toast } from 'react-toastify';



interface Categorie {
    id: number | undefined,
    name: string | undefined,
}

interface Categories {
    getCategory: Categorie[]
}

type FormEvent = React.FormEvent<HTMLFormElement>
type InputEvent = React.FormEvent<HTMLInputElement>

export default function CreateProduct(): JSX.Element {

    const results = useQuery<Categories>(GET_CATEGORIES)

    const categories = results?.data?.getCategory

    const [cat, setCat] = useState<any>()

    const [categorie, setCategorie] = useState("")

    const [createCategory] = useMutation(NEW_CATEGORY)

    const [listCategory, setListCategory] = useState<Array<string>>([])

    let newCategory = ''

    useEffect(() => {
        setCat(categories)

    }, [categories])

    function handleChange(e: InputEvent) {
        return setCategorie(e.currentTarget.value)
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        createCategory({ variables: { name: categorie } })
            .then((resolve) => {
                setListCategory([...listCategory, resolve.data.createCategory]);
                toast.success("Categoría añadida con éxito")
            })
            .then((res) =>{setCategorie("")})
            .catch((err) => { console.log(err) })
    }
    /* console.log(cat)
    console.log(listCategory) */
    return (
        <div className={styles.back}>
            <div className={styles.organizar}>
                <div className={styles.caja}>
                    <div className={styles.container}>
                        <div className={styles.containeTitle}>
                            <h1 className={styles.titleCreate} >Añadir Categoría</h1>
                        </div>
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.form__group}>
                            <label htmlFor='Nombre' className={styles.form__label} >
                                <FontAwesomeIcon icon={faFileSignature} aria-hidden={true} /> Nombre
                        </label>
                            <input
                                className={styles.form__field}
                                placeholder='Nombre'
                                minLength={2}
                                maxLength={30}
                                value={categorie}
                                type='text'
                                name='name'
                                onChange={handleChange}
                                required={true}
                            />
                        </div>

                        <div className={styles.organizarbotones}>
                            <button type='submit' className={styles.boton}> Añadir </button>
                        </div>
                    </form>
                    <div className={styles.listProducts}>
                        {/* <h4 className={styles1.TitleList} >Categorías creadas</h4>  */}
                        <hr className={styles1.hrList} />
                        {cat && cat.map((item: any, index: number) => (
                            <button key={index} className={styles.pList}> {item?.name} {/* <span>x</span> */}</button>
                        ))}
                        {listCategory && listCategory.map((item: any, index: number) => (
                            <button key={index} className={styles.pList} >{item.name} </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
