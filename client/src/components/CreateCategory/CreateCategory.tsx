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
import React, { useState, useEffect } from 'react'
import styles from './CreateCategory.module.scss'
import { NEW_CATEGORY } from "../../gql/categories"
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORIES } from "../../gql/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faCommentAlt, faImage, faMoneyBill, faCopyright, faFileSignature } from '@fortawesome/free-solid-svg-icons';


interface Categorie {
    id: number | undefined,
    name: string | undefined,
}

interface Categories {
    getCategory: Categorie[]
}
>>>>>>> front_roto

type FormEvent = React.FormEvent<HTMLFormElement>
type InputEvent = React.FormEvent<HTMLInputElement>

<<<<<<< HEAD
export default function CreateProduct() {

    const [categorie, setCategorie] = useState("")
    /*     const [createNewCategory, { error, data }] = useMutation<
        {createNewProduct: categoryInventary},
        {category:newCategoryDetails}
        >(NEW_CATEGORY,{variables:{category:{name:categorie}}}) */
=======
export default function CreateProduct():JSX.Element {

    const results = useQuery<Categories>(GET_CATEGORIES)

    const categories = results?.data?.getCategory

    const [cat, setCat] = useState<any>()

    const [categorie, setCategorie] = useState("")

    const [showCreate, setShowCreate] = useState(false)

>>>>>>> front_roto

    const [createCategory, { data }] = useMutation(NEW_CATEGORY)

    const [listCategory, setListCategory] = useState<Array<any>>([])

    let newCategory = ''

<<<<<<< HEAD
=======
    useEffect(() => {
        setCat(categories)

    }, [categories])

>>>>>>> front_roto
    function handleChange(e: InputEvent) {
        return setCategorie(e.currentTarget.value)
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
<<<<<<< HEAD
        //AVERIGUAR COMO HACER POST Y COMO SON LOS MODELOS
=======

>>>>>>> front_roto
        createCategory({ variables: { name: categorie } })
            .then((resolve) => { console.log(resolve) })
            .catch((err) => { console.log('Salio Mal') })
        if (data) {
<<<<<<< HEAD
            newCategory = data?.createCategory.name
=======
            newCategory = data?.createCategory
>>>>>>> front_roto
            setListCategory([...listCategory, newCategory])
        }
    }

    console.log(data)

    return (
        <div className={styles.container}>
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

>>>>>>> front_roto
            </div>
        </div>
    )
}