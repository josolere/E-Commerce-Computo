import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt'
const saltRounds = 10;

let categorie = [
  { name: "Placas de Video AMD" },
  { name: "Placas de Video GeForce" },
];

//Opcion, agregarle prop category a cada obj product y filtrar desde ahi

let products = [
  {
    name: "Headset Redragon H220 THEMIS",
    image:
      "https://cdn.shopify.com/s/files/1/2695/9506/products/H220-1_headset_250x250@2x.png?v=1582614574",
    brand: "Redragon",
    details:
      "Un auricular con un sonido brillante y claro, con una estructura liviana y cómoda, el Themis es un auricular pensado para jugar cómodamente. -Sonido:Este auricular, posee un claro sonido estéreo con ficha Jack 3.5 mm, garantizan la mejor calidad de sonido en nuestros diafragmas de 50mm con imanes de neodimio, ideales en la construcción de periféricos de sonido. -Micrófono: Integrado en la estructura de las copas, construido sobre un brazo rebatible y captación omnidireccional.",
    price: 2099,
    categoriesId: [7],
    stock: 7,
  },
  {
    name: "Headset Logitech G Series G432",
    image:
      "https://www.hardware-journal.de/images/Bilder/2019/News/Logitech-G/G935-lightsync-wireless-G635-G432-7-1-surround-G332-Stereo/logitech-g432-gaming-headset-7-1.png",
    brand: "Logitech",
    details:
      "¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los Logitech G432 no te perdés ningún detalle y escuchás el audio tal y como fue diseñado por los creadores.",
    price: 7999,
    categoriesId: [7],
    stock: 10,
  },
  {
    name: "AMD Ryzen 9 5900X 12-Core Processor",
    image:
      "https://www.pctechreviews.com.au/wp-content/gallery/ryzen_5900x_main/AMD-Ryzen-5000-Series-Ryzen-9.png",
    brand: "AMD",
    details:
      "El procesador que ofrece la mejor experiencia de juego del mundo. 12 núcleos para potenciar la experiencia de juego, la transmisión en vivo y mucho más. Diseña más rápido. Procesa más rápido. Itera más rápido. Crea más y más rápido con los procesadores AMD Ryzen. 12 Núcleos de CPU, Velocidad base 3.7GHz, Velocidad Máxima 4.8GHz.",
    price: 76499,
    categoriesId: [8],
    stock: 5,
  },
  {
    name: "AMD Ryzen 7 5800X 8-Core Processor",
    image:
      "https://matrixwarehouse.co.za/wp-content/uploads/2020/11/AMD-Ryzen-7-5800X-Desktop-Processor.png",
    brand: "AMD",
    details:
      "Procesador de gama alta de AMD. 8 Núcleos y 16 hilos. Velocidad Base de 3.8GHz, Velocidad Máxima de 4.7GHz. Compatible con Socket AM4(Chipset B550 o mejor)",
    price: 55399,
    categoriesId: [8],
    stock: 1,
  },
  {
    name: "Intel i9 10900k 10-Core Processor",
    image:
      "https://storage-asset.msi.com/event/2020/mb/intel-z490-promotion/images/intel-core-i9.png",
    brand: "Intel",
    details:
      "Procesador Tope de gama de Intel. 10 núcleos, 20 hilos. Corre absolutamente todo. Velocidad base de 3.7GHz, Velocidad Máxima de 5.3GHz. Compatible con Socket LGA 1200. Viene con GPU Integrada Intel HD Graphics 630",
    price: 58399,
    categoriesId: [8],
    stock: 12,
  },
  {
    name: "Intel i7 10700k 8-Core Processor",
    image:
      "https://nanotroniconline.com/wp-content/uploads/2020/08/procesador-inte-core-i7-10700-nanotronic.png",
    brand: "Intel",
    details:
      "Procesador gama alta de Intel. 8 núcleos, 16 hilos. Corre absolutamente todo. Velocidad base de 3.8GHz, Velocidad Máxima de 5.1GHz. Compatible con Socket LGA 1200. Viene con GPU Integrada Intel HD Graphics 630",
    price: 48799,
    categoriesId: [8],
    stock: 8,
  },
  {
    name: "AMD Radeon PowerColor RX 6900XT Red Devil",
    image: "https://www.powercolor.com/_upload/images//2012071505360.png",
    brand: "PowerColor",
    details:
      "Placa de video tope de gama de AMD. Velocidad base 1.8GHz, Velocidad Máxima 2.3GHz. 16 GB de memoria GDDR6. Corre todo en 4k a 60 fps, o 1080p 144fps.",
    price: 500000,
    categoriesId: [1],
    stock: 4,
  },
  {
    name: "ASUS GeForce RTX 3090 ROG Strix",
    image:
      "https://dlcdnwebimgs.asus.com/gain/1F10387D-A3D0-41EC-A583-E19A1DE394EE/w1000/h732",
    brand: "ASUS",
    details:
      "Placa de video tope de gama de NVIDIA. Velocidad base de 1.4GHz, Velocidad Máxima de 1.7GHz. 24GB de memoria GDDR6X. Requiere una fuente de 750W. Corre todo a 4k 60 fps, o 1080p 144fps",
    price: 600000,
    categoriesId: [1],
    stock: 5,
  },
  {
    name: "ASUS ROG Maximus XII FORMULA Motherboard Socket 1200 Chipset z49",
    image:
      "https://www.asus.com/microsite/motherboard/Intel-Z490/nl/img/products/m12h_wifi.png",
    brand: "ASUS",
    details:
      "Placa madre tope de gama ASUS, con socket LGA 1200, compatible con lo mejor de Intel. Wi-Fi 6(.ax) incluido. Tres ranuras M.2. Disipadores gigantes para VRM, chipset y sockets M2. Ethernet 10gb incluido. Compatible con Thunderbolt y conectores USB 3.2 incluidos.",
    price: 72999,
    categoriesId: [4],
    stock: 7,
  },
  {
    name: "ASUS ROG Strix Chipset x570 Socket AM4",
    image:
      "https://avadirect-freedomusainc1.netdna-ssl.com/Pictures/Big/12858027_1.png",
    brand: "ASUS",
    details:
      "Placa madre tope de gama ASUS, con socket AM4, compatible con lo mejor de AMD. Wi-Fi 6(.ax) incluido. Tres ranuras M.2. Disipadores gigantes para VRM, chipset y sockets M2. Ethernet 10gb incluido. Conectores USB 3.2 incluidos.",
    price: 57999,
    categoriesId: [4],
    stock: 7,
  },
  {
    name: "MONITOR 24 LED VIEWSONIC VX2458-MHD 144HZ 1MS",
    image:
      "https://www.venex.com.ar/products_images/1585891907_monitor_24_led_viewsonic_vx2458_mhd_144hz.png",
    brand: "ViewSonic",
    details:
      'l VX2458-mhd de ViewSonic® es un monitor Full HD de 24" (23,6" visibles) desarrollado para juegos y entretenimiento. Con una calidad de imagen increíble y una frecuencia de actualización de 144 hz, este monitor es perfecto para imágenes multimedia que se mueven rápidamente, como películas cargadas de acción o juegos de alta velocidad. La tecnología AMD FreeSync™ prácticamente elimina la fragmentación de la pantalla y los cortes para que pueda jugar de manera fluida, mientras un tiempo de respuesta ultra rápido de 1 ms y el bajo retraso de entrada ofrecen un rendimiento de pantalla sin interrupciones ni imágenes borrosas. ',
    price: 46599,
    categoriesId: [6],
    stock: 7,
  },
  {
    name: 'MONITOR 22" LG 22MK600M FHD IPS 75HZ 5MS        ',
    image: "https://www.venex.com.ar/products_images/1608298268_large01.png",
    brand: "LG",
    details:
      "La tecnología IPS mejora el rendimiento de las pantallas de cristal líquido. Reducción del tiempo de respuesta, mejora de la reproducción del color, y el usuario puede ver la pantalla desde prácticamente cualquier ángulo.",
    price: 21999,
    categoriesId: [6],
    stock: 7,
  },
  {
    name: "DISCO SOLIDO SSD 240 GB KINGSTON SATA III A400        ",
    image:
      "https://www.venex.com.ar/products_images/1585751676_ssd_240gb_kingston_a400.jpg",
    brand: "GIGABYTE",
    details:
      "La unidad de estado sólido A400 de Kingston mejora drásticamente la capacidad de respuesta de su sistema existente con increíbles tiempos de arranque, carga y transferencia en comparación con los discos duros mecánicos.",
    price: 4769,
    categoriesId: [3],
    stock: 7,
  },
  {
    name: "DISCO SOLIDO SSD 250 GB WD M2 NVME SN550 2400MB/S BLUE        ",
    image:
      "https://www.venex.com.ar/products_images/1574943255_wdbluesn500nvmessdangle.png.thumb.1280.1280.png",
    brand: "WDIGITAL",
    details:
      "Ponga la potencia de NVMe™ en el corazón de su PC para lograr un rendimiento ultrarrápido con una capacidad de respuesta impresionante. El disco SSD WD Blue™ SN550 NVMe™ puede ofrecer una velocidad más de 4 veces superior a la de nuestras mejores unidades SSD SATA. Ya sea que esté trabajando, creando, jugando ocasionalmente o procesando grandes cantidades de datos, puede aprovechar las altas velocidades de esta potente unidad interna para hacer más cosas, de manera más rápida. Con disponibilidad en capacidades hasta 1 TB en un factor de forma M.2 2280 económico, no existe mejor momento que ahora mismo para cambiarse a las unidades NVMe.",
    price: 5999,
    categoriesId: [3],
    stock: 7,
  },
  {
    name: "MEMORIA RAM DDR4 4GB 2666MHZ HYPERX FURY",
    image:
      "https://www.venex.com.ar/products_images/1585850472_ddr4_4gb_2666mhz_hyperxfury.png",
    brand: "HYPERX",
    details:
      "HyperX® FURY DDR4 reconoce automáticamente la plataforma a la que se conecta y realiza el overclock a la máxima frecuencia publicada, hasta 2666 MHz, para una funcionalidad plug-and-play perfecta. Ofrece un rendimiento de máximo nivel automático para placas base incluyendo los chiptsets X99 y de la serie 200 de Intel, y es un complemento a los procesadores de 2, 4, 6, 8 y 10 núcleos de Intel para acelerar la edición de vídeo, el renderizado 3D, las prestaciones de juego y el procesamiento de IA. HyperX FURY DDR4 da como resultado velocidades más rápidas, mayor rendimiento y fiabilidad mejorada. ",
    price: 3099,
    categoriesId: [2],
    stock: 7,
  },
  {
    name: "MEMORIA RAM DDR4 8GB 3200MHZ ADATA XPG SPECTRIX D60G RGB        ",
    image:
      "https://www.venex.com.ar/products_images/1594237851_productgallery38.png",
    brand: "ADATA",
    details:
      "estacar por encima de la competencia,más RGB por mm2, diseño cortado con diamante, estable, duradera y confiable",
    price: 6799,
    categoriesId: [2],
    stock: 7,
  },
  {
    name: "TECLADO HYPERX ALLOY FPS PRO MECANICO ENG SWITCH RED        ",
    image:
      "https://www.venex.com.ar/products_images/1616076589_740617268782.png",
    brand: "HYPERX",
    details:
      "Los teclados HyperXTM Alloy FPS están diseñados para una gran durabilidad, confiabilidad y juego de alto nivel. Si lo que necesitas es un teclado completo, el Alloy FPS es el equipo ideal para ti. Si estás buscando un teclado tenkeyless (TKL, sin teclado numérico) que sólo te brinde las teclas más esenciales, el Alloy FPS Pro es el teclado que necesitas1. Todos los teclados cuentan con las características que todo shooter de primera persona (FPS) exigente querría en su teclado: teclas mecánicas CHERRY® MX, una sólida estructura de acero, cable desmontable, Modo Juego, 100% Anti-Ghosting, y N-key rollover. Ya sea que seas un shooter de primera persona (FPS) o que juegues como ellos, HyperX Alloy FPS es el teclado correcto para ti.",
    price: 8490,
    categoriesId: [5],
    stock: 7,
  },
  {
    name: "MOUSE COOLER MASTER MM710 BLACK MATTE        ",
    image:
      "https://www.venex.com.ar/products_images/1601583482_iil193015636750.png",
    brand: "MASTER",
    details:
      "Al implementar un nuevo y novedoso diseño de carcasa de nido de abeja que es a la vez ligero y duradero, hemos recortado el peso total de nuestro ratón a menos de 53 g. No más peleas contra el ratón y no más francotiradores perdidos debido a un rango de movimiento de peso limitado. El dolor de muñeca después de las batallas de maratón y la fatiga después de pasar la noche es cosa del pasado. Apunte mejor, rinda mejor, durante más tiempo.",
    price: 4890,
    categoriesId: [5],
    stock: 0,
  },
  {
    name: "Mousepad Medium Rgb Steelseries Qck Gaming Surface",
    image:
      "https://cdn.idntimes.com/content-images/community/2017/10/stel-e8111faa795a43916354266643ffeaf4.png",
    details:
      "El software SteelSeries Engine desbloquea un impresionante arsenal de aplicaciones de motor que hacen que la personalización sea fácil e intuitiva.",
    price: 16969,
    categoriesId: [5],
    stock: 7,
  },
  {
    name: 'Monitor curvo MSI Optix G27C led 27 " negro 100V/240V',
    image:
      "https://asset.msi.com/global/picture/images/monitor/Gaming_monitor.png",
    details:
      "Disfrutá de todas las cualidades que el monitor MSI G27C tiene para ofrecerte. Percibí las imágenes de una manera completamente diferente y complementá cualquier espacio ya sea en tu casa u oficina.",
    price: 58900,
    categoriesId: [6],
    stock: 7,
  },
  {
    name: "Memoria RAM Vengeance LPX 16GB 2x8GB Corsair",
    image:
      "https://www.arjansac.com/image/cache/catalog/CORSAIR/Memorias%20RAM/Memoria%20RAM%20DDR4%202666Mhz%20PC4-21300/COR%2016GB%202666MHZ%20VENG%20DDR4/COR%2016GB%202666MHZ%20VENG%20DDR42-1000x1000.png",
    details:
      "Su capacidad de 16 GB distribuida en módulos de 2 x 8 GB hace de esta memoria un soporte ideal para trabajos con aplicaciones de diseño o edición, juegos exigentes, contenidos multimedia, entre otros. A su vez, la distribución de la capacidad total en dos módulos iguales te permitirá maximizar tus posibilidades de uso.",
    price: 13490,
    categoriesId: [4],
    stock: 8,
  },
];

