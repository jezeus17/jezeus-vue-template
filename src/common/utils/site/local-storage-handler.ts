import { EncryptionUtils } from "./encrypt";

function getStoredData(key: string) {
    const encryptedData = sessionStorage.getItem(key);
    return encryptedData ? EncryptionUtils.decrypt(encryptedData) : null
}

function storeData(key: string, data: unknown) {
    const encryptedData = EncryptionUtils.encrypt(data)
    if (encryptedData) {
        sessionStorage.setItem(key, encryptedData)
    }
}
function removeData(key: string) {
    sessionStorage.removeItem(key);
}

export const SessionStorageHandler = {
    getStoredData,
    storeData,
    removeData
}