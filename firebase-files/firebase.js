import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import firebaseArrayConvert from "./firebaseArrayConvert";

// To start, add Authentication and a Realtime Database.

const firebaseConfig = {
    apiKey: "AIzaSyCqTNcJprgLtXjDGHypcM0mWIylwdD7Hl8",
    authDomain: "wuu2-52128.firebaseapp.com",
    databaseURL: "https://wuu2-52128-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wuu2-52128",
    storageBucket: "wuu2-52128.appspot.com",
    messagingSenderId: "849892159131",
    appId: "1:849892159131:web:aa1bb2fbf645f69e4a603e",
    measurementId: "G-3D3K3HSZF4",
    storageBucket: "gs://wuu2-52128.appspot.com"
};

if (!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const storage = firebase.storage().ref();

// doesn't work?? missing something?
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const signOut = function () {
    firebase.auth().signOut();
}

function constructUserResult(user) {
    return {
        userId: user.user.uid,
        isSuccess: true
    }
}

function constructErrorResult(error) {
    return {
        error: error,
        isSuccess: false
    }
}

export const getCurrentUser = async function () {
    return await firebase.auth().currentUser;
}

export const createUser = async function (credentials, listenersCallback) {
    return createUserPromise(
        firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        , credentials, false, listenersCallback
    );
}

export const signInUser = async function (credentials, listenersCallback) {
    return createUserPromise(
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        , credentials, true, listenersCallback
    );
}

const createUserPromise = async function (func, credentials, isSignIn, listenersCallback) {
    return new Promise((resolve) =>
        func
            .then((userCredential) => {
                resolve(constructUserResult(userCredential));
            })
            .catch((error) => {
                resolve(constructErrorResult(error));
            })
    )
        .then(async r => {
            if (!r.isSuccess)
                return r;

            addListeners(r.userId, listenersCallback);

            if (!isSignIn) {
                createObject('userDetails', credentials, r.userId);
            }

            var details = credentials;
            if (isSignIn) {
                details = await getUserDetails(r.userId);
                // Firebase returns the user's details like this:
                // { -tHEuSeR'SkeY: { ...theirDetails } }
                // So we have to access the nested object within the returned object.
                details = details[Object.keys(details)[0]];
                var data = await getUserData(r.userId);
            }

            return { ...r, ...details, data: data || {} }
        });
}

export const getUserDetails = async function (userId) {
    let userDetails = await getEqualTo('userDetails', 'userId', userId);
    return userDetails.val();
}

export const getUserData = async function (userId) {
    let userMatesAssociations = firebaseArrayConvert(
        (await getEqualTo('mates', 'userId', userId))
            .val()
    );

    let userMates = [];
    if (userMatesAssociations.length) {
        userMates = (await Promise.all(
            userMatesAssociations.map(i => getEqualTo('userDetails', 'userId', i.mateId))
        ))
            .map(i => i.val())
            .reduce((acc, val) => ({ ...acc, [Object.keys(val)[0]]: val[Object.keys(val)[0]] }));
    }

    let userSentRequests = (await getEqualTo('requests', 'userId', userId)).val()

    let userRecipientRequests = (await getEqualTo('requests', 'recipientId', userId)).val()

    return { mates: userMates, sentRequests: userSentRequests, receivedRequests: userRecipientRequests };
}

export const getEqualTo = function (tableName, columnName, queryValue) {
    return new Promise(resolve => {
        db.ref(tableName).orderByChild(columnName).equalTo(queryValue)
            .on('value', (snapshot) => {
                resolve(snapshot);
            });
    })
        .then(r => r);
}

export const createObject = function (table, details, userId) {
    db.ref(table).push({ userId: userId, ...details });
}

export const updateObject = function (table, data) {
    let object = separateId(data);
    db.ref(`${table}/${object.key}/`).set(object.details);
}

export const deleteObject = function (table, key) {
    db.ref(`${table}/${key}`).removeValue();
}

const separateId = function (object) {
    let { key, ...details } = object;
    return { key: key, details: details };
}

export const addListeners = function (userId, callback) {
    addEqualToListener('mates', 'userId', userId, 'child_added', callback, userId);
    addEqualToListener('mates', 'userId', userId, 'child_changed', callback, userId);
    addEqualToListener('requests', 'userId', userId, 'child_added', callback, userId);
    addEqualToListener('requests', 'userId', userId, 'child_changed', callback, userId);
    addEqualToListener('requests', 'recipientId', userId, 'child_added', callback, userId);
    addEqualToListener('requests', 'recipientId', userId, 'child_changed', callback, userId);
}

const addEqualToListener = function (tableName, columnName, queryValue, eventType, callback, userId) {
    db.ref(tableName).orderByChild(columnName).equalTo(queryValue)
        .on(eventType, (snapshot) => {
            callback(tableName, snapshot, userId);
        });
}

export const stringSearch = function (tableName, columnName, queryValue) {
    return new Promise(resolve => {
        db.ref(tableName).orderByChild(columnName).startAt(queryValue).endAt(queryValue + '\uf8ff')
            .on('value', (snapshot) => {
                resolve(snapshot);
            });
    })
        .then(r => r);
}

// todo split up this large file into concerns
export const uploadPhotos = async function (frontUri, backUri, userId, requestId) {
    var frontPath = `${userId}/${requestId}-f.png`;
    var backPath = `${userId}/${requestId}-b.png`;
    var front = storage.child(frontPath);
    var back = storage.child(backPath);
    var frontBlob = await blobify(frontUri);
    var backBlob = await blobify(backUri);
    var frontUpload = front.put(frontBlob).then(s => { });
    var backUpload = back.put(backBlob).then(s => { });
    return { front: getImageUrl(frontPath), back: getImageUrl(backPath) };
}

const getImageUrl = function (name) {
    return `https://firebasestorage.googleapis.com/v0/b/wuu2-52128.appspot.com/o/`
        + name.replace('/', '%2F')
        + '?alt=media';
}

const blobify = function (uri) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });
}

// let genericStructure = {
//     users: [
//         // key is generated by firebase's auth api and can be retrieved from firebase.auth().currentUser.uid;
//         key1: {
//            name: 'name'
//         },
//         key2: {
//             name: 'name2'
//         }
//     ],
//     tasks: [
//         // Retrieve user-related objects by their key (for individual objects):
//             // db.ref('tasks').child('key1').once('value')
//             // note that 'value' is a Firebase EventType, not anything specific to the data you are fetching.
//         // Or by their associated user (for a list of objects, e.g. on site load):
//             // db.ref('tasks').orderByChild('userId').equalTo('key1')
//         key1: {
//             name: 'name1',
//             userId: key1,
//             description:'description'
//         },
//     ]
// }

// const getFromKey = function (tableName, keyValue) {
//     return new Promise(resolve => {
//         db.ref(tableName).child(keyValue).get()
//             .then(snapshot => {
//                 resolve(snapshot);
//             });
//     })
//         .then(r => r);
// }