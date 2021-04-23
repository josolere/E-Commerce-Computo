export const SET_FILTER = 'SET_FILTER'          // Para filtrar por nombre
export const SET_CATEGORIES = 'SET_CATEGORIES'      // Para filtrar por actividad
export const ADD_SHOPPING = 'ADD_SHOPPING'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const MORE_PRICE = 'MORE_PRICE'
export const LESS_PRICE = 'LESS_PRICE'
export const LOCAL = 'LOCAL'
export const ADD_LOCALSTORAGE = 'ADD_LOCALSTORAGE'
export const DELETE_CART = 'DELETE_CART'
export const PASS_ID = 'PASS_ID' //Pasar id
export const ADD_PRODUCT_DETAILS = 'ADD_PRODUCT_DETAILS'
export const ADD_PRODUCT_HOME = 'ADD_PRODUCT_HOME'
export const LOGEO = 'LOGEO'

export const setFilter = (filter: string) => ({
    type: SET_FILTER, filter
});

export const setCategory = (categories:number[])  => (
    {
    type: SET_CATEGORIES , categories
});

export const passid = (idpass:number) => ({
    type: PASS_ID , idpass
});

export const addShopping = (idProduct: any) => ({
    type: ADD_SHOPPING, idProduct
})

export const deleteProduct = (idProduct: any) => ({
    type: DELETE_PRODUCT,
    idProduct
})

export const morePrice = (price: any) => ({
    type: MORE_PRICE,
    price
})

export const lessPrice = (price: any) => ({
    type: LESS_PRICE,
    price
})

export const local = (nameProduct: any) => ({
    type: LOCAL,
    nameProduct
})

export const addLocalStorage = (arrayProducts:any) =>({
    type:ADD_LOCALSTORAGE,
    arrayProducts
})

export const deleteCart = () => ({
    type:DELETE_CART,

})

export const addProductDetails = (state:boolean) =>({
    type:ADD_PRODUCT_DETAILS,
    state
})

export const addProductHome = (state:any) =>({
    type:ADD_PRODUCT_HOME,
    state
})


export const logeo = (state:any) =>({
    type:LOGEO,
    state
})
