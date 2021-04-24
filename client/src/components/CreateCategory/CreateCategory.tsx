<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from 'react'
import styles from './CreateCategory.module.scss'
import { NEW_CATEGORY } from "../../gql/categories"
import { gql, useMutation } from '@apollo/client';

/* interface categoryInventary {
    input: {
        id: number
        name: string
    }
}
 */
/* interface newCategoryDetails {
    name: string
} */

=======
=======
>>>>>>> LogFront
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
<<<<<<< HEAD
>>>>>>> front_roto
=======
>>>>>>> LogFront

type FormEvent = React.FormEvent<HTMLFormElement>
type InputEvent = React.FormEvent<HTMLInputElement>

<<<<<<< HEAD
<<<<<<< HEAD
export default function CreateProduct() {

    const [categorie, setCategorie] = useState("")
    /*     const [createNewCategory, { error, data }] = useMutation<
        {createNewProduct: categoryInventary},
        {category:newCategoryDetails}
        >(NEW_CATEGORY,{variables:{category:{name:categorie}}}) */
=======
=======
>>>>>>> LogFront
export default function CreateProduct():JSX.Element {

    const results = useQuery<Categories>(GET_CATEGORIES)

    const categories = results?.data?.getCategory

    const [cat, setCat] = useState<any>()

    const [categorie, setCategorie] = useState("")

<<<<<<< HEAD
    const [showCreate, setShowCreate] = useState(false)

>>>>>>> front_roto

=======
>>>>>>> LogFront
    const [createCategory, { data }] = useMutation(NEW_CATEGORY)

    const [listCategory, setListCategory] = useState<Array<any>>([])

    let newCategory = ''

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> LogFront
    useEffect(() => {
        setCat(categories)

    }, [categories])

<<<<<<< HEAD
>>>>>>> front_roto
=======
>>>>>>> LogFront
    function handleChange(e: InputEvent) {
        return setCategorie(e.currentTarget.value)
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
<<<<<<< HEAD
<<<<<<< HEAD
        //AVERIGUAR COMO HACER POST Y COMO SON LOS MODELOS
=======

>>>>>>> front_roto
=======

>>>>>>> LogFront
        createCategory({ variables: { name: categorie } })
            .then((resolve) => { console.log(resolve) })
            .catch((err) => { console.log('Salio Mal') })
        if (data) {
<<<<<<< HEAD
<<<<<<< HEAD
            newCategory = data?.createCategory.name
=======
            newCategory = data?.createCategory
>>>>>>> front_roto
=======
            newCategory = data?.createCategory
>>>>>>> LogFront
            setListCategory([...listCategory, newCategory])
        }
    }

    console.log(data)

    return (
        <div className={styles.container}>
<<<<<<< HEAD
<<<<<<< HEAD
            {/*         {error ? alert(`Oh no! ${error.message}`) : null}
        {data && data.createNewProduct ? alert(`Saved!`) : null} */}
            <form onSubmit={handleSubmit} className={styles.form} >
                <h1>Crear Categoría</h1>
                <hr />
                <label>Nombre de la cateogía</label>
                <input type='text' name='categorie' value={categorie} onChange={handleChange} />
                <input type='submit' className={styles.button} value='Crear' />
            </form>
            <div className={styles.separateList}>
                <div className={styles.listProducts}>
                    <h4 className={styles.TitleList} >Categorias creadas</h4>
                    <hr className={styles.hrList} />
                    {listCategory.map((item) => (
                        <p className={styles.pList} >{item}</p>
                    ))}
                </div>
=======
=======
>>>>>>> LogFront
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

<<<<<<< HEAD
>>>>>>> front_roto
=======
>>>>>>> LogFront
            </div>
        </div>
    )
}