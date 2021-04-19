
import { Category } from "../models/Category"
import { Product } from "../models/Product"
import { User } from "../models/User";
import { v4 as uuid } from 'uuid';

let categorie = [{name:"Placas de Video AMD"}, {name:"Placas de Video GeForce"}]


//Opcion, agregarle prop category a cada obj product y filtrar desde ahi

let products = [
    {
        name: 'Headset Redragon H220 THEMIS',
        image: 'https://cdn.shopify.com/s/files/1/2695/9506/products/H220-1_headset_250x250@2x.png?v=1582614574',
        brand: 'Redragon',
        details: 'Un auricular con un sonido brillante y claro, con una estructura liviana y cómoda, el Themis es un auricular pensado para jugar cómodamente. -Sonido:Este auricular, posee un claro sonido estéreo con ficha Jack 3.5 mm, garantizan la mejor calidad de sonido en nuestros diafragmas de 50mm con imanes de neodimio, ideales en la construcción de periféricos de sonido. -Micrófono: Integrado en la estructura de las copas, construido sobre un brazo rebatible y captación omnidireccional.',
        price: 2099,
        categoriesId: [7]
    }, 
    {
        name:'Headset Logitech G Series G432',
        image:'https://www.hardware-journal.de/images/Bilder/2019/News/Logitech-G/G935-lightsync-wireless-G635-G432-7-1-surround-G332-Stereo/logitech-g432-gaming-headset-7-1.png',
        brand: 'Logitech',
        details: '¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los Logitech G432 no te perdés ningún detalle y escuchás el audio tal y como fue diseñado por los creadores.',
        price: 7999,
        categoriesId: [7]
    }, 
    {
        name: 'AMD Ryzen 9 5900X 12-Core Processor',
        image:'https://www.pctechreviews.com.au/wp-content/gallery/ryzen_5900x_main/AMD-Ryzen-5000-Series-Ryzen-9.png',
        brand:'AMD',
        details:"El procesador que ofrece la mejor experiencia de juego del mundo. 12 núcleos para potenciar la experiencia de juego, la transmisión en vivo y mucho más. Diseña más rápido. Procesa más rápido. Itera más rápido. Crea más y más rápido con los procesadores AMD Ryzen. 12 Núcleos de CPU, Velocidad base 3.7GHz, Velocidad Máxima 4.8GHz.",
        price: 76499,
        categoriesId: [8]
    },
    {
        name:'AMD Ryzen 7 5800X 8-Core Processor',
        image:'https://matrixwarehouse.co.za/wp-content/uploads/2020/11/AMD-Ryzen-7-5800X-Desktop-Processor.png',
        brand: 'AMD',
        details: 'Procesador de gama alta de AMD. 8 Núcleos y 16 hilos. Velocidad Base de 3.8GHz, Velocidad Máxima de 4.7GHz. Compatible con Socket AM4(Chipset B550 o mejor)',
        price: 55399,
        categoriesId: [8]
    },
    {
        
        name:'Intel i9 10900k 10-Core Processor',
        image:'https://storage-asset.msi.com/event/2020/mb/intel-z490-promotion/images/intel-core-i9.png',
        brand: 'Intel',
        details: 'Procesador Tope de gama de Intel. 10 núcleos, 20 hilos. Corre absolutamente todo. Velocidad base de 3.7GHz, Velocidad Máxima de 5.3GHz. Compatible con Socket LGA 1200. Viene con GPU Integrada Intel HD Graphics 630',
        price: 58399,
        categoriesId: [8]
    }, 
    {
        name:'Intel i7 10700k 8-Core Processor',
        image:'https://nanotroniconline.com/wp-content/uploads/2020/08/procesador-inte-core-i7-10700-nanotronic.png',
        brand: 'Intel',
        details: 'Procesador gama alta de Intel. 8 núcleos, 16 hilos. Corre absolutamente todo. Velocidad base de 3.8GHz, Velocidad Máxima de 5.1GHz. Compatible con Socket LGA 1200. Viene con GPU Integrada Intel HD Graphics 630',
        price: 48799,
        categoriesId: [8]
    }, 
    {
        name:'AMD Radeon PowerColor RX 6900XT Red Devil',
        image:'https://www.powercolor.com/_upload/images//2012071505360.png',
        brand: 'PowerColor',
        details: 'Placa de video tope de gama de AMD. Velocidad base 1.8GHz, Velocidad Máxima 2.3GHz. 16 GB de memoria GDDR6. Corre todo en 4k a 60 fps, o 1080p 144fps.',
        price: 500000,
        categoriesId: [1]
    }, 
    {
        name:'ASUS GeForce RTX 3090 ROG Strix',
        image:'https://dlcdnwebimgs.asus.com/gain/1F10387D-A3D0-41EC-A583-E19A1DE394EE/w1000/h732',
        brand: 'ASUS',
        details: 'Placa de video tope de gama de NVIDIA. Velocidad base de 1.4GHz, Velocidad Máxima de 1.7GHz. 24GB de memoria GDDR6X. Requiere una fuente de 750W. Corre todo a 4k 60 fps, o 1080p 144fps',
        price: 600000,
        categoriesId: [1]
    }, 
    {
        name:'ASUS ROG Maximus XII FORMULA Motherboard Socket 1200 Chipset z49',
        image:'https://www.asus.com/microsite/motherboard/Intel-Z490/nl/img/products/m12h_wifi.png',
        brand: 'ASUS',
        details: 'Placa madre tope de gama ASUS, con socket LGA 1200, compatible con lo mejor de Intel. Wi-Fi 6(.ax) incluido. Tres ranuras M.2. Disipadores gigantes para VRM, chipset y sockets M2. Ethernet 10gb incluido. Compatible con Thunderbolt y conectores USB 3.2 incluidos.',
        price: 72999,
        categoriesId: [4]
    }, 
    {
        name:'ASUS ROG Strix Chipset x570 Socket AM4',
        image:'https://avadirect-freedomusainc1.netdna-ssl.com/Pictures/Big/12858027_1.png',
        brand: 'ASUS',
        details: 'Placa madre tope de gama ASUS, con socket AM4, compatible con lo mejor de AMD. Wi-Fi 6(.ax) incluido. Tres ranuras M.2. Disipadores gigantes para VRM, chipset y sockets M2. Ethernet 10gb incluido. Conectores USB 3.2 incluidos.',
        price: 57999,
        categoriesId: 4
    },
    {
        name:'Teclado Redragon YAMA K550 Black RGB Mecánico Switch Purple',
        image:'https://www.sepuls.cl/wp-content/uploads/2020/04/REDDRAGON-YAMA-K550-BLACK2.png',
        details:'Este teclado en español tiene todo lo necesario: Marco sólido de aluminio para proveer durabilidad y estabilidad, rueda para controlar el volumen de aluminio y multimedia dedicadas, puerto adicional USB 2.1 Pass Through ubicado en la parte posterior del teclado, reposamuñecas desmontable y 12 teclas G completamente configurables.',
        price: 10689,
        categoriesId: 5
    },
    {
        name: 'Disco Rigido 4TERA WESTERN DIGITAL 64MB SATA III WD60PURX',
        image: 'https://shop.westerndigital.com/content/dam/store/en-us/assets/products/internal-storage/wd-blue-desktop-sata-hdd/gallery/wd-blue-pc-desktop-hard-drive-4tb.png.thumb.1280.1280.png',
        details: 'WD Purple están fabricados para los sistemas de seguridad de alta definición siempre en funcionamiento que operan las 24 horas. El sistema de almacenamiento para videovigilancia WD Purple también incorpora la exclusiva tecnología AllFrame de WD, para que pueda crear un sistema de seguridad fiable y adaptado a las necesidades de la empresa. Tecnología AllFrame mejora las transmisiones ATA para reducir los errores, el pixelado y las interrupciones del vídeo, además de su duración extra.',
        price:18034,
        categoriesId:3
    },
    {
        name: 'Mouse Gamer Redragon Nemeanlion 2 7200DPI',
        image:'https://tjgaming.com.br/wp-content/uploads/2019/09/0ddd5dad7408c7e4baf1385b0e0890a4.png',
        details:'Redragon M602 - 1 .Raton para juegos con cable RGB (retroiluminado, ergonomico, programable, con 7 modos de retroiluminacion de hasta 7200 PPP), RGB',
        price:6999,
        categoriesId: 5
    },
    {
        name: 'Monitor Acer Predator Xb241h 144hz 24',
        image: 'https://media.aws.alkosto.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/4/7/4713392518904_6.png',
        details: 'Monitor plano 24 pulgadas ACER, su innovador diseño con visuales en 3D te transporta de lo digital a la realidad.|Viene con tarjeta gráfica y sistema G-Sync integrado, creando una experiencia de juego fluida. Además, se actualiza rápido y elimina por completo las interferencias de la pantalla',
        price: 85999,
        categoriesId: 6
    },
    {
        name: 'Tableta gráfica Wacom One black y white',
        image: 'https://cdn-reichelt.de/bilder/web/xxl_ws/E500/WACOM_CTL-6100WLK-N_02.png',
        details: 'Con los 4096 niveles de presión vas a lograr trazos muy fieles con solo variar la intensidad del lápiz sobre la tableta. Dejá volar tu imaginación y disfrutá de una experiencia creativa inigualable.',
        price: 82199,
        categoriesId: 7
    },
    {
        name: 'Camara Web Cam Genius 1000x V2 Hd 720p Usb Microfono Zoom 3x',
        image:'http://xtcomputacion.com/images/detailed/2/FaceCam_1000_product_left_HiRes_sm_clipped_rev_1.png',
        details:'Conexión en 720p HD en aplicaciones de mensajería, la cámara proporciona una experiencia de chat mucho más clara.',
        price: 2995,
        categoriesId: 7
    },
    {
        name:'Mousepad Medium Rgb Steelseries Qck Gaming Surface',
        image:'https://cdn.idntimes.com/content-images/community/2017/10/stel-e8111faa795a43916354266643ffeaf4.png',
        details:'El software SteelSeries Engine desbloquea un impresionante arsenal de aplicaciones de motor que hacen que la personalización sea fácil e intuitiva.',
        price:16969,
        categoriesId:5
    },
    {
        name:'Monitor curvo MSI Optix G27C led 27 " negro 100V/240V',
        image:'https://asset.msi.com/global/picture/images/monitor/Gaming_monitor.png',
        details: 'Disfrutá de todas las cualidades que el monitor MSI G27C tiene para ofrecerte. Percibí las imágenes de una manera completamente diferente y complementá cualquier espacio ya sea en tu casa u oficina.',
        price: 58900,
        categoriesId: 6
    },
    {
        name: 'Memoria RAM Vengeance LPX 16GB 2x8GB Corsair',
        image:'https://www.arjansac.com/image/cache/catalog/CORSAIR/Memorias%20RAM/Memoria%20RAM%20DDR4%202666Mhz%20PC4-21300/COR%2016GB%202666MHZ%20VENG%20DDR4/COR%2016GB%202666MHZ%20VENG%20DDR42-1000x1000.png',
        details:'Su capacidad de 16 GB distribuida en módulos de 2 x 8 GB hace de esta memoria un soporte ideal para trabajos con aplicaciones de diseño o edición, juegos exigentes, contenidos multimedia, entre otros. A su vez, la distribución de la capacidad total en dos módulos iguales te permitirá maximizar tus posibilidades de uso.',
        price: 13490,
        categoriesId:2
    }



]



let categories = [
    {
        name: 'Placa de Video',
    }, 
    {
        name:'Memorias',
    }, 
    {
        name: 'Almacenamiento',
    },
    {
        name:'Motherboards',
    },
    {
        
        name:'Teclados y Mouses',
    }, 
    {
        name:'Monitores y Televisores',
    }, 
    {
        name:'Perifericos',
    }, 
    {
        name: 'Procesadores',
    }, 
]


const users = [
    {
      name: 'Maurice',
      surname: 'Moss',
      email: 'maurice@moss.com',
      password: 'abcdefg',
      username: 'elmauricapo',
      privilege: 'admin',
      active: true,
      address: '123 Main',
      id: uuid()
    },
    {
      name: 'Roy',
      surname: 'Trenneman',
      email: 'roy@trenneman.com',
      password: 'imroy',
      username: 'elroycapo',
      privilege: 'user',
      active: true,
      address: 'calle popo de perro 700',
      id: uuid()
    }
  ];

export function usersSeeder(){
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
            id: item.id
    })
    })
    
}

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


export async function getUsers(){
    let users = await User.findAll();

    return users;
}