import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './rating.css';
import { REVIEW_MUTATION, EDIT_PRODUCT, GET, GET_CATEGORIES } from "../../gql/productDetailsGql";
import styles from "./ProductDetail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faPencilAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import stylesEdit from "./ProductEdit.module.scss";
import { addProductDetails, addShopping, local } from '../../redux/actions';
import { toast } from 'react-toastify';
import { ACTUAL_USER, GET_USERS } from "../../gql/loginGql";
import { HiBadgeCheck } from "react-icons/hi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FiHeart } from 'react-icons/fi';
import { AppState } from '../../redux/reducers';
import Rstyles from './ResponsiveDetails.module.scss'
import { TOGGLE_WISHLIST, WISHLIST } from '../../gql/wishlist';
import { AiFillCloseSquare } from "react-icons/ai";

interface user {
  currentUser: {
    id: string;
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
  // let user: any = {};

  const currentU = useQuery(ACTUAL_USER);

  const user = currentU?.data?.currentUser;

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
    setControlReview(user?.id);
    addreview({
      variables: {
        id: filtred?.id,
        userId: user?.id,
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
        [e.currentTarget.name]: +e.currentTarget.value,
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

  const [editProduct, resultsEdit] = useMutation(EDIT_PRODUCT, {
    refetchQueries: [{ query: GET, variables: { id: id } }]
  });

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


  const [wish, reswish] = useMutation(TOGGLE_WISHLIST, {
    refetchQueries: [{ query: WISHLIST, variables: { userId: user?.id } }]
  })

  const wishes = useQuery(WISHLIST, { variables: { userId: user?.id } })
  const list = wishes?.data?.getWishList

  const handleFav = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(user)
    wish({ variables: { userId: currentU?.data?.currentUser?.id, productId: id } })
    toast.success('Se ha agregado a favoritos ❤')
  }

  useEffect(() => {
    setWish(list?.some((product: any) => product.id === id))
    console.log()
  }, [wishes, reswish])

  return (
    <React.Fragment>
      <div className={Rstyles.SortAll}>
        <div className={Rstyles.SortDetails}>
          <div className={Rstyles.SortCenter} >
            <img className={Rstyles.PImage} src={filtred?.image} alt="" />
          </div>
          <form
            onSubmit={handleSubmit}
            className={editMode ? stylesEdit.containerEdit : Rstyles.FormDetails}
          >
            {user?.privilege === "admin" ? (
              <button className={Rstyles.EditButton} onClick={handleEdit}>
                Editar
              </button>
            ) : (
              false
            )}
            <div className={Rstyles.SortCenter} >
              {editMode ? (
                <div className={Rstyles.form__groupEdit}>
                  <label htmlFor='username' className={Rstyles.form__label} >
                    <FontAwesomeIcon icon={faPencilAlt} aria-hidden={true} /> Nombre</label>
                  <input
                    className={Rstyles.form__field}
                    type='text'
                    defaultValue={details?.name}
                    name="name"
                    onChange={handleChange}
                  />
                </div>
                /*                 <input
                className={stylesEdit.input}
                name="name"
                type="text"
                onChange={handleChange}
                defaultValue={details?.name}
                /> */
              ) : (
                <h1 className={Rstyles.DName}>{filtred?.name}</h1>
              )}
            </div>
            <div className={Rstyles.SortCenter}>

              {user ? <button onClick={handleFav} className={wishe ? styles.fav : styles.fav}><FiHeart size={20} /></button>
                :
                <button className={styles.fav}><Link to="/Login"><FiHeart size={20} /></Link></button>
              }
              {editMode ?
                <div className={Rstyles.form__groupEdit}>
                  <label htmlFor='username' className={Rstyles.form__label} >
                    <FontAwesomeIcon icon={faPencilAlt} aria-hidden={true} /> Stock</label>
                  <input
                    className={Rstyles.form__field}
                    type='number'
                    defaultValue={filtred?.stock}
                    name='stock'
                    onChange={handleChange}
                  />
                </div>
                :
                (filtred?.stock ? <div className={styles.stock}><HiBadgeCheck size={20} /> Hay Stock </div> : <div style={{ color: 'red' }}><IoCloseCircleSharp color='red' /> No hay Stock </div>)
              }
            </div>

            <div className={Rstyles.SortDisaster}>
              {editMode && (
                <div className={Rstyles.SelectEdit} >
                  <select
                    className={Rstyles.SelectStyles}
                    onChange={handleAddCategories}>
                    {categoriesQuery?.map((cat) => (
                      <option key={cat.name} value={cat.id}
                        className={Rstyles.SelectStyles}
                      >
                        {cat.name}
                      </option>
                    ))}{" "}
                    {/*onClick={handleCategories}*/}
                  </select>
                </div>
              )}
              {editMode
                ? details?.categories?.map((category) => (

                  <button
                    className={Rstyles.CatButton}
                    onClick={handleCategory}
                    value={category.id}
                  >
                    {category.name} <FontAwesomeIcon icon={faWindowClose} style={{ marginLeft: '5%' }} aria-hidden={true} />
                  </button>
                ))
                : details?.categories?.map((category) => (
                  <p className={Rstyles.PDetails} >
                    Categoría: {category.name}
                  </p>
                ))}

            </div>
            <div className={Rstyles.SortCenter}>
              {editMode ? (
                <div className={Rstyles.form__groupEdit}>
                  <label htmlFor='username' className={Rstyles.form__label} >
                    <FontAwesomeIcon icon={faPencilAlt} aria-hidden={true} /> Marca</label>
                  <input
                    className={Rstyles.form__field}
                    type='text'
                    defaultValue={details?.brand}
                    name="brand"
                    onChange={handleChange}
                  />
                </div>
                /*            <p>
                             {" "}
                           Marca:{" "}
                             <input
                               className={stylesEdit.input}
                               name="brand"
                               defaultValue={details?.brand}
                               onChange={handleChange}
                             />{" "}
                           </p> */
              ) : (
                <p className={Rstyles.PDetails} > Marca: {filtred?.brand} </p>
              )}
            </div>
            <div className={Rstyles.SortCenter}>
              {editMode ? (
                <div className={Rstyles.form__groupEdit}>
                  <label htmlFor='username' className={Rstyles.form__label} >
                    <FontAwesomeIcon icon={faPencilAlt} aria-hidden={true} /> Detalles</label>
                  <textarea
                    className={Rstyles.TextAreaEdit}
                    name="review"
                    onChange={handleDetails}
                    defaultValue={details?.details}
                  />
                </div>
                /*    <p>
                     <textarea
                       onChange={handleDetails}
                       defaultValue={details?.details}
                     />
                   </p> */
              ) : (
                <p className={Rstyles.PDetails}>{filtred?.details}</p>
              )}
            </div>
            <div className={Rstyles.ButtonPrice}>
              <hr className={Rstyles.HRDetails} />
              <div className={Rstyles.SortCenter}>
                {editMode ? (
                  <div className={Rstyles.form__groupEdit}>
                    <label htmlFor='username' className={Rstyles.form__label} >
                      <FontAwesomeIcon icon={faPencilAlt} aria-hidden={true} />Precio</label>
                    <input
                      className={Rstyles.form__field}
                      type='text'
                      name='price'
                      defaultValue={details?.price}
                      onChange={handlePrice}
                    />
                  </div>
                ) : (
                  <p className={Rstyles.PriceDetails}>
                    ${new Intl.NumberFormat().format(filtred?.price || 0)}
                  </p>
                )}
              </div>
              {editMode ? false :
                <div>
                  {filtred && filtred?.stock > 0 ?
                    <div className={Rstyles.SortCenter}>
                      <button
                        onClick={handleAddProduct}
                        className={Rstyles.ButtonBuy}
                      >
                        <FontAwesomeIcon icon={faCartPlus} />
                      </button>
                    </div>
                    :
                    <div className={Rstyles.SortCenter}>
                      <button
                        className={Rstyles.ButtonBuy}
                      >
                        <AiFillCloseSquare />
                      </button>
                    </div>
                  }
                </div>
              }
            </div>
          </form>
        </div>
        <div className={Rstyles.SortEnd} >
          <div className={Rstyles.SorTitle} >
            <h3 className={Rstyles.TiReview} >Valoramos tu opinión</h3>
          </div>
          {user?.privilege === "user" ? (
            <div >
              {hideReview ? (
                <div className={Rstyles.SortReview}>
                  <div className={Rstyles.form__group}>
                    <label htmlFor='username' className={Rstyles.form__label} >
                      <FontAwesomeIcon icon={faPencilAlt} aria-hidden={true} /> Titulo de tu review</label>
                    <input
                      className={Rstyles.form__field}
                      type='text'
                      minLength={4}
                      maxLength={15}
                      value={reviewuser.title}
                      placeholder={"Titulo de tu review"}
                      name="review_title"
                      onChange={(e) =>
                        setReviewuser({
                          ...reviewuser,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={Rstyles.SortTexArea}>
                    <textarea
                      className={Rstyles.TextArea}
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
                <div className={Rstyles.SorTitle} >
                  <h3 className={Rstyles.DThanks}>
                    Gracias por dejar su comentario
                    </h3>
                </div>
              )}
              <div className={Rstyles.SortReview} >
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
                            onClick={() => setHover(ratingvalue)}
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
              <div className={Rstyles.SortReview} >
                {reviewuser.review !== '' && reviewuser.title !== '' && rating.length !== 0 && hideReview ? (
                  <button onClick={changereview} className={Rstyles.ButtonSend}>
                    Enviar
                  </button>
                ) : (
                  false
                )}
              </div>
            </div>
          ) : (
            false
          )}
          <div className={Rstyles.SorComments} >
            <hr className={Rstyles.BigHr} ></hr>
            {filtred?.reviews.length && revActual[0] ? (
              filtred?.reviews.concat(revActual).map((review) => (
                <div className={Rstyles.SortIndiComments}>
                  <div className={Rstyles.sortStarsComments} >
                    {[...Array(review.rating)].map((star, index) => {
                      return (
                        <FaStar
                          color={rating ? "#ffc107" : "#e4e5e9"}
                        />
                      );
                    })}
                  </div>
                  <hr className={Rstyles.HoriHr}></hr>
                  <div className={Rstyles.SortEachComments} >
                    <p className={Rstyles.ContentReviewTitle}>{review.title}</p>
                  </div>
                  <hr className={Rstyles.HoriHr}></hr>
                  <div className={Rstyles.SortEachComments} >
                    <p className={Rstyles.ContentReview}>{review.text}</p>
                  </div>
                </div>
              ))
            ) : filtred?.reviews.length ? (
              filtred?.reviews.map((review) => (
                <div className={Rstyles.SortIndiComments}>
                  <div className={Rstyles.sortStarsComments} >
                    {[...Array(review.rating)].map((star, index) => {
                      return (
                        <FaStar
                          color={rating ? "#ffc107" : "#e4e5e9"}
                        />

                      );
                    })}
                  </div>
                  <hr className={Rstyles.HoriHr}></hr>
                  <div className={Rstyles.SortEachComments} >
                    <p className={Rstyles.ContentReviewTitle}>{review.title}</p>
                  </div>
                  <hr className={Rstyles.HoriHr}></hr>
                  <div className={Rstyles.SortEachComments} >
                    <p className={Rstyles.ContentReview}>{review.text}</p>
                  </div>
                </div>
              ))
            ) : revActual[0] ? (
              <div className={Rstyles.SortIndiComments}>
                <div className={Rstyles.sortStarsComments} >
                  {[...Array(revActual[0].rating)].map((star, index) => {
                    return (
                      <FaStar
                        color={rating ? "#ffc107" : "#e4e5e9"}
                      />
                    );
                  })}
                </div>
                <hr className={Rstyles.HoriHr}></hr>
                <div className={Rstyles.SortEachComments} >
                  <p className={Rstyles.ContentReviewTitle}>{revActual[0].title}</p>
                </div>
                <hr className={Rstyles.HoriHr}></hr>
                <div className={Rstyles.SortEachComments} >
                  <p className={Rstyles.ContentReview} >{revActual[0].text}</p>
                </div>
              </div>
            ) : (
              false
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailsComponent;
