import Sequelize from "sequelize";
import { Category } from "../models/Category"
import { Product } from "../models/Product"





let products = [
    {
        name: 'Headset Redragon H220 THEMIS',
        image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/896/208/products/h220-1_headset_1024x10242x2-954badd9ed46957ce915971658927709-1024-1024.png%27%7D',
        brand: 'Redragon',
        details: 'Un auricular con un sonido brillante y claro, con una estructura liviana y cómoda, el Themis es un auricular pensado para jugar cómodamente. -Sonido:Este auricular, posee un claro sonido estéreo con ficha Jack 3.5 mm, garantizan la mejor calidad de sonido en nuestros diafragmas de 50mm con imanes de neodimio, ideales en la construcción de periféricos de sonido. -Micrófono: Integrado en la estructura de las copas, construido sobre un brazo rebatible y captación omnidireccional.',
        price: 2099
    }, 
    {
        name:'Headset Logitech G Series G432',
        image:'https://http2.mlstatic.com/D_NQ_NP_861149-MLA41107813935_032020-V.webp',
        brand: 'Logitech',
        details: '¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los Logitech G432 no te perdés ningún detalle y escuchás el audio tal y como fue diseñado por los creadores.',
        price: 7999
    }, 
    {
        name: 'AMD Ryzen 9 5900X 12-Core Processor',
        image:'https://http2.mlstatic.com/D_871821-MLA44771394957_022021-O.jpg',
        brand:'AMD',
        details:"El procesador que ofrece la mejor experiencia de juego del mundo. 12 núcleos para potenciar la experiencia de juego, la transmisión en vivo y mucho más. Diseña más rápido. Procesa más rápido. Itera más rápido. Crea más y más rápido con los procesadores AMD Ryzen. 12 Núcleos de CPU, Velocidad base 3.7GHz, Velocidad Máxima 4.8GHz.",
        price: 76499 
    },
    {
        name:'AMD Ryzen 7 5800X 8-Core Processor',
        image:'https://http2.mlstatic.com/D_NQ_NP_920739-MLA44347283255_122020-W.webp',
        brand: 'AMD',
        details: 'Procesador de gama alta de AMD. 8 Núcleos y 16 hilos. Velocidad Base de 3.8GHz, Velocidad Máxima de 4.7GHz. Compatible con Socket AM4(Chipset B550 o mejor)',
        price: 55399
    },
    {
        
        name:'Intel i9 10900k 10-Core Processor',
        image:'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_19116_Procesador_Intel_Core_i9_10900K_5.3GHz_Turbo_1200_Comet_Lake_dfba4e4f-grn.jpg',
        brand: 'Intel',
        details: 'Procesador Tope de gama de Intel. 10 núcleos, 20 hilos. Corre absolutamente todo. Velocidad base de 3.7GHz, Velocidad Máxima de 5.3GHz. Compatible con Socket LGA 1200. Viene con GPU Integrada Intel HD Graphics 630',
        price: 58399
    }, 
    {
        name:'Intel i7 10700k 8-Core Processor',
        image:'https://http2.mlstatic.com/D_NQ_NP_600668-MLA43003993305_082020-O.webp',
        brand: 'Intel',
        details: 'Procesador gama alta de Intel. 8 núcleos, 16 hilos. Corre absolutamente todo. Velocidad base de 3.8GHz, Velocidad Máxima de 5.1GHz. Compatible con Socket LGA 1200. Viene con GPU Integrada Intel HD Graphics 630',
        price: 48799
    }, 
    {
        name:'AMD Radeon PowerColor RX 6900XT Red Devil',
        image:'https://cdn.videocardz.com/1/2020/12/POWERCOLOR-RX-6900-XT-16GB-Red-Devil-Limited-Edition-5.jpg',
        brand: 'PowerColor',
        details: 'Placa de video tope de gama de AMD. Velocidad base 1.8GHz, Velocidad Máxima 2.3GHz. 16 GB de memoria GDDR6. Corre todo en 4k a 60 fps, o 1080p 144fps.',
        price: 500000
    }, 
    {
        name:'AMD Radeon PowerColor RX 6800XT Red Devil',
        image:'https://cdn.videocardz.net/cache/40749eee197a0cc820c766da8e609129-1200x900.jpg',
        brand: 'PowerColor',
        details: 'Placa de video gama alta de AMD. Velocidad base de 1.8GHz, Velocidad Máxima de 2.3GHz. 16GB de memoria GDDR6. Requiere una fuente de 750W.',
        price: 450000
    }, 
    {
        name:'ASUS GeForce RTX 3090 ROG Strix',
        image:'https://cdn.videocardz.net/cache/97ae5fa6838e3ca65bde8eadb3d64e19-1200x900.jpg',
        brand: 'ASUS',
        details: 'Placa de video tope de gama de NVIDIA. Velocidad base de 1.4GHz, Velocidad Máxima de 1.7GHz. 24GB de memoria GDDR6X. Requiere una fuente de 750W. Corre todo a 4k 60 fps, o 1080p 144fps',
        price: 600000   
    }, 
    {
        name:'ASUS GeForce RTX 3080 ROG Strix',
        image:'https://cdn.videocardz.net/cache/1afa5d9594fbb038189fb46e8b6c25e3-1200x900.jpg',
        brand: 'ASUS',
        details: 'Placa de video gama alta de NVIDIA. Velocidad base de 1.4GHz, Velocidad Máxima de 1.7GHz. 10GB de memoria GDDR6X. Requiere una fuente de 750W. Corre todo a 4k 60 fps, o 1080p 144fps',
        price: 550000 
    },
    {
        name:'ASUS ROG Maximus XII FORMULA Motherboard Socket 1200 Chipset z490',
        image:'https://http2.mlstatic.com/D_NQ_NP_2X_931119-MLA44561531421_012021-F.webp',
        brand: 'ASUS',
        details: 'Placa madre tope de gama ASUS, con socket LGA 1200, compatible con lo mejor de Intel. Wi-Fi 6(.ax) incluido. Tres ranuras M.2. Disipadores gigantes para VRM, chipset y sockets M2. Ethernet 10gb incluido. Compatible con Thunderbolt y conectores USB 3.2 incluidos.',
        price: 72999 
    }, 
    {
        name:'ASUS ROG Strix Chipset x570 Socket AM4',
        image:'https://http2.mlstatic.com/D_NQ_NP_2X_858970-MLA44562299593_012021-F.webp',
        brand: 'ASUS',
        details: 'Placa madre tope de gama ASUS, con socket AM4, compatible con lo mejor de AMD. Wi-Fi 6(.ax) incluido. Tres ranuras M.2. Disipadores gigantes para VRM, chipset y sockets M2. Ethernet 10gb incluido. Conectores USB 3.2 incluidos.',
        price: 57999 
    } 

]

    export function productsSeeder() {
    products.forEach((item: any) => {
        Product.create({
            name: item.name,
            brand: item.brand,
            price: item.price,
            image: item.image,
            details: item.details
    })
    })
}