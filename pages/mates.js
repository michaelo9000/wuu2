import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { createObject } from '../firebase-files/firebase';
import { styles } from '../styles';
import Search from './search';

export default function Mates(props) {

  const sendRequest = async function (recipient) {
    createObject(
      "requests",
      { recipientId: recipient.userId, date: new Date().toLocaleString(), senderName: props.user.email, recipientName: recipient.email },
      props.user.userId
    );
  }

  return (
    <View style={styles.page}>
      <Search mates={props.mates} user={props.user} />
      {props.mates.map(mate => {

        let receivedRequest = props.receivedRequests
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .find(req => req.userId == mate.userId);

        let sentRequest = props.sentRequests
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .find(req => req.recipientId == mate.userId);

        return <MateDisplay
          key={mate.userId}
          mate={mate}
          handleSend={sendRequest}
          receivedRequest={receivedRequest}
          sentRequest={sentRequest}
          viewPhotos={props.viewPhotos}
          takePhotos={props.takePhotos}
        />;
      })}
    </View>
  );
}

function MateDisplay(props) {
  const mate = props.mate;

  const handlePressSend = function (status) {
    if (status == "waiting")
      return;
    if (status == "wuu2")
      props.handleSend(mate);
    if (status == "view")
      props.viewPhotos(props.sentRequest);
  }

  if (!props.sentRequest)
    var sentStatus = "wuu2";
  else if (props.sentRequest && !props.sentRequest.backUrl)
    var sentStatus = "waiting";
  else if (props.sentRequest && props.sentRequest.seen)
    var sentStatus = "wuu2";
  else
    var sentStatus = "view";

  const handlePressRespond = function (status) {
    if (status == "nothin" || status == "replied")
      return;
    if (status == "respond")
      props.takePhotos(props.receivedRequest);
  }

  if (!props.receivedRequest)
    var receivedStatus = "nothin";
  else if (props.receivedRequest && !props.receivedRequest.backUrl)
    var receivedStatus = "respond";
  else if (props.receivedRequest && props.receivedRequest.seen)
    var receivedStatus = "seen";
  else
    var receivedStatus = "replied";

  return <View style={styles.mate}>
    <Text style={{ width: '50%' }}>{mate.email}</Text>
    <View style={styles.mateButtonContainer}>
      <TouchableOpacity style={{ ...styles.mateButton, ...styles[`request${receivedStatus}`] }} onPress={() => handlePressRespond(receivedStatus)}>
        <Text style={styles[`request${receivedStatus}`]}>{receivedStatus}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles.mateButton, ...styles[`request${sentStatus}`] }} onPress={() => handlePressSend(sentStatus)}>
        <Text style={styles[`request${sentStatus}`]}>{sentStatus}</Text>
      </TouchableOpacity>
    </View>
  </View>
}