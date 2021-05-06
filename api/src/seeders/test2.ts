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
    name: "AMD Radeon PowerColor RX 6900XT Red Devil",
    image: "https://www.powercolor.com/_upload/images//2012071505360.png",
    brand: "PowerColor",
    details:
      "Placa de video tope de gama de AMD. Velocidad base 1.8GHz, Velocidad Máxima 2.3GHz. 16 GB de memoria GDDR6. Corre todo en 4k a 60 fps, o 1080p 144fps.",
    price: 500000,
    categoriesId: [3],
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
    categoriesId: [3],
    stock: 5,
  },
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
    categoriesId: [2],
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
    categoriesId: [2],
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
    categoriesId: [2],
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
    categoriesId: [2],
    stock: 8,
  },

  {
    name: "Procesador AMD Ryzen 5 1600af",
    image:
      "https://www.amd.com/system/files/11157-ryzen-5-pib-left-facing-1260x709.png",
    brand: "AMD",
    details:
      "Clave en el rendimiento de computadoras de escritorio, ya no tenés que pensar en cómo distribuir el tiempo y acciones: ahora todas las tareas en simultáneo son posibles. AMD cuenta con un catálogo de productos que se adaptan a los requerimientos de todo tipo de usuarios: juegos en línea, edición a gran escala, contenido en múltiples plataformas y más.",
    price: 19000,
    categoriesId: [2],
    stock: 8,
  },

  {
    name: "Procesador AMD Ryzen 5 2400G AM4",
    image:
      " https://imagenes.compufull.com/thumb/im_0_0_0_700x700_8917_1/CPU_AMD_AM4_RYZEN_5_2400G_X4_39GHZ_MAX_TURBO_CVIDEO_VEGA20180418111954.png      ",
    brand: "AMD",
    details:
      "Los procesadores revolucionarios e inteligentes AMD Ryzen™ están diseñados para ofrecer una experiencia de cómputo superior y de alto rendimiento. La revolucionaria tecnología de procesamiento de subprocesos múltiples más reciente de AMD te ofrece un rendimiento ultrarrápido cuando trabajas o juegas.",
    price: 29000,
    categoriesId: [2],
    stock: 5,
  },

  {
    name: "Procesador AMD A10-7890K 4.1Ghz",
    image:"https://www.xtremetecpc.com/wp-content/uploads/2017/03/proce_amd_a-series-a10-7890k-a.png",
    brand: "AMD",
    details:
      "El microprocesador AMD A10 7890K mejora lo visto hasta ahora en un procesador AMD para presentarnos un núcleo con 12 procesadores divididos en un procesador Quad Core y 8 núcleos para la unidad gráfica o GPU y 4MB de Caché L2. La serie A de AMD aprovecha la tecnología Turbo Core para exprimir al máximo la potencia de la CPU para ofrecer el mejor rendimiento en tus aplicaciones al llegar hasta la increíble cantidad de 4.3GHz en el socket FM2+.",
    price: 16000,
    categoriesId: [2],
    stock: 2,
  },

  {
    name: 'MICRO PROCESADOR INTEL CORE I5 9600K 4.60GHZ 6/6 9MB 1151 ',
    image:
  "https://plusvisionpc.com/wp-content/uploads/2020/03/855-20190129200545-855-20181029222058-471-20171016172031-i5-unlocked-min.png",
    details:
    "Jugá, grabá y transmití sin compromiso en un sistema alimentado por un procesador Intel® Core Utilice la tecnología Intel® Quick Sync Video para transmitir en vivo, capturar y realizar múltiples tareas sin interrupción. Combínelo con la tecnología de memoria Intel® Optane ™ para acelerar la carga y el lanzamiento de los juegos que más juega.",
    price: 17900,
    brand:"Intel",
    categoriesId: [2],
    stock: 7,
  },

  {
    name: 'Procesador Intel® Core™ i5-8400    ',
    image:
  "https://i.pinimg.com/originals/10/ae/c8/10aec83054402bba8f2df66485c25cee.png",
    details:
    "Jugá, grabá y transmití sin compromiso en un sistema alimentado por un procesador Intel® Core Utilice la tecnología Intel® Quick Sync Video para transmitir en vivo, capturar y realizar múltiples tareas sin interrupción. Combínelo con la tecnología de memoria Intel® Optane ™ para acelerar la carga y el lanzamiento de los juegos que más juega.",
    price: 26900,
    brand:"Intel",
    categoriesId: [2],
    stock: 7,
  },

  {
    name: "MOTHERBOARD ASUS A68HM-PLUS FM2+    ",
    image:
      " https://www.venex.com.ar/products_images/1615562827_p_setting_xxx_0_90_end_692.png      ",
    brand: "ASUS",
    details:"Socket de procesador:Toma FM2+ Tipos de memoria compatibles:DDR3-SDRAMMemoria interna máxima:32 GB Controladores incluidos: Factor de forma: Micro ATX",
    price: 5600,
    categoriesId: [1],
    stock: 5,
  },
  {
    name: "MOTHERBOARD MSI B450M PRO-M2 AM4    ",
    image:"https://www.venex.com.ar/products_images/1535665702_product_0_20180716112302_5b4c0f96b7c8c.png",
    brand: "MSI",
    details:
      "La interfaz PCIe Gen3 x4 Ultra M.2 empuja la transferencia de datos a velocidades de hasta 32 Gb/s. Además, también soporta módulos M.2 SATA3 6Gb/s, y es compatible con el Kit U.2 de MSI para la instalación de algunos de los SSD U.2 PCIe Gen3 x4 más rápidos del mundo.      ",
    price: 10700,
    categoriesId: [1],
    stock: 1,
  },
  {
    name: "ASUS ROG Maximus XII FORMULA Motherboard Socket 1200 Chipset z49",
    image:
      "https://www.asus.com/microsite/motherboard/Intel-Z490/nl/img/products/m12h_wifi.png",
    brand: "ASUS",
    details:
      "Placa madre tope de gama ASUS, con socket LGA 1200, compatible con lo mejor de Intel. Wi-Fi 6(.ax) incluido. Tres ranuras M.2. Disipadores gigantes para VRM, chipset y sockets M2. Ethernet 10gb incluido. Compatible con Thunderbolt y conectores USB 3.2 incluidos.",
    price: 72999,
    categoriesId: [1],
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
    categoriesId: [1],
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
    categoriesId: [5],
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
    categoriesId: [5],
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
    categoriesId: [4],
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
    categoriesId: [4],
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
    categoriesId: [7],
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
    categoriesId: [7],
    stock: 0,
  },
  {
    name: "Mousepad Medium Rgb Steelseries Qck Gaming Surface",
    image:
      "https://cdn.idntimes.com/content-images/community/2017/10/stel-e8111faa795a43916354266643ffeaf4.png",
    details:
      "El software SteelSeries Engine desbloquea un impresionante arsenal de aplicaciones de motor que hacen que la personalización sea fácil e intuitiva.",
    price: 16969,
    categoriesId: [7],
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
  {
    name: "MOTHERBOARD GIGABYTE H310M M2 S1151   ",
    image:"https://www.venex.com.ar/products_images/1600525254_2019010916232309_big.png",
    brand: "GIGABYTE",
    details:
      "  Las placas base de GIGABYTE utilizan condensadores de audio de alta gama. Estos condensadores de alta calidad ayudan a ofrecer audio de alta resolución y alta fidelidad para proporcionar los efectos de sonido más realistas para los jugadores.      ",
    price: 8700,
    categoriesId: [1],
    stock: 2,
  },
  {
    name: "MOTHERBOARD SOCKET 1151 MSI H310M PRO VDH 8Y9TH ",
    image:"https://d3ugyf2ht6aenh.cloudfront.net/stores/001/474/949/products/productos-2021-04-16t011925-2061-252d26931fb40b399916185469295331-640-0.png",
    brand: "MSI",
    details:
    "Gigabyte H310M S2H es una placa base para los nuevos procesadores de Intel, con la que disfrutarás de la tecnología más avanzada a un precio imbatible. Disfrutarás de las caracteristicas más potentes como son M.     ",
    price: 9700,
    categoriesId: [1],
    stock: 2,
  },{
    name: 'Gabinete Corsair Carbide SPEC-04 Mid-Tower Black/Red',
    image: 
      "https://www.pngfind.com/pngs/m/420-4204144_corsair-carbide-spec-04-black-red-atx-mid.png",
    details: 
      "Ventana de cristal templado y diseño exterior anguloso. El diseño asimétrico aporta un aspecto atrevido.Anclajes y abrazaderas para cables. Oculte los cables detrás de la bandeja de la placa base para conseguir un aspecto organizado y apartado del flujo de aire para mejorar la refrigeración. Espacio para cinco ventiladores de 120 mm. Potencial de refrigeración excelente con un ventilador frontal de 120 mm preinstalado. Amplio almacenamiento. Bastidores para tres unidades HDD y dos SSD de instalación sencilla para conseguir un aspecto organizado del sistema y los cables. Panel lateral de E/S limpio. Con un puerto USB 3.0 de alta velocidad y puertos adicionales para todo tipo de conexiones modernas.",
    price: 12816,
    categoriesId: [9],
    stock: 10
  },
  { 
    name: 'Gabinete Thermaltake Core V21 Mini-ITX',
    image: 
      "https://www.pngfind.com/pngs/m/420-4204144_corsair-carbide-spec-04-black-red-atx-mid.png",
    details: 
      "Thermaltake Core V21 SPCC Micro ATX, chasis de caja de computadora para juegos Mini ITX Cube, construcción de factor de forma pequeño, ventilador frontal de 200 mm preinstalado",
    price: 29899,
    categoriesId: [9],
    stock: 10
  },
  { 
    name: 'Gabinete Cooler Master MasterCase H500',
    image: 
      "https://www.pngfind.com/pngs/m/592-5922371_zoom-cooler-master-mastercase-h500-hd-png-download.png",
    details: 
      "DISEÑO INCREÍBLE: Panel frontal transparente y de malla Ventiladores ARGB dobles de 200 mm Sistema de iluminación ARGB. Panel lateral de vidrio templado. EL RENDIMIENTO VIENE EN PARES: Dos paneles frontales, dos ventiladores ARGB de 200 mm y un asa para agarrarse cuando la adrenalina entra en juego . El MasterCase H500 se establece como el chasis de referencia para un flujo de aire de alto rendimiento. Ahora, con ventiladores ARGB de 200 mm, su legado se actualiza con iluminación premium. PANELES TRANSPARENTES Y DE MALLA INCLUIDOS: Cada elección de paneles frontales decide si la construcción sobresaldrá en un rendimiento de flujo de aire despiadado o una estética llamativa. Por supuesto, la malla es la opción ideal para proporcionar a los ventiladores preinstalados grandes volúmenes de aire fresco. El panel transparente, por otro lado, desfila a esos fanáticos en una vista cristalina.",
    price: 16999,
    categoriesId: [9],
    stock: 10
  },
  { 
    name: "Water Cooler Be Quiet! Pure Loop 280mm",
    image: "https://www.scan.co.uk/images/infopages/be_quiet_cooler/silentloop2/360top.png",
    details: "Muy alto rendimiento de refrigeración. Con Pure Loop, incluso las aplicaciones más exigentes se pueden utilizar de forma fiable. Una inmensa potencia de refrigeración proporciona bajas temperaturas, incluso durante períodos de máximo rendimiento de la CPU. Fans de Pure Wings 2: El ventilador Pure Wings 2 de 4.724 in proporciona un funcionamiento muy silencioso y un alto rendimiento de refrigeración. Sus nueve aspas de ventilador optimizadas para flujo de aire hacen de Pure Wings 2 el ventilador ideal para el radiador de aluminio de Pure Loop.",
    price: 41999,
    categoriesId: [10],
    stock: 9
  },
  { 
    name: "Cooler beQuiet! Dark Rock Pro 4",
    image: "https://cdn-reichelt.de/bilder/web/xxl_ws/E200/BEQUIET_BK023-01.png",
    details: "Potencia de enfriamiento inmensa: No hay limitaciones en silencio y rendimiento para sistemas overclocked y aplicaciones gráficas exigentes. Dark Rock Pro 4 proporciona una impresionante calificación de TDP de 250W y alcanza bajas temperaturas incluso durante períodos de máximo rendimiento de la CPU. Diseño altamente avanzado. Dark Rock Pro 4 está equipado con siete tubos de calor de cobre de 0.236 in de tecnología avanzada que maximizan la conductancia del calor. Las aletas de enfriamiento optimizadas por el flujo de aire con pequeños puntos en sus superficies aumentan la circulación del aire. El revestimiento negro especial con partículas de cerámica hace posible una transferencia perfecta del calor.",
    price: 37999,
    categoriesId: [10],
    stock: 9
  },
  { 
    name: "Cooler CoolerMaster Hyper 212 EVO LED",
    image: "https://www.pngfind.com/pngs/m/313-3137219_zoom-cooler-master-hyper-212-led-turbo-cpu.png",
    details: "Cooler Master ha revivido el legendario Hyper 212 EVO con importantes mejoras. Actualizado con un diseño de tubo de calor asimétrico, ahora proporciona un 100% de espacio de RAM para garantizar la compatibilidad entre las placas base. La estatura más fría también se ha acortado, lo que hace que la compatibilidad de la carcasa sea aún mejor. La exclusiva tecnología de contacto directo de Cooler Master, combinada con el nuevo ventilador SickleFlow 120, ofrece el mejor equilibrio entre rendimiento de refrigeración y funcionamiento silencioso. Además, se han mejorado los soportes universales",
    price: 37999,
    categoriesId: [10],
    stock: 9
  },
  { 
    name: "Thermaltake LitePower 450w RGB",
    image: 'https://www.thermaltake.com/pub/media/wysiwyg/key3/db/products/psu/litepower_rgb/main_450_230V.png',
    details: 'La fuente cuenta con las suiguientes protecciones: OVP (Over Voltage Protection) o Protección contra Sobretensión, OPP (Over Power Protection) o Protección contra Sobrecarga, SCP (Short Circuit Protection) o Protección contra Cortocircuito.',
    price: 5000,
    categoriesId: [11],
    stock:9
  },
  { 
    name: 'Thermaltake ToughPower 650w 80 Plus RGB',
    image: 'https://c0.klipartz.com/pngpicture/471/194/sticker-png-pc-power-supply-unit-thermaltake-toughpower-grand-atx-80-plus-power-converters-psu-electronic-device-power-converters-power-supply-power-supply-unit-psu.png',
    details: 'La fuente de alimentación ToughPower de Thermaltake te va a brindar 650W de potencia, avalados además por su certificación de eficiencia 80 Plus Bronze. Vas a poder alimentar todos tus componentes y prácticamente en total silencio gracias a su sistema de ventilación de bajo ruido. Sumado a esto, vas a tener el diseño gamer que querés en tu pc gracias a su sistema de RGB.',
    price: 6000,
    categoriesId: [11]
  },
  { 
    name: 'EVGA 850GQ 850w 80 Plus Gold ',
    image:'https://images.evga.com/products/gallery/png/210-GQ-0850-V1_LG_1.png',
    details: 'MUY SILENCIOSO: La función de modo de EVGA ECO asegura que la fuente de alimentación se mantenga en completo silencio durante cargas bajas a medianas. El ventilador no gira hasta que sea necesario, permitiendo un funcionamiento totalmente silencioso!. RENDIMIENTO INCOMPARABLE: 90% de eficiencia o superior con cargas típicas y condensadores de la más alta calidad de marca japonesa aseguran la fiabilidad a largo plazo. DISEÑO MODULAR: Diseño semi-modular permite sólo utilizar los cables que necesitas, ayudando a mejorar el flujo de aire dentro de la fuente, eliminar los cables innecesarios, y lo mejor de todo, a reducir el desorden de cables.',
    price: 65000,
    categoriesId: [11]
  }
  
];


