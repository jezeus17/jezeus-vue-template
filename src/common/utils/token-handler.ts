import { useLocalStorage } from "@vueuse/core";

function getToken (){
    return localStorage.getItem('token');
}

function storeToken (token: string){
    const tokenInLocal = useLocalStorage('token',token)
    tokenInLocal.value = token
}
function removeToken (){
    const tokenInLocal = useLocalStorage('token','')
    tokenInLocal.value=null
}



function getRefreshToken () {
    return localStorage.getItem('refreshToken');
}

function storeRefreshToken (refreshToken: string){
    localStorage.setItem('refreshToken', refreshToken);
}


function removeRefreshToken() {
    localStorage.removeItem('refreshToken');
}
const TokenHandler = {
    getToken,
    storeToken,
    getRefreshToken,
    storeRefreshToken,
    removeRefreshToken,
    removeToken
}

export default TokenHandler;