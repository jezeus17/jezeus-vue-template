import CryptoJS from 'crypto-js'

const encrypt = (data: unknown) => {
    try {
        const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            import.meta.env.VITE_SECRET_KEY
        ).toString()
        return encrypted
    } catch (error) {
        console.error('Encrypt error:', error)
        return null
    }
}



const decrypt = (encryptedData: unknown) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, import.meta.env.VITE_SECRET_KEY)
        const decrypted = bytes.toString(CryptoJS.enc.Utf8)
        return decrypted ? JSON.parse(decrypted) : null
    } catch (error) {
        console.error('Decrypt Error:', error)
        return null
    }
}



export const EncryptionUtils = {
    encrypt,
    decrypt
}