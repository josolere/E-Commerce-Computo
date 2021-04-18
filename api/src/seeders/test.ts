import Sequelize from "sequelize";
import { Category } from "../models/Category"
import { Product } from "../models/Product"
import db from "../models"
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
        categoriesId: 7
    }, 
    {
        name:'Headset Logitech G Series G432',
        image:'https://www.hardware-journal.de/images/Bilder/2019/News/Logitech-G/G935-lightsync-wireless-G635-G432-7-1-surround-G332-Stereo/logitech-g432-gaming-headset-7-1.png',
        brand: 'Logitech',
        details: '¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los Logitech G432 no te perdés ningún detalle y escuchás el audio tal y como fue diseñado por los creadores.',
        price: 7999,
        categoriesId: 7
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
        categoriesId: 8
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
        categoriesId: 1
    }, 
    {
        name:'ASUS GeForce RTX 3080 ROG Strix',
        image:'https://dlcdnwebimgs.asus.com/gain/44A520BD-D8B0-47E7-952A-1AE2973C9168/w1000/h732',
        brand: 'ASUS',
        details: 'Placa de video gama alta de NVIDIA. Velocidad base de 1.4GHz, Velocidad Máxima de 1.7GHz. 10GB de memoria GDDR6X. Requiere una fuente de 750W. Corre todo a 4k 60 fps, o 1080p 144fps',
        price: 550000,
        categoriesId: 1
    },
    {
        name:'ASUS ROG Maximus XII FORMULA Motherboard Socket 1200 Chipset z49',
        image:'https://www.asus.com/microsite/motherboard/Intel-Z490/nl/img/products/m12h_wifi.png',
        brand: 'ASUS',
        details: 'Placa madre tope de gama ASUS, con socket LGA 1200, compatible con lo mejor de Intel. Wi-Fi 6(.ax) incluido. Tres ranuras M.2. Disipadores gigantes para VRM, chipset y sockets M2. Ethernet 10gb incluido. Compatible con Thunderbolt y conectores USB 3.2 incluidos.',
        price: 72999,
        categoriesId: 4
    }, 
    {
        name:'ASUS ROG Strix Chipset x570 Socket AM4',
        image:'https://avadirect-freedomusainc1.netdna-ssl.com/Pictures/Big/12858027_1.png',
        brand: 'ASUS',
        details: 'Placa madre tope de gama ASUS, con socket AM4, compatible con lo mejor de AMD. Wi-Fi 6(.ax) incluido. Tres ranuras M.2. Disipadores gigantes para VRM, chipset y sockets M2. Ethernet 10gb incluido. Conectores USB 3.2 incluidos.',
        price: 57999,
        categoriesId: 4
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