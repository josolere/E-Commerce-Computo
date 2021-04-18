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


type FormEvent = React.FormEvent<HTMLFormElement>
type InputEvent = React.FormEvent<HTMLInputElement>

export default function CreateProduct() {
    
    const [categorie, setCategorie] = useState("")
    /*     const [createNewCategory, { error, data }] = useMutation<
        {createNewProduct: categoryInventary},
        {category:newCategoryDetails}
        >(NEW_CATEGORY,{variables:{category:{name:categorie}}}) */

    const [createCategory, {data}] = useMutation(NEW_CATEGORY)

    function handleChange(e: InputEvent) {
        return setCategorie(e.currentTarget.value)
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        //AVERIGUAR COMO HACER POST Y COMO SON LOS MODELOS
        createCategory({ variables: {  name: categorie } } )
            .then((resolve) => { console.log(resolve) })
            .catch((err) => { console.log('Salio Mal') })
    }



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
        </div>
    )
}