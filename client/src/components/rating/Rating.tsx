import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'
import './rating.css'


const StarRating = () => {

    let [rating, setRating] = useState<Array<any>>([])
    const [hover, setHover] = useState(0)

    let totalrating: number = 0
    let summulti: Array<number> = [];
    let sumlength:Array<number> = [];
    let count = 1;
    if (rating.length > 0) {
        while (count <= 5) {
            summulti.push(count * rating.filter(item => item === count).length);
            sumlength.push(rating.filter(item => item === count).length);
            count++;
        }
        totalrating = summulti.reduce((a,b) => a + b) / sumlength.reduce((a,b) => a + b)
        totalrating = parseFloat(totalrating.toFixed(2))
    }

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const ratingvalue = index + 1;
                return <label>
                    <input type='radio'
                        name='Rating'
                        value={ratingvalue}
                        onClick={function pushrating() {
                            setRating([...rating, ratingvalue])
                        }}
                    />
                    <FaStar size={30}
                        className='star'
                        color={ratingvalue <= hover ? '#ffc107' : '#e4e5e9'}
                        onMouseEnter={() => setHover(ratingvalue)}
                        onMouseLeave={() => setHover(0)}
                    />
                </label>
            })}
            <p>The rating value is {totalrating}</p>
        </div>
    )
}

export default StarRating