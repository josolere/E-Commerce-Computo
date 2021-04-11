import Sequelize from "sequelize";
import { Category } from "../src/models/Category"
import { Product } from "../src/models/Product"

const names = ["CPU", "GPU"];
const brands = ["AMD", "Intel"];
const prices = [25069745, 38569740];
const images = ["ea.jpg","uesa.jpg"];
const details = ["1337 c0d3", "gr8 m8"];

export async function productsSeeder() {
    try{
        for (let i = 0; i < 2; i++) {
            let item = await Product.create({
                name: names[i],
                brand: brands[i],
                price: prices[i],
                image: images[i],
                details: details[i]
            });
        }
    }catch(err){
        console.error(err)
    }
    
}