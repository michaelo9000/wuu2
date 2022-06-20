import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { styles } from './styles';

export default function Requests(props) {

  const getRequestStatus = function (req) {
    if (!req.backUrl)
      return 'Pending';
    return 'New';
  }

  return (
    <View style={styles.page}>
      <Text>REQUESTS</Text>
      <Text>received</Text>
      {props.receivedRequests.map(req => {
        return <TouchableOpacity key={req.key} onPress={() => props.takePhotos(req)} style={styles.receivedRequest}>
          <Text>from {req.senderName}</Text>
          <Text>at {req.date}</Text>
        </TouchableOpacity>
      })}
      <Text>sent</Text>
      {props.sentRequests.map(req => {
        let status = getRequestStatus(req);
        return <TouchableOpacity key={req.key} disabled={status == 'Pending'} onPress={() => props.viewPhotos(req)}
          style={{ ...styles.sentRequest, ...styles[`request${status}`] }}>
          <Text style={styles[`request${status}`]}>to {req.recipientName}</Text>
          <Text style={styles[`request${status}`]}>at {req.date}</Text>
        </TouchableOpacity>
      })}
    </View>
  );
}