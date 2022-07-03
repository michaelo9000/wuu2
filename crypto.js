import AsyncStorage from '@react-native-async-storage/async-storage';
import { JSHash, CONSTANTS } from "react-native-hash";

export const hashAndStorePassword = async function (password) {
    JSHash(password, CONSTANTS.HashAlgorithms.sha256)
        .then(async hash => await AsyncStorage.setItem('@passwordHash', hash))
        .catch(e => console.log(e));
}

export const storeUserCredentials = async function (userData) {
    await AsyncStorage.setItem('@userEmail', userData.email);
    await AsyncStorage.setItem('@userPassword', userData.password);
}

export const retrieveUserCredentials = async function () {
    const email = await AsyncStorage.getItem('@userEmail');
    const password = await AsyncStorage.getItem('@userPassword');
    return { password: password, email: email };
}