import SubMenu from "./SubMenu";
import styles from './Categories.module.scss'

export interface model {
  title: string;
  subNav: { title: string, id:number }[];
}

const NavCategories = (): JSX.Element => {

    
  const categorias: model[] = [
    {
      title: "Placa de Video",
      subNav: [
        { title: "Placas de video Amd", id : 1 },
        { title: "Placas de video GeForce", id : 1 },
      ],
    },
    {
      title: "Memorias",
      subNav: [{ title: "Memorias Ram", id: 2}, { title: "Memorias Sodimm", id : 2 }],
    },
    {
      title: "Almacenamiento",
      subNav: [{ title: "Disco SSD", id:3 }, { title: "Disco Rigido", id : 3 }],
    },
    {
      title: "Motherboards",
      subNav: [{ title: "Mothers AMD", id : 4 }, { title: "Mothers Intel", id : 4 }],
    },
    {
      title: "Teclados y Mouses",
      subNav: [
        { title: "Mouses", id:5 },
        { title: "Teclados", id:5 },
        { title: "Mouse Pads", id:5 },
      ],
    },
    {
      title: "Monitores y Televisores",
      subNav: [{ title: "Soportes", id:6 }, { title: "Monitores y pantallas", id:6 }],
    },
    {
      title: "Perifericos",
      subNav: [{ title: "Webcam", id:7 },{ title: "Auriculares", id:7 }, { title: "Tablas Digitalizadoras", id:7 }],
    },
    {
      title: "Procesadores",
      subNav: [
        { title: "Procesadores Amd", id : 8 },
        { title: "Procesadores Intel", id : 8 },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      {categorias.map((item: model, i: number) => {
        return <SubMenu item={item} key={i}></SubMenu>;
      })}
    </div>
  );
};

export default NavCategories;