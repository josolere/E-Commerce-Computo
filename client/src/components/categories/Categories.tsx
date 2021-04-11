import SubMenu from "./SubMenu";
import styles from './Categories.module.scss'

export interface model {
  title: string;
  subNav: { title: string }[];
}

const NavCategories = (): JSX.Element => {

    
  const categorias: model[] = [
    {
      title: "Placa de Video",
      subNav: [
        { title: "Placas de video Amd" },
        { title: "Placas de video GeForce" },
      ],
    },
    {
      title: "Memorias",
      subNav: [{ title: "Memorias Ram" }, { title: "Memorias Sodimm" }],
    },
    {
      title: "Almacenamiento",
      subNav: [{ title: "Disco SSD" }, { title: "Disco Rigido" }],
    },
    {
      title: "Motherboards",
      subNav: [{ title: "Mothers AMD" }, { title: "Mothers Intel" }],
    },
    {
      title: "Teclados y Mouses",
      subNav: [
        { title: "Mouses" },
        { title: "Teclados" },
        { title: "Mouse Pads" },
      ],
    },
    {
      title: "Monitores y Televisores",
      subNav: [{ title: "Soportes" }, { title: "Monitores y pantallas" }],
    },
    {
      title: "Perifericos",
      subNav: [{ title: "Webcam" }, { title: "Tablas Digitalizadoras" }],
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