  
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import styles from './loguin.module.scss';
import { LOGIN_MUTATION, SIGNUP_MUTATION, ACTUAL_USER } from "../../gql/login";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify"
import { faEnvelopeSquare, faUnlock, faFileSignature, faMapMarker, faShareAlt, faAt,
    faMapMarkedAlt, 
    faCity,
    faEnvelope,
    faPhoneSquare} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux'
import { logeo } from '../../redux/actions'
import { NEW_ORDER, NEW_ORDER_DETAIL, GET_ORDER } from "../../gql/shopingCart"
import {GET_ORDER_BY_StATUS } from "../../gql/orders"



const Login = () => {

    const [createOrder] = useMutation(NEW_ORDER)

    const [idUser, setIdUser] = useState("")
    const [orderCount, setOrderCount] = useState([])
    const [log, setLog] = useState(false)

    const firsstRender = useRef(true)

    const { data } = useQuery(GET_ORDER, {
        variables: { idUser: idUser }
    });

    const [createOrderDetail] = useMutation(NEW_ORDER_DETAIL,{
        refetchQueries:[{query:GET_ORDER_BY_StATUS,variables:{ status: "pendiente", idUser: idUser}}]
    })
    //--

    useEffect(() => {
        if (data) {
            setOrderCount(data.getOrdersByIdUser)
        }
    }, [data])

    const dispatch = useDispatch()


    const [logform, setLogform] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        username: '',
        address: '',
        state:'',
        city:'',
        ZIPcode:'',
        phone:'',
        street:''
    });


    const [showlogin, setshowLogin] = useState(false)

    const [login, logindata] = useMutation(LOGIN_MUTATION)

    const [signup, signupdata] = useMutation(SIGNUP_MUTATION)

    const [createOrders, setCreateOrders] = useState(false)

    const handleclickevent = () => {
        showlogin ? setshowLogin(false) : setshowLogin(true)
    }
    console.log(logform)

    const handleinputchange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogform({ ...logform, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        if (!showlogin) {
            login({ variables: { email: logform.email, password: logform.password } })
                .then((resolve) => {  
                    const visitante = resolve.data.login.user;
                    setIdUser(resolve.data.login.user.id)
                    setLog(true)
                    toast.success("Bienvenido " + visitante.name + ' ' +  '🥳');
                    setTimeout(function(){window.location.href = 'http://localhost:3000/Home';}, 2000) })
                .catch((error) => { toast.error('Tu no eres de aquí 🤔')})
                ;
        }
        else {
            signup({
                variables: {
                    firstName: logform.firstname, email: logform.email, password: logform.password, 
                    lastName: logform.lastname, username: logform.username,  street: logform.street,
                    city: logform.city, zip: logform.ZIPcode, state: logform.state, phone: logform.phone
                }
            })
                .then((resolve) => { 
                    setLog(true)
                    console.log(resolve?.data?.signup?.user?.id)
                    setIdUser(resolve?.data?.signup?.user?.id)
                    toast.success("Te has registrado correctamente"); 
                setTimeout(function(){window.location.href = 'http://localhost:3000/Home';}, 2000) })
                .catch((error) => { toast.error('Error al registrarse 🤔') })
                ;
        }
        event.preventDefault()
    }

    useEffect(() => {
        if (firsstRender.current) {
            firsstRender.current = false;
        } else {
            if (log === true && data) {
                const newArray: any = orderCount.filter((filt: any) => filt.status === 'pendiente')
                console.log(newArray.length)
                if (newArray.length === 0) {
                    createOrder({ variables: { status: "pendiente", idUser: idUser } })
                        .then((resolve) => {
                            console.log('resolve')
                            const resolveIdOrder = resolve.data.createOrder.id
                            if (localStorage.getItem('productsLocal')) {
                                let productLocal: any = []
                                productLocal = (localStorage.getItem('productsLocal'))
                                productLocal = (JSON.parse(productLocal))
                                setCreateOrders(true)
                                productLocal.map((mapeo: any) => {
                                    createOrderDetail({ variables: { idOrder: resolveIdOrder, idProduct: mapeo.id, quantity: mapeo.count } })
                                        .then((resolve) => {
                                            console.log(resolve)
                                        })
                                        .catch((error) => {
                                            console.log('no responde')
                                        })
                                })
                            }
                        })
                        .catch((error) => {
                            console.log('no responde')
                        })
                } else {
                    console.log('entra else')
                    if (localStorage.getItem('productsLocal')) {
                        console.log('entra')
                        const newArrayUSer: any = orderCount.filter((filt: any) => filt.status === 'pendiente')
                        if (newArrayUSer.length > 0) {
                            console.log('idOrder')
                            let idOrder = (newArrayUSer[0].id)
                            let productLocals: any = []
                            productLocals = (localStorage.getItem('productsLocal'))
                            productLocals = (JSON.parse(productLocals))
                            productLocals.map((mapeo: any) => {
                                createOrderDetail({ variables: { idOrder: idOrder, idProduct: mapeo.id, quantity: mapeo.count } })
                                    .then((resolve) => {
                                        console.log(resolve)
                                    })
                                    .catch((error) => {
                                        console.log('no responde')
                                    })
                            })
                        }
                    }
                }
            }
        }

    }, [orderCount])

    const handleResetPassword = () => {
        window.location.href = 'http://localhost:3000/ResetContraseña'
    }

    const responseFacebook = (res: any) => {
        console.log(res)
    }

    const componentClicked = () => {
        window.location.href = 'http://localhost:5000/auth/facebook'
    }

    const responseGoogle = () => {
        window.location.href = 'http://localhost:5000/auth/google';
    }

    return (
        <div>
            <div className={styles.back}>
                {!showlogin ? <div className={styles.organizar}>
                    <div className={styles.caja}>
                        <div className={styles.container}>
                            Introduce
                            <div className={styles.flip}>
                                <div><div>tus</div></div>
                                <div><div>datos</div></div>
                                <div><div>para</div></div>
                            </div>
                            loguearte
                            </div>
                        <form className={styles.form} onSubmit={handlesubmitchange}>
                            <div className={styles.form__group}>
                                <label htmlFor='email' className={styles.form__label} >
                                    <FontAwesomeIcon icon={faAt} aria-hidden={true} /> E-Mail</label>
                                <input
                                    className={styles.form__field}
                                    placeholder='E-mail'
                                    minLength={10}
                                    maxLength={30}
                                    type='email'
                                    name='email'
                                    onChange={handleinputchange}
                                    required={true}
                                />
                            </div>
                            <div className={styles.form__group}>
                                <label htmlFor='password' className={styles.form__label} >
                                    <FontAwesomeIcon icon={faUnlock} aria-hidden={true} /> Contraseña</label>
                                <input
                                    className={styles.form__field}
                                    type='password'
                                    minLength={4}
                                    maxLength={15}
                                    placeholder='Contraseña'
                                    name='password'
                                    onChange={handleinputchange}
                                    required={true}
                                />
                            </div>
                            <div className={styles.organizarbotones}>
                                <button style={{ paddingTop: "1rem" }} className={styles.boton} type='submit' >Login</button>
                                <button className={styles.boton} onClick={handleclickevent} >No tienes cuenta?</button>
                            </div>
                            <div className={styles.organizarbotones}>
                                    <GoogleLogin className={styles.buttonGoogle}
                                        clientId="700487855245-ffig42s6ln7oao3itcpcg18g0mi8de8u.apps.googleusercontent.com"
                                        theme= 'dark'
                                        onSuccess={responseGoogle}
                                    />
                                </div>
                            <div className={styles.organizarbotones}>
                                <button className={styles.boton} onClick={handleResetPassword} >Olvidaste tu contraseña?</button>
                            </div>
                        </form>
                    </div>
                </div>
                    :
                    <div className={styles.organizar}>
                        <div className={styles.caja}>
                            <div className={styles.container}>
                                Introduce
                            <div className={styles.flip}>
                                    <div><div>tus</div></div>
                                    <div><div>datos</div></div>
                                    <div><div>para</div></div>
                                </div>
                            registrarte
                            </div>
                            <form className={styles.form} onSubmit={handlesubmitchange}>
                                <div className={styles.form__group}>
                                    <label htmlFor='email' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faAt} aria-hidden={true} /> E-Mail</label>
                                    <input
                                        className={styles.form__field}
                                        type='email'
                                        minLength={10}
                                        maxLength={30}
                                        placeholder='E-Mail'
                                        name='email'
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='password' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faUnlock} aria-hidden={true} /> Contraseña</label>
                                    <input
                                        className={styles.form__field}
                                        type='password'
                                        minLength={4}
                                        maxLength={15}
                                        placeholder='Contraseña'
                                        name='password'
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='name' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faFileSignature} aria-hidden={true} /> Nombre</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={3}
                                        maxLength={20}
                                        placeholder='Nombre'
                                        name='firstname'
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='lastname' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faFileSignature} aria-hidden={true} /> Apellido</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={2}
                                        maxLength={20}
                                        placeholder='Apellido'
                                        name='lastname'
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='address' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faMapMarkedAlt} aria-hidden={true} /> Provincia</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={5}
                                        maxLength={30}
                                        placeholder='Provincia'
                                        name='state'
                                        onChange={handleinputchange}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='address' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faCity} aria-hidden={true} /> Localidad</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={5}
                                        maxLength={30}
                                        placeholder='Localidad'
                                        name='city'
                                        onChange={handleinputchange}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='address' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faEnvelope} aria-hidden={true} /> Código Postal</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={4}
                                        maxLength={5}
                                        placeholder='Código Postal'
                                        name='ZIPcode'
                                        onChange={handleinputchange}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='address' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faMapMarker} aria-hidden={true} /> Dirección</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={5}
                                        maxLength={30}
                                        placeholder='Dirección'
                                        name='street'
                                        onChange={handleinputchange}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='address' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faPhoneSquare} aria-hidden={true} /> Telefono</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={5}
                                        maxLength={30}
                                        placeholder='Telefono'
                                        name='phone'
                                        onChange={handleinputchange}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='username' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faShareAlt} aria-hidden={true} /> Nombre de Usuario</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={4}
                                        maxLength={15}
                                        placeholder='Nombre de Usuario'
                                        name='username'
                                        onChange={handleinputchange}
                                    />
                                </div>
                                <div className={styles.organizarbotones}>
                                    <button style={{ paddingTop: "1rem" }} className={styles.boton} type='submit' >Crea tu cuenta</button>
                                    <button className={styles.boton} onClick={handleclickevent}>Ya tienes una  cuenta?</button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Login;