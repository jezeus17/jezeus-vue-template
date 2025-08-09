import TokenHandler from "@/common/utils/token-handler";


export function isUserAuthenticated(){
    
    return TokenHandler.getToken()!=null
}