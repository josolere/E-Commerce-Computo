import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_CATEGORIES } from "../../gql/categoriesGql";
import styles from "../Users/loguin.module.scss";
import styles2 from "../Users/Edit.module.scss";
import styles3 from "./CreateProduct.module.scss";
import { NEW_PRODUCT } from "../../gql/createProductGql";
import { amdComp, intelComp } from "./arrCompatibilities"
import { ADD_COMPATIBILITIES } from "../../gql/buildPcgql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faImage,
  faMoneyBill,
  faCopyright,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";

interface Categorie {
  id: number | undefined;
  name: string | undefined;
}

interface Categories {
  getCategory: Categorie[];
}

type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.FormEvent<HTMLInputElement>;
type SelectEvent = React.FormEvent<HTMLSelectElement>;
type ButtonEvent = React.FormEvent<HTMLButtonElement>;

interface IState {
  name: string;
  price: number;
  brand: string;
  image: string;
  details: string;
  categories: number[];
}

interface DetailsProduct {
  id: number | undefined;
  brand: string | undefined;
  image: string | undefined;
  name: string | undefined;
  price: number | undefined;
  details: string | undefined;
}

interface DetailsData {
  getProducts: DetailsProduct[];
}

const GET = gql`
  query($name: String!, $categoriesId: [ID!]) {
    getProducts(
      filter: { limit: 40, name: $name, categoriesId: $categoriesId }
    ) {
      id
      name
      price
      image
    }
  }
`;

