import Sequelize from "sequelize";
import { Category } from "../models/Category"
import { Product } from "../models/Product"
import db from "../models"

let categorie = [{name:"Placas de Video AMD"}, {name:"Placas de Video GeForce"}]


//Opcion, agregarle prop category a cada obj product y filtrar desde ahi

let products = [
    {
        name: 'Headset Redragon H220 THEMIS',
        image: 'https://cdn.shopify.com/s/files/1/2695/9506/products/H220-1_headset_250x250@2x.png?v=1582614574',
        brand: 'Redragon',
        details: 'Un auricular con un sonido brillante y claro, con una estructura liviana y cómoda, el Themis es un auricular pensado para jugar cómodamente. -Sonido:Este auricular, posee un claro sonido estéreo con ficha Jack 3.5 mm, garantizan la mejor calidad de sonido en nuestros diafragmas de 50mm con imanes de neodimio, ideales en la construcción de periféricos de sonido. -Micrófono: Integrado en la estructura de las copas, construido sobre un brazo rebatible y captación omnidireccional.',
        price: 2099,
        categoriesId: 5
    }, 
    {
        name:'Headset Logitech G Series G432',
        image:'https://www.hardware-journal.de/images/Bilder/2019/News/Logitech-G/G935-lightsync-wireless-G635-G432-7-1-surround-G332-Stereo/logitech-g432-gaming-headset-7-1.png',
        brand: 'Logitech',
        details: '¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los Logitech G432 no te perdés ningún detalle y escuchás el audio tal y como fue diseñado por los creadores.',
        price: 7999,
        categoriesId: 5
    }, 
    {
        name: 'AMD Ryzen 9 5900X 12-Core Processor',
        image:'https://www.pctechreviews.com.au/wp-content/gallery/ryzen_5900x_main/AMD-Ryzen-5000-Series-Ryzen-9.png',
        brand:'AMD',
        details:"El procesador que ofrece la mejor experiencia de juego del mundo. 12 núcleos para potenciar la experiencia de juego, la transmisión en vivo y mucho más. Diseña más rápido. Procesa más rápido. Itera más rápido. Crea más y más rápido con los procesadores AMD Ryzen. 12 Núcleos de CPU, Velocidad base 3.7GHz, Velocidad Máxima 4.8GHz.",
        price: 76499,
        categoriesId: 8
    },
    {
        name:'AMD Ryzen 7 5800X 8-Core Processor',
        image:'https://matrixwarehouse.co.za/wp-content/uploads/2020/11/AMD-Ryzen-7-5800X-Desktop-Processor.png',
        brand: 'AMD',
        details: 'Procesador de gama alta de AMD. 8 Núcleos y 16 hilos. Velocidad Base de 3.8GHz, Velocidad Máxima de 4.7GHz. Compatible con Socket AM4(Chipset B550 o mejor)',
        price: 55399,
        categoriesId: 8
    },
    {
        
        name:'Intel i9 10900k 10-Core Processor',
        image:'https://storage-asset.msi.com/event/2020/mb/intel-z490-promotion/images/intel-core-i9.png',
        brand: 'Intel',
        details: 'Procesador Tope de gama de Intel. 10 núcleos, 20 hilos. Corre absolutamente todo. Velocidad base de 3.7GHz, Velocidad Máxima de 5.3GHz. Compatible con Socket LGA 1200. Viene con GPU Integrada Intel HD Graphics 630',
        price: 58399,
        categoriesId: 8
    }, 
    {
        name:'Intel i7 10700k 8-Core Processor',
        image:'https://nanotroniconline.com/wp-content/uploads/2020/08/procesador-inte-core-i7-10700-nanotronic.png',
        brand: 'Intel',
        details: 'Procesador gama alta de Intel. 8 núcleos, 16 hilos. Corre absolutamente todo. Velocidad base de 3.8GHz, Velocidad Máxima de 5.1GHz. Compatible con Socket LGA 1200. Viene con GPU Integrada Intel HD Graphics 630',
        price: 48799,
        categoriesId: 8
    }, 
    {
        name:'AMD Radeon PowerColor RX 6900XT Red Devil',
        image:'https://www.powercolor.com/_upload/images//2012071505360.png',
        brand: 'PowerColor',
        details: 'Placa de video tope de gama de AMD. Velocidad base 1.8GHz, Velocidad Máxima 2.3GHz. 16 GB de memoria GDDR6. Corre todo en 4k a 60 fps, o 1080p 144fps.',
        price: 500000,
        categoriesId: 1
    }, 
    {
        name:'AMD Radeon PowerColor RX 6800XT Red Devil',
        image:'https://www.powercolor.com/_upload/images//2011251047440.png',
        brand: 'PowerColor',
        details: 'Placa de video gama alta de AMD. Velocidad base de 1.8GHz, Velocidad Máxima de 2.3GHz. 16GB de memoria GDDR6. Requiere una fuente de 750W.',
        price: 450000,
        categoriesId: 1
    }, 
    {
        name:'ASUS GeForce RTX 3090 ROG Strix',
        image:'https://dlcdnwebimgs.asus.com/gain/1F10387D-A3D0-41EC-A583-E19A1DE394EE/w1000/h732',
        brand: 'ASUS',
        details: 'Placa de video tope de gama de NVIDIA. Velocidad base de 1.4GHz, Velocidad Máxima de 1.7GHz. 24GB de memoria GDDR6X. Requiere una fuente de 750W. Corre todo a 4k 60 fps, o 1080p 144fps',
        price: 600000,
        categoriesId: 2
    }, 
    {
        name:'ASUS GeForce RTX 3080 ROG Strix',
        image:'https://dlcdnwebimgs.asus.com/gain/44A520BD-D8B0-47E7-952A-1AE2973C9168/w1000/h732',
        brand: 'ASUS',
        details: 'Placa de video gama alta de NVIDIA. Velocidad base de 1.4GHz, Velocidad Máxima de 1.7GHz. 10GB de memoria GDDR6X. Requiere una fuente de 750W. Corre todo a 4k 60 fps, o 1080p 144fps',
        price: 550000,
        categoriesId: 2
    },
    {
        name:'ASUS ROG Maximus XII FORMULA Motherboard Socket 1200 Chipset z49',
        image:'https://http2.mlstatic.com/D_NQ_NP_817933-MLA43683744310_102020-O.webp',
        brand: 'ASUS',
        details: 'Placa madre tope de gama ASUS, con socket LGA 1200, compatible con lo mejor de Intel. Wi-Fi 6(.ax) incluido. Tres ranuras M.2. Disipadores gigantes para VRM, chipset y sockets M2. Ethernet 10gb incluido. Compatible con Thunderbolt y conectores USB 3.2 incluidos.',
        price: 72999,
        categoriesId: 8
    }, 
    {
        name:'ASUS ROG Strix Chipset x570 Socket AM4',
        image:'https://avadirect-freedomusainc1.netdna-ssl.com/Pictures/Big/12858027_1.png',
        brand: 'ASUS',
        details: 'Placa madre tope de gama ASUS, con socket AM4, compatible con lo mejor de AMD. Wi-Fi 6(.ax) incluido. Tres ranuras M.2. Disipadores gigantes para VRM, chipset y sockets M2. Ethernet 10gb incluido. Conectores USB 3.2 incluidos.',
        price: 57999,
        categoriesId: 7
    },
    {
        name:'TECLADO HYPERX ALLOY FPS PRO BLUE MECANICO ENG',
        image:"https://www.venex.com.ar/products_images/1557923094_hxproductkeyboardalloyproru1zmlg.jpg",
        brand: 'HyperX',
        details:"HyperX ™ Alloy FPS y Alloy FPS Pro  son teclados diseñados para brindar durabilidad, confiabilidad y precisión. Con su diseño compacto, su sólido marco de acero y sus interruptores de llave CHERRY® MX, la familia de teclados Alloy FPS es perfecta para el juego serio de FPS. Ya sea que prefiera el diseño magro y medio sin llave (TKL) del Alloy FPS Pro o el Alloy FPS de tamaño completo, ambos modelos cuentan con retroiluminación roja dinámica de HyperX, 100% Anti-Ghosting, reinicio de N-key y Modo de juego. Obtenga el equipo en el que confían los profesionales y prepárese con un teclado HyperX Alloy FPS hoy.",
        price: 7649,
        categoriesId: 5
    },

    {
        name:'TECLADO REDRAGON K580 VATA PRO RGB ESP',
        image:"https://www.venex.com.ar/products_images/1607012571_k5801512x512.png",
        brand: 'Redragon',
        details:"Un modelo pensado para ser compacto, con extras que te ayudarán en tus partidas y con el uso normal, y con el estilo de Redragon.",        
         price: 7490,
        categoriesId: 5
    },
    {
        name:"MONITOR 19 LED PHILIPS 193V5LHSB2/55 HDMI",
        image:"https://www.venex.com.ar/products_images/1585889887_monitor_19_led_philips_193v5lhsb2_55_hdmi.jpg",
        brand: 'Philips',
        details:"Un dispositivo HDMI Ready que tiene todo el hardware necesario para admitir una entrada de interfaz multimedia de alta definición (HDMI). El cable HDMI permite la transmisión de audio y video digital de alta calidad con un solo cable desde una computadora o una fuente AV (como los sintonizadores, reproductores de DVD, receptores de A/V y cámaras de video).",        
         price: 13999,
        categoriesId: 6
    },
    {
        name:'MONITOR 24 LED LG 24GL600F FHD 1MS ULTRAGEAR 144HZ',
        image:"https://www.venex.com.ar/products_images/1569609030_53214.png",
        brand: 'LG',
        details:"Expandí tus límites y llevá más allá tu nivel de juego. El monitor LG UltraGear de 24 te permite visualizar tu juego a 144Hz/s con un tiempo de respuesta de 1Ms. Incluye FreeSync",        
        price: 39000,
        categoriesId: 6
    },
    {
        name:'DISCO SOLIDO SSD 120 GB GIGABYTE SATA III GP-GSTF',
        image:"https://www.venex.com.ar/products_images/1537278903_2018070417395493_big.png",
        brand: 'GYGABYTE',
        details:"Además de ser más fiable y duradera que un disco duro, la calidad de Gigabyte en SSDs incorpora una memoria Flash.",        
        price: 3299,
        categoriesId: 3
    },
    {
        name:'DISCO DURO HDD 1 TB WD SATA III 64MB/S BLUE        ',
        image:"https://http2.mlstatic.com/D_NQ_NP_634927-MLA40150880523_122019-O.webp",
        brand: 'WESTERN',
        details:"Si estás buscando un disco duro para mejorar el rendimiento de tu equipo, el Western Digital WD10EZEX es lo que necesitás. Su practicidad y durabilidad operativa respecto a otros tipos de discos marcan la diferencia.        ",        
        price: 4999,
        categoriesId: 3
    },
    {
        name:'MEMORIA RAM DDR4 8GB 2666MHZ HYPERX FURY RGB',
        image:"https://www.venex.com.ar/products_images/1585853723_ddr4_8gb_2666mhz_rgb_hyperxfury.jpg",
        brand: 'HYPERX',
        details:"Rendimiento y estilo con velocidades de alta capacidad, un estilo agresivo e iluminación RGB que recorre la longitud del módulo para lograr efectos de iluminación suaves y sorprendentes. FURY DDR4 RGB es compatible con Intel XMP. Para tus juegos, edición de vídeo y renderización es la mejor opción. Cuenta con overclocking automático de Plug N Play  y es compatible con las últimas CPU Intel y AMD. Probada al 100 % a altas velocidades y respaldada por una garantía de por vida, la memoria FURY DDR4 RGB es tu opción de actualización rentable y sin preocupaciones.",        
        price: 6799,
        categoriesId: 2
    },
    {
        name:'Memoria Adata DDR4 16GB 2666MHz SODIMM tipo Notebook ',
        image:"https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_13761_Memoria_Adata_DDR4_16GB_2666MHz_SODIMM_tipo_Notebook_38c2e2af-grn.jpg",
        brand: 'ADATA',
        details:"Memoria RAM para notebook, acelera y mejora el rendimiento de la misma.",        
        price: 7900,
        categoriesId: 2
    },


]



let categories = [
    {
        name: 'Placas de Video',
    }, 
    {
        name: 'Memorias Ram',
    },
    {
        
        name:'Almacenamiento',
    }, 
    {
        name:'Mothersboard',
    }, 
    {
        name: 'Perifericos',
    }, 
    {
        name: 'Monitores y pantallas',
    }, 
    {
        name: 'Web-Cam',
    }, 
    {
        name: 'Procesadores',
    }, 
]

export function categoriesSeeder() {
    categories.forEach((item: any) => {
        Category.create({
            name: item.name,
    })
    })
}
    export function productsSeeder() {
    products.forEach((item: any) => {
        Product.create({
            name: item.name,
            brand: item.brand,
            price: item.price,
            image: item.image,
            details: item.details,
            categoriesId: item.categoriesId     
    }).then(productCreated => productCreated.setCategories([productCreated.categoriesId]))})}
