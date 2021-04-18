/* import SubMenu from "./SubMenu"; */
import styles from './Categories.module.scss'
import { useQuery, gql } from '@apollo/client';
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/actions";
import {GET_CATEGORIES} from "../../gql/categories"

export interface model {
  id: number;
  name:string
}

interface DetailsData {
  getCategory: model[]
}

const NavCategories = (): JSX.Element => {

  const { loading, error, data } = useQuery<DetailsData>(GET_CATEGORIES)

  const categories = data?.getCategory
  
  const filterCategories = (e:any) => {
    dispatch(setCategory([e.target.value]))
}

  const dispatch = useDispatch()

  return (
    <div className={styles.container} >
      <button className={styles.todos} onClick={(e) =>dispatch(setCategory([]))}>Todos</button>
      {categories?.map((item: model, i: number) => {
        return <button onClick ={e => filterCategories(e)} value={item.id}
        className={styles.containerCategories}>{item.name}</button>;
      })}
    </div>
  );
};

export default NavCategories;




/* const categorias: model[] = [
    {
      title: "Placa de Video",
      subNav: [
        { title: "Placas de video Amd", id : 1 },
        { title: "Placas de video GeForce", id : 2 },
      ],
    },
    {
      title: "Memorias",
      subNav: [{ title: "Memorias Ram", id: 3}, { title: "Memorias Sodimm", id : 4 }],
    },
    {
      title: "Almacenamiento",
      subNav: [{ title: "Disco SSD", id:5 }, { title: "Disco Rigido", id : 6 }],
    },
    {
      title: "Motherboards",
      subNav: [{ title: "Mothers AMD", id : 7 }, { title: "Mothers Intel", id : 8 }],
    },
    {
      title: "Teclados y Mouses",
      subNav: [
        { title: "Mouses", id:9 },
        { title: "Teclados", id:10 },
        { title: "Mouse Pads", id:11 },
      ],
    },
    {
      title: "Monitores y Televisores",
      subNav: [{ title: "Soportes", id:12 }, { title: "Monitores y pantallas", id:13 }],
    },
    {
      title: "Perifericos",
      subNav: [{ title: "Webcam", id:14 },{ title: "Auriculares", id:15 }, { title: "Tablas Digitalizadoras", id:16 }],
    },
    {
      title: "Procesadores",
      subNav: [
        { title: "Procesadores Amd", id : 17 },
        { title: "Procesadores Intel", id : 18 },
      ],
    },
  ];
 */