import React, { useState } from 'react'
import styles from './CreateCategory.module.scss'
import { gql, useMutation } from '@apollo/client';
import { NEW_CATEGORY } from "../../gql/categories"



type FormEvent = React.FormEvent<HTMLFormElement>
type InputEvent = React.FormEvent<HTMLInputElement>

export default function CreateProduct() {
    
    const [categorie, setCategorie] = useState("")
    

    const [createCategory, {data}] = useMutation(NEW_CATEGORY)

    function handleChange(e: InputEvent) {
        return setCategorie(e.currentTarget.value)
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
       
        createCategory({ variables: {  name: categorie } } )
            .then((resolve) => { console.log(resolve) })
            .catch((err) => { console.log('Salio Mal') })
    }



    return (
        <div className={styles.container}>
         
            <form onSubmit={handleSubmit} className={styles.form} >
                <h1>Create Categorie</h1>
                <hr />
                <label>Categorie Name</label>
                <input type='text' name='categorie' value={categorie} onChange={handleChange} />
                <input type='submit' className={styles.button} value='CREATE' />
            </form>
        </div>
    )
}