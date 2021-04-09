import React, { useState } from 'react'
import styles from './CreateCategorie.module.scss'

type FormEvent = React.FormEvent<HTMLFormElement> 
type InputEvent = React.FormEvent<HTMLInputElement>

export default function CreateProduct(){
    const [categorie , setCategorie] = useState("")

   function handleChange(e:InputEvent){
    return setCategorie(e.currentTarget.value)
   }

   function handleSubmit(e:FormEvent){
    e.preventDefault()
    //AVERIGUAR COMO HACER POST Y COMO SON LOS MODELOS
    // createNewProduct(state)
   }

    return(
        <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form} >
            <label>Categorie Name</label>
            <input type='text' name='categorie' value={categorie} onChange={handleChange}/>
            <input type='submit' value='CREATE'/>
        </form>
        </div>
    )
}