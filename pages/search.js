import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { createObject, stringSearch } from '../firebase-files/firebase';
import firebaseArrayConvert from '../firebase-files/firebaseArrayConvert';
import { styles } from '../styles';

export default function Search(props) {
    const [searchResults, setSearchResults] = useState([]);
    const mateIds = props.mates.map(m => m.userId);

    const handleSearch = async function (searchText) {
        if (searchText.length < 3) {
            setSearchResults([]);
            return;
        }

        searchText = searchText.toLowerCase();

        let result = firebaseArrayConvert(
            (await stringSearch('userDetails', 'email', searchText))
                .val()
        );

        let cleanedResults = result
            .filter(r => r.userId != props.user.userId)
            .filter(r => !mateIds.includes(r.userId));

        setSearchResults(cleanedResults);
    }

    const addMate = function (key) {
        setSearchResults([]);
        createObject('mates', { mateId: key }, props.user.userId)
    }

    return (
        <View style={styles.width}>
            <TextInput style={styles.textInput} onChangeText={handleSearch} placeholder="start typing your mate's email" />
            {searchResults.map(r => <View key={r.key} style={styles.mate}>
                <Text style={{ width: '75%' }}>{r.email}</Text>
                <TouchableOpacity style={{ ...styles.mateButton, ...styles[`requestwaiting`], width: '25%' }} onPress={() => addMate(r.userId)} >
                    <Text>ADD</Text>
                </TouchableOpacity>
            </View>
            )}
        </View>
    );
}