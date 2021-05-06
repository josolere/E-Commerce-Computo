import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ACTUAL_USER } from '../../gql/loginGql'
import { WISHLIST } from '../../gql/wishlist'
import styles from './Featured.module.scss'
import { AiFillStar, AiFillAccountBook } from 'react-icons/ai'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCommentAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
export default function Featured() {

    const currentUser = useQuery(ACTUAL_USER)
    const user = currentUser?.data?.currentUser
    const [count, setCount] = useState(0)
    const [top, setTop] = useState(1)
    const wishes = useQuery(WISHLIST, { variables: { userId: user?.id } })
    const featured = wishes?.data?.getWishList
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    const lessCount = () => {
        if (count > 0 && top > 1) {
            setCount(count - 1)
            setTop(top - 1)
        }
        else {
            setCount(0)
            setTop(1)
        }
    }

    const addCount = () => {
        if (count === featured.length - 1 && top === featured.length) {
            setCount(count)
            setTop(top)
        }
        else {
            setCount(count + 1)
            setTop(top + 1)
        }
    }

    console.log("A", count)
    console.log("B", top)

    if (featured?.length > 5 && width < 648) {

        return (
            <div className={styles.containerRes}>
                <div className={styles.containerTitleRes} >
                    <h6 className={styles.titleRes} ><AiFillStar style={{ color: '#ffc107' }} /> DESTACADOS <AiFillStar style={{ color: '#ffc107' }} /></h6>
                </div>
                <div className={styles.containerImgsRes}>
                    <button className={styles.ButtonsCarroL} onClick={lessCount} > <FontAwesomeIcon icon={faArrowLeft} /></button>
                    {featured?.length > 5 && featured?.slice(count, top).map((product: any) =>
                        <Link to={{
                            pathname: '/Detalles',
                            state: {
                                id: product.id,
                                newprice: 0
                            }
                        }}>
                            <img className={styles.imageCarroRes} src={product.image} />
                        </Link>
                    )}
                    <button className={styles.ButtonsCarroR} onClick={addCount} > <FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
            </div>
        )
    } else if (featured?.length > 5 && width > 648) {
        return (
            <div className={styles.container}>
                <div className={styles.containerTitle} >
                    <h6 className={styles.title} ><AiFillStar style={{ color: '#ffc107' }} /> DESTACADOS <AiFillStar style={{ color: '#ffc107' }} /></h6>
                </div>
                <div className={styles.containerImgs}>

                    {featured?.length > 5 && featured?.slice(0, 5).map((product: any) =>
                        <Link to={{
                            pathname: '/Detalles',
                            state: {
                                id: product.id,
                                newprice: 0
                            }
                        }}>
                            <img className={styles.imageCarro} src={product.image} />
                        </Link>
                    )}
                    <div className={styles.sortButton} >
                        <Link to='/wishlist' >
                            <button 
                            className={styles.ButtonsCarro} >Ver<FontAwesomeIcon icon={faPlus} style={{ marginLeft: '5%' }} /> </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    } else return (<></>)
}