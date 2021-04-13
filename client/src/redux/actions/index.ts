export const SET_FILTER = 'SET_FILTER'          // Para filtrar por nombre
export const SET_ACTIVITIES = 'SET_ACTIVITIES'      // Para filtrar por actividad

export const setFilter = (filter:string)  => ({
    type: SET_FILTER , filter
});

export const setActivity = (activities:number[])  => ({
    type: SET_FILTER , activities
});