

const WISH_STORAGE_KEY = 'WISH'
wishs = ()=> {
    return JSON.parse(localStorage.getItem(WISH_STORAGE_KEY)) || []
}

module.exports = {wishs};
