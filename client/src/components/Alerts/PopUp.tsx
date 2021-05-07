

interface DetailsProduct {
    getProductById: {
        id: number
        brand: string
        image: string
        name: string
        price: number
        details: string
        categories: any[]
        reviews: any[]
    }
}

const PopUp = () => {

    /* let id = 19

    const { data } = useQuery<DetailsProduct>(GET, {
        variables: { id }
    });

    let productPopUp = data?.getProductById

    return (
        <div className={styles.OrderPop} >
            <div className={styles.box} >
                <div className={styles.content} >
                    <h1 className={styles.PopTitle} >Producto en oferta </h1>
                    <h1 className={styles.PPop} >{productPopUp?.name}</h1>
                </div>
            </div>
            <div className={styles.box2} >
                <div className={styles.content2}>
                    <img className={styles.South1} src={South} alt='' />
                    <Link className={styles.ImagePopL} to={{
                        pathname: '/Detalles',
                        state: {
                            id: id,
                        }
                    }}>
                        <img className={styles.ImagePop} src={productPopUp?.image} alt='' />
                    </Link>
                    <img className={styles.South2} src={South} alt='' />

                </div>
            </div>
        </div>
    ) */
}

export default PopUp
