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
    name: 'Intel i3-8100 4-Cores 3.6Ghz',
    brand: 'Intel',
    image: 'https://pim-media.intel.com/pub-api/v1/imageservice/customize?url=https://www.intel.com/content/dam/products/hero/foreground/processor-box-8th-gen-core-i3-unlocked-1x1.png&height=486&width=864',
    details: '• Cantidad de núcleos 4 • Cantidad de subprocesos 4, • Frecuencia básica del procesador 3,60 GHz,  • Caché 6 MB ,• Velocidad del bus 8 GT/s,  • TDP 65 W',
    price: 11999,
    categoriesId:[2],
    stock: 10
    
  },
  {
    name: 'Intel i7-8700k 6-cores 3.7GHz Base',
    brand: 'Intel',
    image: 'https://www.intel.com/content/dam/products/hero/foreground/processor-box-8th-gen-core-i7-unlocked-1x1.png',
    details: '* 6 cores * Socket LGA1151, * Overcloking Capable, *Intel Hyper-Threading Technology for 12 Way Multitasking, *Intel Turbo Boost Technology 2.0 ,* Intel Smart Cache Technology',
    price: 62.399,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'Intel i3-9100F 4-Cores 4,20Ghz',
    brand: 'Intel',
    image: 'https://compratecno.cl/19458-medium_default/inteli3core32c6ghz44socket-lga1151gen84-hilos6mb-cachecpu36.jpg',
    details: 'Modelo: i3 9100F, Video : No Incluye (necesita placa de video), Estado: Launched, Litografía: 14 nm, Cantidad de núcleos: 4, Cantidad de subprocesos: 4 ,Frecuencia básica del procesador: 3,60GHz, Frecuencia turbo máxima: 4,20 GHz, Caché: 6MB',
    price: 15399,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'Intel i7-9700K 8-Cores 4,9Ghz',
    brand: 'Intel',
    image: 'https://drakemall-files-new.s3.eu-central-1.amazonaws.com/_intel-i-cjqwcyi5b001q01u6xnaumsok.png',
    details: 'Modelo: i7-9700K, -Generación: 9° Gen, -Caché: 12 MB, -Cantidad de núcleos de CPU: 8, -Hilos: 8, -Tipos de memoria RAM soportadas: DDR4-2666, -Cantidad de RAM soportada: 128 GB, -Socket: LGA 1151',
    price: 48399,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'Intel i5-10400f 6-Cores 4,30Ghz',
    brand: 'Intel',
    image: 'https://storage-asset.msi.com/event/2020/mb/intel-z490-promotion/images/intel-core-i7.png',
    details: '- Cantidad de núcleos de CPU : 6, - Hilos : 12, - Tipos de memoria RAM soportadas : DDR4, - Cantidad de RAM soportada : 128 GB, - Socket : LGA 1200, - Frecuencia mínima de reloj : 2,90 GHz, - Frecuencia máxima de reloj : 4,30 GHz, - Desbloqueado para OC : No, - TDP : 65 W',
    price: 20999,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'Intel i3-10100f 4-Cores 4.3Ghz',
    brand: 'Intel',
    image: 'https://vision-techno.com/assets/images/products/279/productLogo.png',
    details: '- Cantidad de núcleos de CPU : 4, - Hilos : 8, - Tipos de memoria RAM soportadas : DDR4, - Cantidad de RAM soportada : 128GB, - Socket : LGA1200, - Frecuencia mínima de reloj : 3,6 GHz, - Frecuencia máxima de reloj : 4,3 GHz, - Desbloqueado para OC : No, - Accesorios incluidos : Air cooler, - TDP : 65 W',
    price: 12099,
    categoriesId:[2],
    stock: 10
  },
  { 
    name: 'AMD Ryzen 7 1700x 8-Cores 3.8Ghz',
    brand: 'AMD',
    image: 'https://www.amd.com/system/files/2020-09/616656-amd-ryzen-7-5000-series-PIB-1260x709_0.png',
    details: 'Especificaciones técnicas: Socket de procesador: AMD AM4, Familia de procesador: AMD Ryzen Processors, Socket Type: AM4, Cache 4 MB/16 MB (L2/L3), Frequency 3.8 GHz Precision Boost ',
    price: 59000,
    categoriesId:[2],
    stock: 10
  },
  { 
    name: 'AMD Ryzen 3 1300x 4-Cores 3.7Ghz ',
    brand: 'AMD',
    image: 'https://www.seekpng.com/png/full/773-7730645_budget-general-purpose-amd-ryzen-3-box.png',
    details: 'AMD Ryzen™ 3 1300X, Specifications: # de núcleos de CPU 4, # de hilos 4, Reloj base 3.5GHz, Reloj de aumento máx. Hasta 3.7GHz, Caché L1 total 384KB, Caché L2 total 2MB, Caché L3 total 8MB, Desbloqueados: Sí',
    price: 13099,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'AMD Ryzen 3 2200G 4-Cores 3.7Ghz',
    brand: 'AMD',
    image: 'https://www.seekpng.com/png/full/773-7730645_budget-general-purpose-amd-ryzen-3-box.png',
    details: 'Jugá sin necesidad de una placa de vide externa! Corre todo, incluso los juegos AAA(en 720p 30fps), solo asegurate de que tengas RAM en dual channel(y si es rapida mejor!)',
    price: 24099,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'AMD Ryzen 5 2600x 6-Cores 4.2Ghz',
    brand: 'AMD',
    image: 'https://www.amd.com/system/files/11157-ryzen-5-pib-left-facing-1260x709.png',
    details: 'AMD Ryzen™ 3 1300X: Specifications: # de núcleos de CPU 4, # de hilos 4, Reloj base 3.5GHz, Reloj de aumento máx. Hasta 3.7GHz, Caché L1 total 384KB, Caché L2 total 2MB, Caché L3 total 8MB, Desbloqueados Sí',
    price: 26000,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'AMD Ryzen 7 2700x 8-Cores 4.3Ghz ',
    brand: 'AMD',
    image: 'https://www.amd.com/system/files/2020-09/616656-amd-ryzen-7-5000-series-PIB-1260x709_0.png',
    details: ' // 8 Cores/16 Threads UNLOCKED // Frequency: 4.3 GHz Max Boost // Compatibility : Windows 10 64 Bit Edition , RHEL x86 64 Bit , Ubuntu x86 64 Bit // 20MB of Combined Cache // Socket AM4 Motherboard Required //',
    price: 51999,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'AMD Ryzen 3 3100 4-Cores 3.9Ghz',
    brand: 'AMD',
    image: 'https://www.seekpng.com/png/full/773-7730645_budget-general-purpose-amd-ryzen-3-box.png',
    details: 'Specifications: # de núcleos de CPU 4, # de hilos 4, Reloj base 3.5GHz, Reloj de aumento máx. Hasta 3.9GHz, Caché L1 total 384KB, Caché L2 total 2MB, Caché L3 total 8MB, Desbloqueados No',
    price: 24999,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'AMD Ryzen 5 3600x 6-Cores 4.4Ghz',
    brand: 'AMD',
    image: 'https://www.amd.com/system/files/11157-ryzen-5-pib-left-facing-1260x709.png',
    details: 'Specifications: # de núcleos de CPU 6, # de hilos 6, Reloj base 3.5GHz, Reloj de aumento máx. Hasta 4.4 GHz, Caché L1 total 384KB, Caché L2 total 2MB, Caché L3 total 8MB, Desbloqueados No',
    price: 37399,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'AMD Ryzen 7 3700x 8-Cores 4.4Ghz',
    brand: 'AMD',
    image: 'https://www.amd.com/system/files/2020-09/616656-amd-ryzen-7-5000-series-PIB-1260x709_0.png',
    details: '// 8 Cores/16 Threads UNLOCKED // Frequency: 4.4 GHz Max Boost // Compatibility : Windows 10 64 Bit Edition , RHEL x86 64 Bit , Ubuntu x86 64 Bit // 20MB of Combined Cache // Socket AM4 Motherboard Required //',
    price: 43999,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'AMD Ryzen 9 3900x 12-Core 4.6Ghz',
    brand: 'AMD',
    image: 'https://www.amd.com/system/files/2020-09/616656-amd-ryzen-9-5000-series-PIB-1260x709_0.png',
    details: '// 8 Cores/16 Threads UNLOCKED // Frequency: 4.6 GHz Max Boost // Compatibility : Windows 10 64 Bit Edition , RHEL x86 64 Bit , Ubuntu x86 64 Bit // 20MB of Combined Cache // Socket AM4 Motherboard Required //',
    price: 77999,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'AMD Ryzen 9 3950x 16-Core @4.7Ghz',
    image: 'https://www.amd.com/system/files/2020-09/616656-amd-ryzen-9-5000-series-PIB-1260x709_0.png',
    details: '// 12 Cores/32 Threads UNLOCKED // Frequency: 4.7 GHz Max Boost // Compatibility : Windows 10 64 Bit Edition , RHEL x86 64 Bit , Ubuntu x86 64 Bit // 20MB of Combined Cache // Socket AM4 Motherboard Required //',
    brand: 'AMD',
    price: 106999,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'AMD Ryzen 5 5600x 6-Core @4.6Ghz',
    image: 'https://www.amd.com/system/files/11157-ryzen-5-pib-left-facing-1260x709.png',
    details:'// 6 Cores/12 Threads UNLOCKED // Frequency: 4.6 GHz Max Boost // Compatibility : Windows 10 64 Bit Edition , RHEL x86 64 Bit , Ubuntu x86 64 Bit // 20MB of Combined Cache // Socket AM4 Motherboard Required //',
    brand: 'AMD',
    price: 41999,
    categoriesId:[2],
    stock: 10
  },
  {
    name: 'AMD APU A-6 7480 2-Cores 3.5 GHz',
    brand: 'AMD',
    details: '// 2 Cores/2 Threads LOCKED // Frequency: 3.5 GHz Max Boost // Compatibility : Windows 10 64 Bit Edition , RHEL x86 64 Bit , Ubuntu x86 64 Bit // 20MB of Combined Cache // Socket FM2 Motherboard Required //',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81-NpR0VO1L._AC_SL1500_.jpg',
    price: 5500,
    categoriesId:[2],
    stock: 10
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
    image:"https://images-na.ssl-images-amazon.com/images/I/81-NpR0VO1L._AC_SL1500_.jpg",
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
  "https://lellinsumos.com.ar/wp-content/uploads/2020/10/2017-10-12-product.png",
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
    name: "ASUS ROG Maximus XII FORMULA Motherboard Socket 1200 Chipset z490",
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
    name: "MOTHERBOARD GIGABYTE H310M M2 S1151  ",
    image:"https://www.venex.com.ar/products_images/1600525254_2019010916232309_big.png",
    brand: "GIGABYTE",
    details:
      "  Las placas base de GIGABYTE utilizan condensadores de audio de alta gama. Estos condensadores de alta calidad ayudan a ofrecer audio de alta resolución y alta fidelidad para proporcionar los efectos de sonido más realistas para los jugadores.      ",
    price: 8700,
    categoriesId: [1],
    stock: 2,
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
    image: "https://www.cclink.cl/wp-content/uploads/2017/09/20MP38HQ-1-600x600.png",
    brand: "LG",
    details:
      "La tecnología IPS mejora el rendimiento de las pantallas de cristal líquido. Reducción del tiempo de respuesta, mejora de la reproducción del color, y el usuario puede ver la pantalla desde prácticamente cualquier ángulo.",
    price: 21999,
    categoriesId: [6],
    stock: 7,
  },
  {
    name: "DISCO SOLIDO SSD M.2 250 GB KINGSTON SATA III A2000        ",
    image:
      "https://asiatech.com.mm/wp-content/uploads/2020/08/Kingston-250GB-A2000-NVMe-SSD.png",
    brand: "Kingston",
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
      "https://tienda.itarrow.cl/wp-content/uploads/2020/09/hyperx-fury-rgb-16gb-2.png",
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
      "https://www.siliconweek.com/wp-content/uploads/2017/01/dartfrogrgb.png",
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
      "https://img.gigatron.rs/img/products/large/image5d9ae89be632e.png",
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
    brand:"SteelSeries",
    details:
      "El software SteelSeries Engine desbloquea un impresionante arsenal de aplicaciones de motor que hacen que la personalización sea fácil e intuitiva.",
    price: 16969,
    categoriesId: [7],
    stock: 7,
  },
  {
    name: "Monitor curvo MSI Optix G27C led 27  negro 100V/240V",
    image:
      "https://asset.msi.com/global/picture/images/monitor/Gaming_monitor.png",
    brand: "MSI",
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
    brand: "Vengeance",
    details:
      "Su capacidad de 16 GB distribuida en módulos de 2 x 8 GB hace de esta memoria un soporte ideal para trabajos con aplicaciones de diseño o edición, juegos exigentes, contenidos multimedia, entre otros. A su vez, la distribución de la capacidad total en dos módulos iguales te permitirá maximizar tus posibilidades de uso.",
    price: 13490,
    categoriesId: [4],
    stock: 8,
  },
  {
    name: 'Gabinete Corsair Carbide SPEC-04 Mid-Tower Black/Red',
    brand: 'Corsair',
    image: 
      "https://www.corsair.com/medias/sys_master/images/images/hc3/h10/8846743502878/-CC-9011107-WW-Gallery-Spec-04-Red-001.png",
    details: 
      "Ventana de cristal templado y diseño exterior anguloso. El diseño asimétrico aporta un aspecto atrevido.Anclajes y abrazaderas para cables. Oculte los cables detrás de la bandeja de la placa base para conseguir un aspecto organizado y apartado del flujo de aire para mejorar la refrigeración. Espacio para cinco ventiladores de 120 mm. Potencial de refrigeración excelente con un ventilador frontal de 120 mm preinstalado. Amplio almacenamiento. Bastidores para tres unidades HDD y dos SSD de instalación sencilla para conseguir un aspecto organizado del sistema y los cables. Panel lateral de E/S limpio. Con un puerto USB 3.0 de alta velocidad y puertos adicionales para todo tipo de conexiones modernas.",
    price: 12816,
    categoriesId: [8],
    stock: 10
  },
  { 
    name: 'Gabinete Thermaltake Core V21 Mini-ITX',
    brand: 'Thermaltake',
    image: 
      "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/e4fc6e308b66431a310dcd4dc0838059/n/n/nnnv21_tuf_1.png",
    details: 
      "Thermaltake Core V21 SPCC Micro ATX, chasis de caja de computadora para juegos Mini ITX Cube, construcción de factor de forma pequeño, ventilador frontal de 200 mm preinstalado",
    price: 29899,
    categoriesId: [8],
    stock: 10
  },
  { 
    name: 'Gabinete Cooler Master MasterCase H500',
    brand: 'Cooler Master',
    image: 
      "https://www.cyberpowersystem.co.uk/template/common/page/DesktopGamingPC/CoolerMasterGamingCases/images/case3.png",
    details: 
      "DISEÑO INCREÍBLE: Panel frontal transparente y de malla Ventiladores ARGB dobles de 200 mm Sistema de iluminación ARGB. Panel lateral de vidrio templado. EL RENDIMIENTO VIENE EN PARES: Dos paneles frontales, dos ventiladores ARGB de 200 mm y un asa para agarrarse cuando la adrenalina entra en juego . El MasterCase H500 se establece como el chasis de referencia para un flujo de aire de alto rendimiento. Ahora, con ventiladores ARGB de 200 mm, su legado se actualiza con iluminación premium. PANELES TRANSPARENTES Y DE MALLA INCLUIDOS: Cada elección de paneles frontales decide si la construcción sobresaldrá en un rendimiento de flujo de aire despiadado o una estética llamativa. Por supuesto, la malla es la opción ideal para proporcionar a los ventiladores preinstalados grandes volúmenes de aire fresco. El panel transparente, por otro lado, desfila a esos fanáticos en una vista cristalina.",
    price: 16999,
    categoriesId: [8],
    stock: 10
  },
  { 
    name: "Water Cooler Be Quiet! Pure Loop 120mm",
    brand: 'beQuiet!',
    image: "https://cdn-reichelt.de/bilder/web/xxl_ws/E200/BQT_BW005_01.png",
    details: "Muy alto rendimiento de refrigeración. Con Pure Loop, incluso las aplicaciones más exigentes se pueden utilizar de forma fiable. Una inmensa potencia de refrigeración proporciona bajas temperaturas, incluso durante períodos de máximo rendimiento de la CPU. Fans de Pure Wings 2: El ventilador Pure Wings 2 de 4.724 in proporciona un funcionamiento muy silencioso y un alto rendimiento de refrigeración. Sus nueve aspas de ventilador optimizadas para flujo de aire hacen de Pure Wings 2 el ventilador ideal para el radiador de aluminio de Pure Loop.",
    price: 41999,
    categoriesId: [10],
    stock: 9
  },
  { 
    name: "Cooler beQuiet! Dark Rock Pro 4",
    brand: 'beQuiet!',
    image: "https://cdn-reichelt.de/bilder/web/xxl_ws/E200/BEQUIET_BK023-01.png",
    details: "Potencia de enfriamiento inmensa: No hay limitaciones en silencio y rendimiento para sistemas overclocked y aplicaciones gráficas exigentes. Dark Rock Pro 4 proporciona una impresionante calificación de TDP de 250W y alcanza bajas temperaturas incluso durante períodos de máximo rendimiento de la CPU. Diseño altamente avanzado. Dark Rock Pro 4 está equipado con siete tubos de calor de cobre de 0.236 in de tecnología avanzada que maximizan la conductancia del calor. Las aletas de enfriamiento optimizadas por el flujo de aire con pequeños puntos en sus superficies aumentan la circulación del aire. El revestimiento negro especial con partículas de cerámica hace posible una transferencia perfecta del calor.",
    price: 37999,
    categoriesId: [10],
    stock: 9
  },
  { 
    name: "Cooler CoolerMaster Hyper 212 EVO LED",
    brand: 'Cooler Master',
    image: "https://www.armytech.com.ar/Image/0/450_450-evo_rgb_4.png",
    details: "Cooler Master ha revivido el legendario Hyper 212 EVO con importantes mejoras. Actualizado con un diseño de tubo de calor asimétrico, ahora proporciona un 100% de espacio de RAM para garantizar la compatibilidad entre las placas base. La estatura más fría también se ha acortado, lo que hace que la compatibilidad de la carcasa sea aún mejor. La exclusiva tecnología de contacto directo de Cooler Master, combinada con el nuevo ventilador SickleFlow 120, ofrece el mejor equilibrio entre rendimiento de refrigeración y funcionamiento silencioso. Además, se han mejorado los soportes universales",
    price: 37999,
    categoriesId: [9],
    stock: 9
  },
  { 
    name: "Thermaltake LitePower 450w RGB",
    brand: 'Thermaltake',
    image: 'https://www.thermaltake.com/pub/media/wysiwyg/key3/db/products/psu/litepower_rgb/main_450_230V.png',
    details: 'La fuente cuenta con las suiguientes protecciones: OVP (Over Voltage Protection) o Protección contra Sobretensión, OPP (Over Power Protection) o Protección contra Sobrecarga, SCP (Short Circuit Protection) o Protección contra Cortocircuito.',
    price: 5000,
    categoriesId: [10],
    stock:9
  },
  { 
    name: 'Thermaltake ToughPower 850w 80 Plus RGB',
    brand: 'Thermaltake',
    image: 'https://www.thermaltake.com/pub/media/wysiwyg/key3/db/products/PSU/tppf1/pic1_850a.png',
    details: 'La fuente de alimentación ToughPower de Thermaltake te va a brindar 850W de potencia, avalados además por su certificación de eficiencia 80 Plus Bronze. Vas a poder alimentar todos tus componentes y prácticamente en total silencio gracias a su sistema de ventilación de bajo ruido. Sumado a esto, vas a tener el diseño gamer que querés en tu pc gracias a su sistema de RGB.',
    price: 6000,
    categoriesId: [10],
    stock: 10
  },
  { 
    name: 'EVGA 850GQ 850w 80 Plus Gold ',
    brand: 'EVGA',
    image:'https://images.evga.com/products/gallery/png/210-GQ-0850-V1_LG_1.png',
    details: 'MUY SILENCIOSO: La función de modo de EVGA ECO asegura que la fuente de alimentación se mantenga en completo silencio durante cargas bajas a medianas. El ventilador no gira hasta que sea necesario, permitiendo un funcionamiento totalmente silencioso!. RENDIMIENTO INCOMPARABLE: 90% de eficiencia o superior con cargas típicas y condensadores de la más alta calidad de marca japonesa aseguran la fiabilidad a largo plazo. DISEÑO MODULAR: Diseño semi-modular permite sólo utilizar los cables que necesitas, ayudando a mejorar el flujo de aire dentro de la fuente, eliminar los cables innecesarios, y lo mejor de todo, a reducir el desorden de cables.',
    price: 65000,
    categoriesId: [10],
    stock: 10
  },
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
    stock: 10,
  },
  {
    name: "Headset Logitech G Series G432",
    image:
      "https://zock-around-the-clock.com/wp-content/uploads/2019/02/high-resolution-png-g935wireless7.1rgbgamingheadset3-4frontcord-353624-1-e1549902249853.png",
    brand: "Logitech",
    details:
      "¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los Logitech G432 no te perdés ningún detalle y escuchás el audio tal y como fue diseñado por los creadores.",
    price: 7999,
    categoriesId: [7],
    stock: 10,
  },
  {
    name: "WD BLACK SSD NVMe M.2  2TB ",
    image: 'https://shop.westerndigital.com/content/dam/store/en-us/assets/products/internal-storage/wd-black-sn750-nvme-ssd/gallery/with-heatsink/wd-black-sn750-nvme-ssd-flat.png',
    brand: 'Western Digital',
    details: 'Este SSD, por su conectividad PCI-E llega a una velocidad máxima de lectura/escritura de 3400MB/s, todos tus juegos cargarán a maxima velocidad. Incluye disipador para lidiar por el calor que generan las altas velocidades.',
    price: 86999,
    categoriesId: [5],
    stock: 10
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
    name: "Perifericos",
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
    /*
      AMD FM2
      AMD 1ra a 2da
      AMD 3ra a 5ta
      Intel 8va
      Intel 9na
      Intel 10ma
    */

  
    name:"AMD FM2 ",
    id:28,
    products:[25, 18, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
   },
   {
    name:"AMD 1ra y 2da",
    id:29,
    products:[7, 8, 9, 10, 11, 23, 24, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
   },
   {
    name:"AMD 3ra a 5ta",
    id:31,
    products:[12, 13, 14, 15, 16, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
   },
   {
    name:"Intel 8va y 9na",
    id:32,
    products:[1, 2, 3, 4, 26, 27, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
   },
   {
    name:"Intel 10ma",
    id:30,
    products:[5, 6, 21, 22, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
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