let categories = [
  {
    name: "Placa de Video",
  },
  {
    name: "Memorias",
  },
  {
    name: "Almacenamiento",
  },
  {
    name: "Motherboards",
  },
  {
    name: "Teclados y Mouses",
  },
  {
    name: "Monitores y Televisores",
  },
  {
    name: "Perifericos",
  },
  {
    name: "Procesadores",
  },
];


const users = [
  {
    name: "admin",
    surname: "admin",
    email: "maurice@moss.com",
    password: "$2b$10$bJCrnuOepASZYkICVhF21eUTJMh.ICoxyuDAGzC2h5qgF6lhB9ZEa",
    username: "admin",
    privilege: "admin",
    active: true,
    address: "123 Main",
    id: uuid(),
  },
];

export function usersSeeder() {
  users.forEach((item: any) => {
    User.create({
      name: item.name,
      surname: item.surname,
      email: item.email,
      password: item.password,
      username: item.username,
      privilege: item.privilege,
      active: item.active,
      address: item.address,
      id: item.id,
    });
  });
}

export function categoriesSeeder() {
  categories.forEach((item: any) => {
    Category.create({
      name: item.name,
    });
  });
}
export function productsSeeder() {
  products.forEach((item: any) => {
    Product.create({
      name: item.name,
      brand: item.brand,
      price: item.price,
      image: item.image,
      details: item.details,
      // categoriesId: item.categoriesId,
      stock: item.stock,
    }).then((productCreated) =>
      productCreated.setCategories([item.categoriesId])
    );
  });
}

export async function getUsers() {
  let users = await User.findAll();
  return users;
}
