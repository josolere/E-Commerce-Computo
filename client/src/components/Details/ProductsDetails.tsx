import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './rating.css';
import { REVIEW_MUTATION, EDIT_PRODUCT, GET, GET_CATEGORIES } from "../../gql/productDetailsGql";
import styles from "./ProductDetail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import stylesEdit from "./ProductEdit.module.scss";
import { addProductDetails, addShopping, local } from '../../redux/actions';
import { toast } from 'react-toastify';
import { ACTUAL_USER, GET_USERS } from "../../gql/loginGql";
import { HiBadgeCheck } from "react-icons/hi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FiHeart } from 'react-icons/fi';
import { AppState } from '../../redux/reducers';

interface user {
  currentUser: {
    name: string;
    password: string;
    email: string;
  };
}

interface Icategories {
  id?: number;
  name?: string;
}

interface DetailsProduct {
  getProductById: {
    id: number
    brand: string
    image: string
    name: string
    price: number
    details: string
    stock: number
    categories: any[]
    reviews: any[]
  }
}

interface Categories {
  getCategory: Icategories[];
}

interface PropsDetails {
  history: {
    location: {
      state: {
        id: number;
        newprice: number;
      };
    };
  };
}

const DetailsComponent = (props: PropsDetails): JSX.Element => {
  let user: any = {};

  const currentU = useQuery<user>(ACTUAL_USER);

  user = currentU?.data?.currentUser;

  const dispatch = useDispatch();

  const id = props.history?.location.state.id;

  const { data } = useQuery<DetailsProduct>(GET, {
    variables: { id },
  });

  const [controReview, setControlReview] = useState("");

  const [addreview, results] = useMutation(REVIEW_MUTATION);

  let [rating, setRating] = useState<Array<any>>([]);

  const [hover, setHover] = useState(0);

  const [reviewuser, setReviewuser] = useState({
    review: "",
    title: "",
  });

  const [hideRating, setHideRating] = useState(true);

  const [revActual, setReviewAct]: any = useState([]);

  const [hideReview, setHideReview] = useState(true);

  const filtred = data?.getProductById;

  let totalrating: number = 0;

  let summulti: Array<number> = [];

  let sumlength: Array<number> = [];

  let count = 1;

  var arr: any = [];
  if (rating.length > 0) {
    while (count <= 5) {
      summulti.push(count * rating.filter((item) => item === count).length);
      sumlength.push(rating.filter((item) => item === count).length);
      count++;
    }
    totalrating =
      summulti.reduce((a, b) => a + b) / sumlength.reduce((a, b) => a + b);
    totalrating = parseFloat(totalrating.toFixed(2));
  }
  const changereview = () => {
    setControlReview(user.id);
    addreview({
      variables: {
        id: filtred?.id,
        userId: user.id,
        rating: totalrating,
        text: reviewuser.review,
        title: reviewuser.title,
      },
    })
      .then((review) => setReviewAct([review.data.addReview]))
      .catch((err) =>
        toast.error("Solo puedes enviar una reseña por producto")
      );
    setHideReview(false);
  };

  const [details, setDetails] = useState({
    id: "",
    name: "",
    price: 0,
    brand: "",
    image: "",
    details: "",
    stock: 0,
    categories: [{ id: "1", name: "default" }],
  });

  useEffect(() => { }, [results]);

  useEffect(() => {
    setDetails({
      id: filtred?.id.toString() || "",
      name: filtred?.name || "",
      price: filtred?.price || 0,
      brand: filtred?.brand || "",
      image: filtred?.image || "",
      details: filtred?.details || "",
      categories: filtred?.categories || [{}],
      stock: filtred?.stock || 0
    });
  }, [filtred]);


  useEffect(() => {
    console.log(results?.data)
  }, [results])

  useEffect(() => {
    console.log(results.data)
    setDetails({ id: filtred?.id.toString() || "", name: filtred?.name || "", price: filtred?.price || 0, brand: filtred?.brand || "", image: filtred?.image || "", details: filtred?.details || "", stock: filtred?.stock || 0, categories: filtred?.categories || [{}] })
  }, [filtred])

  useEffect(() => {
    filtred?.reviews?.map(item => setControlReview(item?.name))
  }, [filtred])

  const [editMode, setEditMode] = useState(false);

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    details
      ? setDetails({
        ...details,
        [e.currentTarget.name]: e.currentTarget.value,
      })
      : console.log("no se puede");
  }

  function handlePrice(e: React.FormEvent<HTMLInputElement>) {
    details
      ? setDetails({
        ...details,
        price: +e.currentTarget.value,
      })
      : console.log("no se puede");
  }

  function handleDetails(e: React.ChangeEvent<HTMLTextAreaElement>) {
    details
      ? setDetails({
        ...details,
        details: e.currentTarget.value,
      })
      : console.log("no se puede");
  }

  const [editProduct, resultsEdit] = useMutation(EDIT_PRODUCT);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    editProduct({
      variables: {
        //WARNING CUIDADO CON ESTO
        ...details,
        categories: details?.categories?.map((cat) => cat.id), //esto puede llegar a romper estoy haciendo el edit mutation de las categorias
      },
    });
  }

  const handleCategory = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDetails({
      ...details,
      categories: details?.categories?.filter(
        (cat) => cat.id != e.currentTarget.value
      ),
    });
  };
  const handleAddCategories = (e: React.FormEvent<HTMLSelectElement>) => {
    details?.categories &&
      setDetails({
        ...details,
        categories: details?.categories?.find(
          (cat) => cat.name === e.currentTarget.selectedOptions[0].innerHTML
        )
          ? details.categories
          : [
            ...details?.categories,
            {
              name: e.currentTarget.selectedOptions[0].innerHTML,
              id: e.currentTarget.value,
            },
          ],
      });
  };

  const categoriesQ = useQuery<Categories>(GET_CATEGORIES);
  const categoriesQuery = categoriesQ.data?.getCategory;

  const [cant, setCant] = useState(1);

  var { quantity, priceSubTotal }: any = useSelector(
    (store: AppState) => store.shoppingCartReducer
  );

  if (quantity !== 0) {
    localStorage.setItem("quantity", JSON.stringify(quantity));
    localStorage.setItem("priceSubTotal", JSON.stringify(priceSubTotal));
  }

  const addLocaStorage = () => {
    const idProduct: {} = {
      id: id,
      price: details.price,
      count: cant,
      image: details.image,
      name: details.name,
    };

    if (localStorage.getItem("productsLocal")) {
      let productLocal: any = localStorage.getItem("productsLocal");
      productLocal = JSON.parse(productLocal);
      const valor: { count: number } = productLocal.find(
        (el: { id: number }) => el.id === id
      );
      let newLocal = [];
      if (valor) {
        valor.count = valor.count + 1;
        newLocal = productLocal
          .filter((filt: any) => filt.id !== id)
          .concat(valor);
      } else {
        newLocal = productLocal.filter((filt: any) => filt.id !== id);
        newLocal.push(idProduct);
      }
      localStorage.setItem("productsLocal", JSON.stringify(newLocal));
    } else {
      dispatch(local(idProduct));
    }
  };

  const handleAddProduct = () => {
    if (details) {
      const id = details.id;
      const price = details.price;
      const count = cant;
      dispatch(addShopping({ id, price, count }));
      addLocaStorage();
    }
  };

  console.log(filtred?.reviews)

  const [wishe, setWish] = useState(false)

  const handleFav = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setWish(!wishe)
    console.log(wishe)
    console.log('falta crear la wishlist en base de datos y conectar')
  }

  return (
    <React.Fragment>
      <div className={styles.contenedorAll}>
        <div className={styles.contenedorDetail}>
          <img src={filtred?.image} alt='' />
          <form onSubmit={handleSubmit} className={editMode ? stylesEdit.containerEdit : styles.formm} >
            <button onClick={handleFav} className={wishe ? styles.faving : styles.fav}><FiHeart size={20} /></button>
            {user?.privilege === 'admin' ? <button className={styles.Edit} onClick={handleEdit}>Edit</button> : false}

            {editMode ?
              <input className={stylesEdit.input} name='name' type='text' onChange={handleChange} defaultValue={details?.name} />
              :
              <h1 className={styles.nameDetail}>{filtred?.name}</h1>}
            {filtred?.stock ? <div className={styles.stock}><HiBadgeCheck size={20} /> Hay Stock </div> : <div style={{ color: 'red' }}><IoCloseCircleSharp color='red' /> No hay Stock </div>}
            <div className={stylesEdit.cats}>
              {editMode
                ? details?.categories?.map((category) => (
                  <button
                    className={stylesEdit.input}
                    onClick={handleCategory}
                    value={category.id}
                  >
                    Categoría: {category.name}
                  </button>
                ))
                : details?.categories?.map((category) => (
                  <p className={styles.PDetails}>
                    Categoría: {category.name}
                  </p>
                ))}
            </div>
            {editMode ? (
              <p>
                {" "}
                Marca:{" "}
                <input
                  className={stylesEdit.input}
                  name="brand"
                  defaultValue={details?.brand}
                  onChange={handleChange}
                />{" "}
              </p>
            ) : (
              <p> Marca: {filtred?.brand} </p>
            )}
            {editMode ? (
              <p>
                <textarea
                  onChange={handleDetails}
                  defaultValue={details?.details}
                />
              </p>
            ) : (
              <p className={styles.PDetails}>{filtred?.details}</p>
            )}

            <div className={styles.botonPrecio}>
              {editMode ? (
                <p className={styles.precioDetail}>
                  $
                  <input
                    className={stylesEdit.input}
                    onChange={handlePrice}
                    defaultValue={details?.price}
                  />
                </p>
              ) : (
                <p className={styles.precioDetail}>
                  ${new Intl.NumberFormat().format(filtred?.price || 0)}
                </p>
              )}
              <hr style={{ height: "1rem", backgroundColor: "white" }} />
              <button
                onClick={handleAddProduct}
                className={styles.buttonCompra}
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
            </div>
            <div className={stylesEdit.bot}>
              {editMode && (
                <select onChange={handleAddCategories}>
                  {categoriesQuery?.map((cat) => (
                    <option key={cat.name} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}{" "}
                  {/*onClick={handleCategories}*/}
                </select>
              )}

              {editMode && (
                <input
                  className={stylesEdit.acept}
                  type="submit"
                  value="Aceptar Cambios"
                />
              )}
            </div>
          </form>
        </div>
        {user?.privilege === "user" ? (
          <div className={styles.containerBot}>
            <div>
              {hideReview ? (
                <div>
                  <div className={styles.review}>
                    <h3>Valoramos tu opinión</h3>
                    <div className={styles.inputTitle}>
                      <input
                        placeholder={"Titulo de tu review"}
                        name="review_title"
                        value={reviewuser.title}
                        onChange={(e) =>
                          setReviewuser({
                            ...reviewuser,
                            title: e.target.value,
                          })
                        }
                      ></input>
                    </div>
                    <textarea
                      className={styles.textarea}
                      name="review"
                      placeholder={"¿Qué te pareció el producto?"}
                      value={reviewuser.review}
                      onChange={(event) =>
                        setReviewuser({
                          ...reviewuser,
                          review: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.gracias}>
                  <h1 className={styles.Hrating}>
                    <span className={styles.hspan}>
                      Gracias por dejar su comentario
                    </span>
                  </h1>
                </div>
              )}
              {revActual.length === 0 ? (
                <button onClick={changereview} className={styles.buttonSend}>
                  Enviar comentario
                </button>
              ) : (
                false
              )}
              {console.log(revActual)}
            </div>
            <div>
              {hideRating && revActual.length === 0 ? (
                <div className={styles.estrellas}>
                  {[...Array(5)].map((star, index) => {
                    const ratingvalue = index + 1;
                    return (
                      <label>
                        <input
                          type="radio"
                          name="Rating"
                          value={ratingvalue}
                          onClick={function pushrating() {
                            setRating([...rating, ratingvalue]);
                            setHideRating(false);
                          }}
                        />
                        <FaStar
                          size={30}
                          className="star"
                          color={ratingvalue <= hover ? "#ffc107" : "#e4e5e9"}
                          onMouseEnter={() => setHover(ratingvalue)}
                          onMouseLeave={() => setHover(0)}
                        />
                      </label>
                    );
                  })}
                </div>
              ) : (
                <>
                </>
              )}
            </div>
          </div>
        ) : (
          false
        )}

        <div className={styles.box}>
          {filtred?.reviews.length && revActual[0] ? (
            filtred?.reviews.concat(revActual).map((review) => (
              <div className={styles.content}>
                <p className={styles.pRanking}>
                  <p className={styles.pReviewTitle}>{review.title}</p>
                  <p className={styles.pReview}>{review.text}</p>
                  <FaStar
                    size={20}
                    className="star"
                    color={rating ? "#ffc107" : "#e4e5e9"}
                  />
                </p>
              </div>
            ))
          ) : filtred?.reviews.length ? (
            filtred?.reviews.map((review) => (

              <div className={styles.content}>
                <p className={styles.pRanking}>
                  {[...Array(review.rating)].map((star, index) => {
                    return (
                      <FaStar
                        size={20}
                        className="star"
                        color={rating ? "#ffc107" : "#e4e5e9"}
                      />
                    );
                  })}
                  <p className={styles.pReviewTitle}>{review.title}</p>
                  <p className={styles.pReview}>{review.text}</p>
                </p>
              </div>
            ))
          ) : revActual[0] ? (
            <div className={styles.content}>
              <p className={styles.pRanking}>
                {[...Array(revActual[0].rating)].map((star, index) => {
                  return (
                    <FaStar
                      size={20}
                      className="star"
                      color={rating ? "#ffc107" : "#e4e5e9"}
                    />
                  );
                })}
                <p className={styles.pReviewTitle}>{revActual[0].title}</p>
                <p className={styles.pReview}>{revActual[0].text}</p>
              </p>
            </div>
          ) : (
            false
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailsComponent;
