import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { createObject, stringSearch } from './firebase-files/firebase';
import { styles } from './styles';
import firebaseArrayConvert from './firebase-files/firebaseArrayConvert';

export default function Mates(props) {
  const [searchResults, setSearchResults] = useState([]);
  const mateIds = props.mates.map(m => m.userId);

  const sendRequest = async function (recipient) {
    createObject(
      "requests",
      { recipientId: recipient.userId, date: new Date().toLocaleString(), senderName: props.user.email, recipientName: recipient.email },
      props.user.userId
    );
  }

  const handleSearch = async function (searchText) {
    if (searchText.length < 3)
      return;

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
    <View style={styles.page}>
      <Text>MATES</Text>
      {props.mates.map(mate => {
        return <View key={mate.userId}>
          <Text>{mate.email}</Text>
          <Button title="wuu2?" onPress={() => sendRequest(mate)} />
        </View>
      })}
      <Text>FIND</Text>
      <TextInput onChangeText={handleSearch} placeholder="start typing your mate's email" />
      {searchResults.map(r => <View key={r.key}>
        <Text>{r.email}</Text>
        <Button title="add" onPress={() => addMate(r.userId)} />
      </View>
      )}
    </View>
  );
}