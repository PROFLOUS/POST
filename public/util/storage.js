const WISH_STORAGE_KEY = 'WISH'

export default {
    get(){
        return JSON.parse(localStorage.getItem(WISH_STORAGE_KEY)) || []
    },

    set(wish){
        localStorage.setItem(WISH_STORAGE_KEY,JSON.stringify(wish));
    }
}

