import React from 'react'
import styleCheckout from './FormCheckout.module.scss'

const FormCheckout = () => {

    const handleSubmit = () => {

    }
    return (
        <>
            <div className={styleCheckout.contenedorForm}>
                <form
                    onSubmit={handleSubmit}
                // className={styleCheckout.form}
                >
                    <label htmlFor="provincia">Datos de facturacion</label>

                    <div className={styleCheckout.containerName}>
                        {/* <label htmlFor="nombre">Nombre</label> */}
                        <input
                            type="text"
                            placeholder='Nombre'
                            id='nombre'
                            name='nombre'
                            className={styleCheckout.inputName}
                        />
                        {/* <label htmlFor="apellidos">Apellidos</label> */}
                        <input
                            type="text"
                            placeholder='Apellidos'
                            id='apellidos'
                            name='apellidos'
                            className={styleCheckout.inputName}
                        />

                    </div>

                    {/* <label htmlFor="email">Email</label> */}
                    <input
                        type="email"
                        placeholder='Email'
                        id='email'
                        name='email'
                    />
                    {/* <label htmlFor="Celular">Celular</label> */}
                    <input
                        type="text"
                        id='Celular'
                        placeholder='Celular'
                        name='celular'
                    />
                    {/* <label htmlFor="direccion">Direccion</label> */}
                    <input
                        type="text"
                        placeholder='Direccion'
                        id='direccion'
                        name='direccion'
                    />
                    {/* <label htmlFor="">Fecha de entrega</label>
                    <input
                        type="date"
                        id="start"
                        name="trip-start"
                        value="2018-07-22"
                        min="2018-01-01"
                        max="2018-12-31"
                    /> */}
                    {/* <label htmlFor="provincia">Provincia</label> */}
                    <input
                        type="select"
                        placeholder='Provincia'
                        id='provincia'
                        name='provincia'
                    />
                    <div className={styleCheckout.containerName}>
                        {/* <label htmlFor="Ciudad">Ciudad</label> */}
                        <input
                            type="select"
                            placeholder='Ciudad'
                            id='Ciudad'
                            name='ciudad'
                        />
                        {/* <label htmlFor="postal">Codigo postal</label> */}
                        <input
                            type="text"
                            placeholder='Codigo postal'
                            id='postal'
                            name='postal'
                        />
                    </div>

                    {/* <label htmlFor=""></label>
                    <input type="text" /> */}
                </form>
            </div>
        </>
    )
}

export default FormCheckout
