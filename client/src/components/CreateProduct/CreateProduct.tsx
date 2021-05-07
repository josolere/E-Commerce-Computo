import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_CATEGORIES } from "../../gql/categoriesGql";
import styles from "./loguin.module.scss";
import styles2 from "./CreateProduct.module.scss";
import { CREATE_FATHER_COMPATIBILITY } from "../../gql/createProductGql"
import { NEW_PRODUCT } from "../../gql/createProductGql";
import { amdComp, intelComp } from "./arrCompatibilities"
import { ADD_COMPATIBILITIES, GET_PRODUCT_COMPATIBILITIES } from "../../gql/buildPcgql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faImage,
  faMoneyBill,
  faCopyright,
  faFileSignature,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

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
  stock: number | undefined;

}

interface DetailsProduct {
  id: number | undefined;
  brand: string | undefined;
  image: string | undefined;
  name: string | undefined;
  price: number | undefined;
  details: string | undefined;
  stock: number | undefined;

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

export default function CreateProduct() {
 
  const [select, setSelect]: any = useState({ value: "" })

  const [selectProcesador, setSelectProcesador]: any = useState({ value: 0 })


  const [selectAdvanced, setSelectAdvanced]: any = useState({ value: 0 })
 
  const [prod, setProd] = useState<any>();

  const [selectCompatibility, setSelectCompatibility ] = useState(0)

  const [newpro, setnewpr] = useState<any>([]);

  const [compatibilities, setCompatibilities]: any = useState({
    headId: 0,
    productsId: [],
  });

  const [createProduct, results] = useMutation(NEW_PRODUCT); // para utiilizar usar results.data

  const [addCompatibility, resultsCompatibilities] = useMutation(
    ADD_COMPATIBILITIES
  ); 

  const [addFatherCompatibility, resultsFatherCompatibility] = useMutation(
    CREATE_FATHER_COMPATIBILITY
  ); 


  const { data: dataR } = useQuery(GET_PRODUCT_COMPATIBILITIES, {
    variables: { idProduct: selectAdvanced.value },
    
  });

  



  const { data } = useQuery<Categories>(GET_CATEGORIES);
  const categories = data?.getCategory;

  const [state, setState] = useState<IState>({
    name: "",
    price: 0,
    brand: "",
    image: "",
    details: "",
    categories: [],
    stock: 0
  });

  const products = useQuery<DetailsData>(GET, {
    variables: { name: "", categoriesId: [] },
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
      [e.currentTarget.name]: +e.currentTarget.value,
    });
  }


  const changeSelectAdvanced = (e: any) => {
    setSelectAdvanced({ value: e.target.value })}


  const changeSelect = (e: any) => {
    setSelect({ value: e.target.value })

    if (select.value === "amd") {
      setCompatibilities({ productsId: amdComp })
    }
    if (select.value === "intel") {
      setCompatibilities({ productsId: intelComp })
    }
    if (select.value === "ambos") {
      const amb = amdComp.concat(intelComp)
      setCompatibilities({ productsId: amb })
    }
  }

  console.log(state.categories[0])

  async function handleSubmit(e: any) {
      
    e.preventDefault();

    
      var valores = dataR?.getProductsCompatibilities.map((el:{id:number}) => el.id)
 

    
    
    setState({
      name: "",
      price: 0,
      brand: "",
      image: "",
      details: "",
      categories: [],
      stock:0
    })
    if(state.categories[0] === 2 ){
      setCategors([])
      createProduct({ variables: state })
        .then((resolve) => {
          toast.success('Se ha creado el producto 😁')
          addFatherCompatibility({
            variables: {
              HeadIdProduct: selectAdvanced.value,
              idsProducts:resolve.data.createProduct.id, 
            },
            
            
          });
        })
        .catch((err) => {
          console.log("Salio Mal");
        });
    }
    if (state.categories[0] === 1) {
      setCategors([])
      createProduct({ variables: state })
        .then((resolve) => {
          toast.success('Se ha creado el producto 😁')
          addCompatibility({
            variables: {
              HeadIdProduct: resolve.data.createProduct.id,
              idsProducts: valores,
            },
            
            
          });
        })
        .catch((err) => {
          console.log("Salio Mal");
        });
    } else {
        setCategors([])
        createProduct({ variables: state })
        .then((resolve) => {
          toast.success('Se ha creado el producto 😁')}
        )}
    setnewpr([...newpro, results?.data?.createProduct]);
    
  }


  
  const [categors, setCategors] = useState<Array<any>>([]);

