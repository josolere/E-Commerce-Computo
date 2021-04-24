import React, { useState, useEffect } from 'react'
import styles from './CreateCategory.module.scss'
import { NEW_CATEGORY } from "../../gql/categories"
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORIES } from "../../gql/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';


interface Categorie {
    id: number | undefined,
    name: string | undefined,
}

interface Categories {
    getCategory: Categorie[]
}

type FormEvent = React.FormEvent<HTMLFormElement>
type InputEvent = React.FormEvent<HTMLInputElement>

export default function CreateProduct():JSX.Element {

    const results = useQuery<Categories>(GET_CATEGORIES)

    const categories = results?.data?.getCategory

    const [cat, setCat] = useState<any>()

    const [categorie, setCategorie] = useState("")

    const [createCategory, { data }] = useMutation(NEW_CATEGORY)

    const [listCategory, setListCategory] = useState<Array<any>>([])

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
            .then((resolve) => { console.log(resolve) })
            .catch((err) => { console.log('Salio Mal') })
        if (data) {
            newCategory = data?.createCategory
            setListCategory([...listCategory, newCategory])
        }
    }

    console.log(data)

    return (
        <div className={styles.container}>
            <h4 className={styles.TitleCreate} >Crear Categoría</h4>
            <div className={styles.OrderCreate} >
                <div className={styles.OrderForm} >
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
                        <div className={styles.OrderButton} >
                            <button type='submit' className={styles.button}> Crear </button>
                        </div>
                    </form>
                </div>

                <div className={styles.separateList}>
                    <div className={styles.listProducts}>
                        <h4 className={styles.TitleList} >Categorías creadas</h4>
                        <hr className={styles.hrList} />
                        {cat && cat.map((item: any, index: number) => (
                            <button key={index} className={styles.pList}>{item?.id}: {item?.name}</button>
                        ))}
                        {listCategory && listCategory.map((item: any, index: number) => (
                            <button key={index} className={styles.pList} >{item?.id}: {item.name}</button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}