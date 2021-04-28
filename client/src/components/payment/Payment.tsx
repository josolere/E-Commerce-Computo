import React, { Fragment, useState } from 'react';
import './Payment.scss';

interface PropsDetails {
    history: {
        location: {
            state: {
                image: string,
                price: number
            }
        }
    }
}


interface Datacard {
    Name: string,
    Number: string,
    Month: string,
    Year: string,
    CCV: string
}



const Payment = (props: PropsDetails): JSX.Element => {
    const [datacard, setDatacard] = useState<Datacard>({
        Name: '',
        Number: '',
        Month: '',
        Year: '',
        CCV: ''
    })

    let regexname = /^[a-zA-Z\s]*$/

    let regexnumber = /^[0-9\s]*$/

    const Onchangecard = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatacard({
            ...datacard,
            [event.target.name]: event.target.value
        })

    }

    const Onbuybutton = () => {
        if (parseInt(datacard.Month) > 12 || parseInt(datacard.Month) < 1) {
            alert('Mes incorrecto')
        }
        else if (parseInt(datacard.Year) > 30 || parseInt(datacard.Year) < 21) {
            alert('Año Incorrecto')
        }
        else if (!datacard.Name.match(regexname)) {
            alert('Nombre Incorrecto')
        }
        else if (!datacard.Number.match(regexnumber)) {
            alert('Numero de tarjeta Incorrecto')
        }
        else {
            alert('Gracias por su compra')
        }
    }



    console.log(datacard.Name)

    return (
        <Fragment>
            <div>
                <div className="row">
                    <div className="small-5 small-offset-1 columns ">
                        <div className="callout credit">
                            <div className="row">
                                <div className="small-6 columns">
                                    <h1 className="credit__bank">Su Banco</h1>
                                </div>
                                <div className="small-6 columns">
                                    <img className="credit__mc" src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_master_card-512.png" alt="" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <p className="credit__card-number">{datacard.Number}</p>
                                    <span className="credit__ccv">{datacard.CCV}</span>
                                </div>
                                <div className="small-9 columns">
                                    <label>Nombre del Usuario:
                                    <span className="credit__name">{datacard.Name}</span>
                                    </label>
                                </div>
                                <div className="small-3 columns">
                                    <label>Fecha de Vencimiento:
                                    <span className="credit__date">{datacard.Month} / {datacard.Year}</span>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="small-5 columns end">
                        <div className="callout margin-top50">
                            <label>Nombre:
                            <input
                                    name='Name'
                                    type='text'
                                    onChange={Onchangecard}
                                    placeholder='Nombre del usuario'
                                    maxLength={25}
                                    value={datacard.Name}
                                />
                            </label>
                            <label>Numero de tarjeta:
                             <input
                                    type='tel'
                                    name='Number'
                                    pattern='[0-9\s]{13,19}'
                                    placeholder='Numero de tarjeta'
                                    value={datacard.Number}
                                    onChange={Onchangecard}
                                    minLength={19}
                                    maxLength={19}
                                    required={true}
                                />
                            </label>
                            <div className="row">
                                <label className="column">Fecha de Vencimiento:</label>
                                <div className="small-4 columns">
                                    <input
                                        type="text"
                                        name='Month'
                                        placeholder='Mes'
                                        value={datacard.Month}
                                        onChange={Onchangecard}

                                        minLength={2}
                                        maxLength={2}
                                        required={true}
                                    />
                                </div>
                                <div className="small-4 columns end">
                                    <input
                                        type="text"
                                        name='Year'
                                        placeholder='Año'
                                        value={datacard.Year}
                                        minLength={2}
                                        maxLength={2}
                                        required={true}
                                        onChange={Onchangecard} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-4 column">
                                    <label>CVC:
                                <input
                                            type="text"
                                            name='CCV'
                                            minLength={2}
                                            maxLength={3}
                                            placeholder='CVC'
                                            value={datacard.CCV}
                                            onChange={Onchangecard}
                                            required={true}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={Onbuybutton} >Comprar</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Payment