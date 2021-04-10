import React, { Fragment, useState } from 'react';
import './Payment.css'

interface PropsDetails {
    history: {
        location: {
            state: {
                price: number
            }
        }
    }
}

const Payment = (props: PropsDetails): JSX.Element => {
    const [datacard, setDatacard] = useState<Array<any>> ([{
        name: 'xxxxx xxx',
        number: '0000000000000000',
        month: 'xx',
        day: 'xx',
        ccv: 'CCV'
    }])

    //Name of Card Owner
    const nameChange = (n) => {
        setDatacard([{
            ...datacard,
            name: n.target.value
        }]);
    }
    //Card Number
    const numberChange = (c) => {
        setDatacard([{
            ...datacard,
            number: c.target.value
        }]);
    }
    //Expiration
    const monthChange = (m) => {
        setDatacard([{
            ...datacard,
            month: m.target.value
        }]);
    }
    const dayChange = (d) => {
        setDatacard([{
            ...datacard,
            day: d.target.value
        }]);
    }
    //CCV 
    const ccvChange = (v) => {
        setDatacard([{
            ...datacard,
            ccv: v.target.value
        }]);
    }

    return (
        <div>
            <div className="row">
                <div className="small-5 small-offset-1 columns ">
                    <div className="callout credit">
                        <div className="row">
                            <div className="small-6 columns">
                                <h1 className="credit__bank">My Bank</h1>
                            </div>
                            <div className="small-6 columns">
                                <img className="credit__mc" src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_master_card-512.png" alt="" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <p className="credit__card-number">{datacard}</p>
                                <span className="credit__ccv">{datacard}</span>
                            </div>
                            <div className="small-9 columns">
                                <label>Card Holder
                  <p className="credit__name">{datacard}</p>
                                </label>
                            </div>
                            <div className="small-3 columns">
                                <label>Expires
                  <p className="credit__date">{datacard} / {datacard}</p>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="small-5 columns end">
                    <div className="callout margin-top50">
                        <label>NAME
              <input type="text" onChange={() => nameChange} />
                        </label>
                        <label>NUMBER
              <input type="text" onChange={() => numberChange} />
                        </label>
                        <div className="row">
                            <label className="column">EXPIRATION DATE</label>
                            <div className="small-4 columns">
                                <input type="text" onChange={() => monthChange} />
                            </div>
                            <div className="small-4 columns end">
                                <input type="text" onChange={() => dayChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="small-4 column">
                                <label>CCV
                  <input type="text" onChange={() => ccvChange} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

