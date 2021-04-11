import Sequelize from "sequelize";
import { Category } from "../models/Category"
import { Product } from "../models/Product"

const names = ["GAMER REDRAGON", "GPU"];
const brands = ["AMD", "Intel"];
const prices = [25069745, 38569740];
const images = ["ea.jpg", "uesa.jpg"];
const details = ["1337 c0d3", "gr8 m8"];



let Products = [
    {
        name: 'GAMER REDRAGON',
        img: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/896/208/products/h220-1_headset_1024x10242x2-954badd9ed46957ce915971658927709-1024-1024.png%27%7D'
    }, 
    {
        name:'JBL ROSA',
        img:'https://www.jbl.com.pe/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw0fb18ea9/JBL_JR300BT_Pink_Fold-1605x1605px.png?sw=537&sfrm=png%27%7D
    }, 
    {name:'kOITON NOSECUANTO',img:'http://pngimg.com/uploads/headphones/headphones_PNG101982.png%27%7D},
    {name:'KOITON AZULES',img:'https://www.gamer24hs.com/IMGS/1606485816.png%27%7D}, 
    {name:'CORSAIR WORS',img:'https://clonesyperifericos.com/wp-content/uploads/2020/01/12-5.png%27%7D}, 
    {name:'LOGITECH GAMING',img:'https://www.spdigital.cl/img/products/G633-Review-Shot-01.jpg%27%7D}, 
    {name:'lOGITECH ROJOS',img:'https://www.pcfactory.cl/public/foto/32345/1_500.jpg?t=1551900957%27%7D}, 
    {name:'LOGITECH NARANJA',img:'https://www.winpy.cl/files/w12134_log981-000626%C3%A2%C2%B73.jpg%27%7D}, 
    {name:'AURIS VERDES',img:'https://www.klipxtreme.com/media/KHS-659-banner-top.png%27%7D, 
    {name:'GETECH AZULES',img:'https://cdn.shopify.com/s/files/1/2584/5536/products/800_800_12fa48d2-16afa234f4f--7f893193053602387023096.upload_1024x1024.png?v=1582228883%27%7D},
    {name:'GETECH ROJOS',img:'https://cdn.shopify.com/s/files/1/2584/5536/products/800_800_12fa48d2-16afa234f4f--7f8d6506523086609125338.upload_1024x1024.png?v=1582228885%27%7D}, 
    {name:'GETECH MULTI',img:'https://m.media-amazon.com/images/I/61iQLvs2gUL._AC_SS450_.jpg%27%7D} 

]

    export function productsSeeder() {
        for(let i = 0; i < 2; i++) {
    Product.create({
        name: names[i],
        brand: brands[i],
        price: prices[i],
        image: images[i],
        details: details[i]
    });
}
}