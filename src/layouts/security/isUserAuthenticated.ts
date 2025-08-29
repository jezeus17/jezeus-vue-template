import TokenHandler from "@/common/site/token-handler";


export function isUserAuthenticated() {

    return TokenHandler.getToken() != null
}