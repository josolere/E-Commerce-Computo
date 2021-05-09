import React from 'react';
import './LandPage.css';
import { useQuery, gql } from '@apollo/client';
import styles from './LandPage.module.scss'


interface DetailsProduct {
    id: number,
    brand: string,
    image: string,
    name: string,
    price: number,
    details: string,
}

interface DetailsData {
    getProducts: DetailsProduct[]
}

const GET = gql`
query ($name: String!, $categoriesId:[ID!]){
    getProducts (filter:{limit:20 name:$name categoriesId:$categoriesId}) {
        id
        name
        price
        image
    }
}`;

const LandPage = () => {

    const nameoftheday = (fecha: any) => [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sabado',
    ][new Date(fecha).getDay()];

    const current = new Date();

    const { loading, error, data } = useQuery<DetailsData>(GET, { variables: { name: '', categoriesId: [] } })


    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


    let dayoftheweek = (nameoftheday(current))

    let imagesoftheweek: Array<number> = [0, 0, 0, 0, 0, 0, 0]

    let discountoftheweek: Array<any> = ['10%', '20%', '25%', '20%', '35%', '20%', '15%']

    let discount: string = '0%'

    if (dayoftheweek === 'Lunes') {
        imagesoftheweek = [11, 9, 8, 12, 5]
        discount = discountoftheweek[0]
    }
    else if (dayoftheweek === 'Martes') {
        imagesoftheweek = [2, 11, 6, 7, 9]
        discount = discountoftheweek[1]
    }
    else if (dayoftheweek === 'Miercoles') {
        imagesoftheweek = [10, 3, 4, 7, 9]
        discount = discountoftheweek[2]
    }
    else if (dayoftheweek === 'Jueves') {
        imagesoftheweek = [3, 2, 4, 7, 1]
        discount = discountoftheweek[3]
    }
    else if (dayoftheweek === 'Viernes') {
        imagesoftheweek = [10, 8, 10, 11, 13]
        discount = discountoftheweek[4]
    }
    else if (dayoftheweek === 'Sabado') {
        imagesoftheweek = [1, 3, 4, 2, 9]
        discount = discountoftheweek[5]
    }
    else if (dayoftheweek === 'Domingo') {
        imagesoftheweek = [2, 3, 4, 7, 5]
        discount = discountoftheweek[6]
    }

    const products = data?.getProducts

    let image1: string = "";
    let image2: string = "";
    let image3: string = "";
    let image4: string = "";
    let image5: string = "";
    let image6: string = "";


    if (products) {
        image1 = products[imagesoftheweek[0]].image
        image2 = products[imagesoftheweek[1]].image
        image3 = products[imagesoftheweek[2]].image
        image4 = products[imagesoftheweek[3]].image
        image5 = products[imagesoftheweek[4]].image
        /*         image6 = products[imagesoftheweek[5]].image
         */
    }

    const linkland = () => {
        window.location.href = 'http://compuhenry.hopto.org:5001/Home'
    }

    return (
        <React.Fragment>
            {/*             <ReactPlayer 
                id='bg-video'
                playing={true}
                width={1400}
                height={800}
                volume={0}
                loop={true}
                url='https://www.youtube.com/watch?v=ky_By2ehgks'  
                /> */}
            <div className={styles.BackLand} >
                <div className="containerLand">
                    <div className='ControlLand'>
                        <div className={styles.wrapper}>
                            <div className={styles.container}>
                                <h1 className={styles.t1} >CompuHenry</h1>
                            </div>
                        </div>
                        {/*                         <p className={styles.DiscountLand}>Hoy {dayoftheweek} tenemos un descuento de {discount}!</p>
 */}                        <div className='pic-order'>
                            <div className="pic-ctn">
                                <img src={image1} alt="" className="pic" onClick={linkland} />
                                <img src={image2} alt="" className="pic" onClick={linkland} />
                                <img src={image3} alt="" className="pic" onClick={linkland} />
                                <img src={image4} alt="" className="pic" onClick={linkland} />
                                <img src={image5} alt="" className="pic" onClick={linkland} />
                            </div>
                        </div>
                    </div>
                    {/*                     <div className={styles.OrderSub}>
                        <h1 className={styles.TitleConcat} >Contacta con nosotros</h1>
                    </div>
                    <div className={styles.LandPageInfo}>
                        <p>  Dirección: Avenida Cabildo 3456</p>
                        <p>  Telefono de contacto: 4567-3456</p>
                        <p>  WhatsApp: +54 9 1134553321</p>
                        <p>  E-mail: CompuHenry@yahoo.com</p>
                    </div> */}
                </div>
            </div>
        </React.Fragment>
    )
}

export default LandPage;