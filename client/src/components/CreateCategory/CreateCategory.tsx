import React, { useState, useEffect } from 'react'
import styles from './CreateCategory.module.scss'
import { NEW_CATEGORY } from "../../gql/categories"
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORIES } from "../../gql/categories";


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

interface Categorie {
    id: number | undefined,
    name: string | undefined,
}

interface Categories {
    getCategory: Categorie[]
}

type FormEvent = React.FormEvent<HTMLFormElement>
type InputEvent = React.FormEvent<HTMLInputElement>

export default function CreateProduct() {

    const results = useQuery<Categories>(GET_CATEGORIES)

    const categories = results?.data?.getCategory

    const [cat, setCat] = useState<any>()

    const [categorie, setCategorie] = useState("")

    const [showCreate, setShowCreate] = useState(false)
    /*     const [createNewCategory, { error, data }] = useMutation<
        {createNewProduct: categoryInventary},
        {category:newCategoryDetails}
        >(NEW_CATEGORY,{variables:{category:{name:categorie}}}) */

    const [createCategory, { data }] = useMutation(NEW_CATEGORY)

    const [listCategory, setListCategory] = useState<Array<any>>([])

    let newCategory = ''

    useEffect(() => {
        setCat(categories)
        /*         setListCategory([...listCategory, newCategory])
         */
    }, [categories])

    function handleChange(e: InputEvent) {
        return setCategorie(e.currentTarget.value)
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        //AVERIGUAR COMO HACER POST Y COMO SON LOS MODELOS
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
                    {cat && cat.map((item: any, index: number) => (
                        <p className={styles.pList}>{item?.id}: {item?.name}</p>
                    ))}
                    {listCategory && listCategory.map((item: any, index: number) => (
                        <p className={styles.pList} >{item?.id}: {item.name}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}