export default function CreateProduct(): JSX.Element {
  const [createProduct, results] = useMutation(NEW_PRODUCT); // para utiilizar usar results.data

  const [addCompatibility, resultsCompatibilities] = useMutation(
    ADD_COMPATIBILITIES
  ); // para utiilizar usar results.data

  const { data } = useQuery<Categories>(GET_CATEGORIES);
  const categories = data?.getCategory;

  const [state, setState] = useState<IState>({
    name: "",
    price: 0,
    brand: "",
    image: "",
    details: "",
    categories: [],
  });

  const products = useQuery<DetailsData>(GET, {
    variables: { name: "", categoriesId: [] },
  });

  const [prod, setProd] = useState<any>();

  const [newpro, setnewpr] = useState<any>([]);

  const [compatibilities, setCompatibilities]: any = useState({
    headId: 0,
    productsId: [],
  });

  useEffect(() => {
    setProd(products?.data?.getProducts);
  }, [products]);

  function handleChange(e: InputEvent) {
    setState({
      ...state,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  function handleProductsId(e: InputEvent) {
    return setCompatibilities({
      ...compatibilities,
      productsId: [0, Number(e.currentTarget.value)],
    });
  }

  function handlePrice(e: InputEvent) {
    return setState({
      ...state,
      price: +e.currentTarget.value,
    });
  }



  const [select, setSelect]:any = useState({value:""})
 
  const changeSelect = (e:any) => {
    setSelect({value : e.target.value})

    if(select.value === "amd"){
        setCompatibilities({ productsId : amdComp})
    }
    if(select.value === "intel"){
        setCompatibilities({ productsId : intelComp})
    }
    if(select.value === "ambos"){
        const amb = amdComp.concat(intelComp)
        setCompatibilities({ productsId : amb})
    }
  }

console.log(compatibilities)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createProduct({ variables: state })
      .then((resolve) => {
        addCompatibility({
          variables: {
            HeadIdProduct: resolve.data.createProduct.id,
            idsProducts: compatibilities.productsId,
          },
        });
      })
      .catch((err) => {
        console.log("Salio Mal");
      });
    setnewpr([...newpro, results?.data?.createProduct]);
  }

  const [categors, setCategors] = useState<Array<any>>([]);

  const handleCategories = (e: SelectEvent) => {
    e.preventDefault();
    setCategors([
      {
        id: parseInt(e.currentTarget.value),
        name: e.currentTarget.selectedOptions[0].innerHTML,
      },
    ]);
    setState({
      ...state,
      categories: [...state.categories, parseInt(e.currentTarget.value)],
    });
  };

  const handleDeleteCategory = (e: ButtonEvent) => {
    e.preventDefault();
    setCategors(
      categors.filter((cat) => cat.id !== parseInt(e.currentTarget.value))
    );
    setState({
      ...state,
      categories: state.categories.filter(
        (id) => id !== parseInt(e.currentTarget.value)
      ),
    });
  };



  


  return (
    <div className={styles.back}>
      <div className={styles2.organizar2}>
        <div className={styles.caja}>
          <div className={styles.container} style={{ marginTop:"-4rem", marginLeft: "20%" }}>
            Añadir Producto
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form__group}>
              <label htmlFor="Nombre" className={styles.form__label}>
                <FontAwesomeIcon icon={faFileSignature} aria-hidden={true} />{" "}
                Nombre
              </label>
              <input
                className={styles.form__field}
                placeholder="Nombre"
                minLength={5}
                maxLength={30}
                value={state.name}
                type="text"
                name="name"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className={styles.form__group}>
              <label htmlFor="Nombre" className={styles.form__label}>
                <FontAwesomeIcon icon={faMoneyBill} aria-hidden={true} /> Precio
              </label>
              <input
                className={styles.form__field}
                placeholder="Precio"
                minLength={3}
                maxLength={30}
                value={state.price}
                type="text"
                name="price"
                onChange={handlePrice}
                required={true}
              />
            </div>
            <div className={styles.form__group}>
              <label htmlFor="Nombre" className={styles.form__label}>
                <FontAwesomeIcon icon={faCopyright} aria-hidden={true} /> Marca
              </label>
              <input
                className={styles.form__field}
                placeholder="Marca"
                minLength={1}
                maxLength={30}
                value={state.brand}
                type="text"
                name="brand"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className={styles.form__group}>
              <label htmlFor="Nombre" className={styles.form__label}>
                <FontAwesomeIcon icon={faImage} aria-hidden={true} /> Imagen
              </label>
              <input
                className={styles.form__field}
                placeholder="Imagen"
                minLength={5}
                maxLength={30}
                value={state.image}
                type="text"
                name="image"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className={styles.form__group}>
              <label htmlFor="Nombre" className={styles.form__label}>
                <FontAwesomeIcon icon={faCommentAlt} aria-hidden={true} />{" "}
                Detalles
              </label>
              <input
                className={styles.form__field}
                placeholder="Detalles"
                minLength={10}
                maxLength={30}
                value={state.details}
                type="text"
                name="details"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className={styles.form__group}>
              <label htmlFor="Nombre" className={styles.form__label}>
                <FontAwesomeIcon icon={faCommentAlt} aria-hidden={true} />{" "}
                Categoria
              </label>
              <select
                className={styles3.SelectCreate}
                onChange={handleCategories}
              >
                {categories?.map((cat) => (
                  <option key={cat.name} value={cat.id}>
                    {cat.name}
                  </option>
                ))}{" "}
                onClick={handleCategories}
              </select>
              <div className={styles3.OrderCreateCat}>
                {categors.map((cate) => (
                  <button
                    className={styles3.CatButtons}
                    onClick={handleDeleteCategory}
                    value={cate.id}
                    key={cate.name}
                  >
                    {cate.name}
                  </button>
                ))}
              </div>
            </div>

            {categors[0]?.name === "Procesadores" || categors[0]?.name === "Motherboards" ? (
              <div className={styles.form__group}>
                <label htmlFor="Nombre" className={styles.form__label}>
                  <FontAwesomeIcon icon={faCommentAlt} aria-hidden={true} /> El
                  producto es compatible con
                </label>
                <div className={styles3.checkbox}>
                <label>
                    Amd
                  <input
                    type="checkbox"
                    name={"amd"}
                    onChange={changeSelect}
                    checked={select.value === "amd" ? true : false}
                    value={"amd"}
                  />
                </label>

                <label>
                    Intel
                  <input
                    type="checkbox"
                    name={"intel"}  
                    onChange={changeSelect}
                    checked={select.value === "intel" ? true : false}
                    value={"intel"}
                  />
                </label>

                <label>
                  Ambos
                  <input
                  
                    type="checkbox"
                    name={"ambos" } 
                    onChange={changeSelect}
                    checked={select.value === "ambos" ? true : false}
                    value={"ambos"}
                  />
                </label>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className={styles.organizarbotones}>
              <button
                type="submit"
                className={styles.boton}
                style={{ marginTop: "2rem" }}
              >
                Añadir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