let categories = [
  {
    name: "Motherboards",
  },
  {
    name: "Procesadores",
  },
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
    name: "Monitores",
  },
  {
    name: "Periferos",
  },
  {
    name: "Gabinetes",
  },
  { 
    name: 'Coolers'
  },
  {
    name: "Fuentes",
  },
  
];



bcrypt.hash("123456", saltRounds, function(err, hash){
  console.log(hash)
})

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

export const productRelations = [
  {
    name:"placa amd baja",
    id:14,
    products:[1, 2, 3, 4 , 11, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27  ],
   },

   {
    name:"placa amd 2 y 3ra",
    id:15,
    products:[1, 2, 3, 4, 5, 6, 9, 10, 11,18, 19, 20, 21, 
      22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39 ],
   },
   {
    name:"placa amd ult",
    id:17,
    products:[1, 2, 3, 4, 5, 6, 10,18, 19, 20, 21, 
      22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39 ],
   },
   {
    name:"placa intel 8 y 9",
    id:24,
    products:[1, 2, 3, 4, 12, 13 ,18, 19, 29, 21, 22, 23,24, 25, 26, 27, 28, 20, 30, 31
    , 33, 34, 35, 36, 37, 38, 39  ],
   },
   {
    name:"placa intel  9",
    id:33,
    products:[1, 2, 3, 4, 12, 13 ,18, 19, 29, 21, 22, 23,24, 25, 26, 27, 28, 20, 30, 31
    , 33, 34, 35, 36, 37, 38, 39  ],
   },
   {
    name:"placa intel  10",
    id:33,
    products:[1, 2, 3, 4, 7, 8, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 
      34, 35, 36, 37, 38, 39  ],
   },

  {
    name:"casos base amd",
    id:5,
    products:[1, 2, 3,4, 5 ,6 ,9 ,10, 11, 14,15,17, 18, 19, 20, 21, 22, 25, 26, 27],
   },
 {
  name:"casos base amd",
  id:5,
  products:[1, 2, 3,4, 5 ,6 ,9 ,10, 11, 14,15,17, 18, 19, 20, 21, 22, 25, 26, 27],
 },
 {
  name:"casos base intel",
  id:7,
  products:[1, 2, 3,4,7, 8 ,12, 13, 16, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30],
 },
 
  {
    name: "1ra a 2ra GEN amd",
    id:30,
    products:[1, 2, 3, 4, 9 ,10, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29]
  },
  {   
    name:"3ra para adelante",
    id:15,
   products:[1, 2, 3, 4, 5, 6, 9 ,10, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29]
  },

  {
    name:"APUS 2da Gen",
    id: 14,
    products:[ 1, 2, 3, 4, 11, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29 ]
  },

  {   
    name:"INTEL 9NA GEN",
    id:24,
    products:[1, 2,3, 4, 12, 13 , 18, 19 ,20, 21, 22, 23, 25, 26, 27, 28, 29]
  },
  {   
    name:"INTEL 10MA GEN",
    id:16,
    products:[1, 2, 3, 4, 7, 8, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29]
  },
]

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

export async function productRelationsSeeder(){
  productRelations.forEach(async (item: any) => {
      let product:any =  await Product.findByPk(item.id);
     
      item.products.forEach(async (item:any) => {
          let currentProduct = await Product.findByPk(item)
      
      await product.addProductCompatibility(currentProduct)
  })



  })
}


export async function getUsers() {
  let users = await User.findAll();
  return users;
}