  const handleCategories = (e: SelectEvent) => {
    e.preventDefault();
    setCategors([...categors,
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

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dagv8sxki/image/upload"
  const CLOUDINARY_UPLOAD_PRESET = "m1xljxz9"

  const imageHandler = async (e:any) =>{
    const file = e?.currentTarget?.files[0];

    const formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET)
    
    const res = await axios.post(CLOUDINARY_URL, formData ,{
      headers:{
        'Content-Type': 'multipart/form-data'
      },
    })
    setState({
      ...state,
      image: res.data.url,
    });

  }

  return (
    <div className={styles.back}>
      <div className={styles.organizar}>
        <div className={styles.caja}>
          <div className={styles.containeTitle}>
            <h1 className={styles.titleCreate} >Añadir Producto</h1>
          </div>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
            <div className={styles.image}>
              <label htmlFor="Nombre" className={styles.form__label}>
                <FontAwesomeIcon icon={faImage} aria-hidden={true} /> Imagen
              </label>
              <div>
              <img src={state.image}/>
              <input type='file' accept='image/png' onChange={imageHandler}/>
              </div>

              
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
                <FontAwesomeIcon icon={faPencilAlt} aria-hidden={true} /> Stock
              </label>
              <input
                className={styles.form__field}
                placeholder="stock"
                maxLength={30}
                value={state.stock}
                type="text"
                name="stock"
                onChange={handlePrice}
                required={true}
              />
            </div>
            <div className={styles.form__group}>
              <label htmlFor="Nombre" className={styles.form__label}>
                <FontAwesomeIcon icon={faCommentAlt} aria-hidden={true} />{" "}
                Categoria
              </label>
              <div className={styles.SelectDiv} >
                <select
                  className={styles.SelectCreate}
                  onChange={handleCategories}
                >
                  {categories?.map((cat) => (
                    <option className={styles.SelectCreate}
                      key={cat.name} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}{" "}
                onClick={handleCategories}
                </select>
              </div>
              <div className={styles.OrderCreateCat}>
                {categors.map((cate) => (
                  <button
                    className={styles.CatButtons}
                    onClick={handleDeleteCategory}
                    value={cate.id}
                    key={cate.name}
                  >
                    {cate.name}
                  </button>
                ))}
              </div>
            </div>
            { categors[0]?.name === "Procesadores" ? (
              <div className={styles.form__group}>
                <label htmlFor="Nombre" className={styles.form__label}>
                  <FontAwesomeIcon icon={faCommentAlt} aria-hidden={true} /> El
                  procesador es compatible con
                </label>
                <div className={styles2.checkbox}>
                  <label>
                    AMD Motherboards
                  <input
                      type="checkbox"
                      name={"amd"}
                      onChange={changeSelect}
                      checked={select.value === "amd" ? true : false}
                      value={"amd"}
                    />
                  </label>

                  <label>
                    Intel Motherboards
                  <input
                      type="checkbox"
                      name={"intel"}
                      onChange={changeSelect}
                      checked={select.value === "intel" ? true : false}
                      value={"intel"}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <></>
            )}
            
            { selectProcesador.value === "amd" ? 
             <div className={styles.form__group}>
             <label htmlFor="Nombre" className={styles.form__label}>
               <FontAwesomeIcon icon={faCommentAlt} aria-hidden={true} /> 
                Con que generacion de Procesadores es compatible
             </label>
             <div className={styles2.checkbox}>
               <label>
                 Anterior a 1ra GEN
               <input
                   type="checkbox"
                   onChange={changeSelectAdvanced}
                   value={14}
                 />
               </label>

               <label>
               1ra y 2da Gen
               <input
                   type="checkbox"
                   onChange={changeSelectAdvanced}
                   value={15}
                 />

               </label>
                    3ra en adelante
               <label>
                
               <input
                   type="checkbox"
                   onChange={changeSelectAdvanced}
                   value={17}
                 />
               </label>
             </div>
           </div> : false
          }
          { selectProcesador.value === "intel" ? 
             <div className={styles.form__group}>
             <label htmlFor="Nombre" className={styles.form__label}>
               <FontAwesomeIcon icon={faCommentAlt} aria-hidden={true} /> 
                Con que generacion de Procesadores es compatible
             </label>
             <div className={styles2.checkbox}>
               <label>
               8VA Generacion
               <input
                   type="checkbox"
                   onChange={changeSelectAdvanced}
                   value={29}
                 />
               </label>

               <label>
               9NA Generacion
               <input
                   type="checkbox"
                   onChange={changeSelectAdvanced}
                   value={30}
                 />

               </label>
                  10MA Generacion
               <label>
                
               <input
                   type="checkbox"
                   onChange={changeSelectAdvanced}
                   value={16}
                 />
               </label>
             </div>
           </div> : false
          }

            { categors[0]?.name === "Motherboards" ? (
              <div className={styles.form__group}>
                <label htmlFor="Nombre" className={styles.form__label}>
                  <FontAwesomeIcon icon={faCommentAlt} aria-hidden={true} /> El
                  producto es compatible con
                </label>
                <div className={styles2.checkbox}>
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

                  
                </div>
              </div>
            ) : (
              <></>
            )}
            { select.value === "amd" ? 
             <div className={styles.form__group}>
             <label htmlFor="Nombre" className={styles.form__label}>
               <FontAwesomeIcon icon={faCommentAlt} aria-hidden={true} /> 
                Con que generacion de Procesadores es compatible
             </label>
             <div className={styles2.checkbox}>
               <label>
                 Anterior a 1ra GEN
               <input
                   type="checkbox"
                   onChange={changeSelectAdvanced}
                   value={28}
                 />
               </label>

               <label>
               1ra y 2da Gen
               <input
                   type="checkbox"
                   onChange={changeSelectAdvanced}
                   value={29}
                 />

               </label>
                    3ra en adelante
               <label>
                
               <input
                   type="checkbox"
                   onChange={changeSelectAdvanced}
                   value={31}
                 />
               </label>
             </div>
           </div> : false
          }

          { select.value === "intel" ? 
             <div className={styles.form__group}>
             <label htmlFor="Nombre" className={styles.form__label}>
               <FontAwesomeIcon icon={faCommentAlt} aria-hidden={true} /> 
                Con que generacion de Procesadores es compatible
             </label>
             <div className={styles2.checkbox}>
               <label>
                 8VA Generacion
               <input
                   type="checkbox"
                   onChange={changeSelectAdvanced}
                   value={32}
                 />
               </label>

               <label>
               9NA Generacion
               <input
                   type="checkbox"
                   onChange={changeSelectAdvanced}
                   value={32}
                 />

               </label>
                   10MA Generacion
               <label>
                
               <input
                   type="checkbox"
                   onChange={changeSelectAdvanced}
                   value={30}
                 />
               </label>
             </div>
           </div> : false
          }
            <div className={styles.organizarbotones}>
              <button
                type="submit"
                className={styles.boton}
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
