export default function firebaseArrayConvert(object) {
    if (!object)
        return [];

    var values = Object.values(object);
    var keys = Object.keys(object);
    return values.map((obj, i) => {
        return { ...obj, key: keys[i] };
    });
}