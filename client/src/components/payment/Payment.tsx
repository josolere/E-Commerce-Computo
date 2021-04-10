import React, { Fragment, useState } from 'react';
import './Payment.scss'

interface PropsDetails {
    history: {
        location: {
            state: {
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

    const Onchangecard = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatacard({
            ...datacard,
            [event.target.name]: event.target.value
        })
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
                                    <h1 className="credit__bank">Your Bank</h1>
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
                                    <label>Card Holder
                                    <span className="credit__name">{datacard.Name}</span>
                                    </label>
                                </div>
                                <div className="small-3 columns">
                                    <label>Expires
                                    <span className="credit__date">{datacard.Month} / {datacard.Year}</span>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="small-5 columns end">
                        <div className="callout margin-top50">
                            <label>Name
                            <input
                                    name='Name'
                                    type='text'
                                    onChange={Onchangecard}
                                    placeholder='Name'
                                    value={datacard.Name}
                                />
                            </label>
                            <label>Number
                             <input
                                    type="text"
                                    name='Number'
                                    placeholder='Number Card'
                                    value={datacard.Number}
                                    onChange={Onchangecard}
                                />
                            </label>
                            <div className="row">
                                <label className="column">Expiration Date</label>
                                <div className="small-4 columns">
                                    <input
                                        type="text"
                                        name='Month'
                                        placeholder='Month'
                                        value={datacard.Month}
                                        onChange={Onchangecard} />
                                </div>
                                <div className="small-4 columns end">
                                    <input
                                        type="text"
                                        name='Year'
                                        placeholder='Year'
                                        value={datacard.Year}
                                        onChange={Onchangecard} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-4 column">
                                    <label>CCV
                                <input
                                            type="text"
                                            name='CCV'
                                            placeholder='CCV'
                                            value={datacard.CCV}
                                            onChange={Onchangecard} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Payment