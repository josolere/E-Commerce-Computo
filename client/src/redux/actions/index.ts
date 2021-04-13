export const SET_FILTER = 'SET_FILTER'          // Para filtrar por nombre
export const SET_CATEGORIES = 'SET_CATEGORIES'      // Para filtrar por actividad
export const PASS_ID = 'PASS_ID' //Pasar id

export const setFilter = (filter:string)  => ({
    type: SET_FILTER , filter
});

export const seCategory = (categories:number[])  => ({
    type: SET_CATEGORIES , categories
});

export const passid = (idpass:number) => ({
    type: PASS_ID , idpass
});