import React, { useState, useEffect } from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import { updateObject } from '../firebase-files/firebase';
import { styles } from '../styles';

export default function See(props) {
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        (async () => {
            updateObject('requests', { ...props.req, seen: new Date().toLocaleString() });
        })();
    }, []);

    return (
        <View style={styles.page}>
            <Image
                style={styles.backPhoto}
                source={{ uri: props.req.backUrl }}
            />
            <Image
                style={{ width: width * .4, height: width * .5, left: width * .5, top: width * .2, position: 'absolute' }}
                source={{ uri: props.req.frontUrl }}
            />
        </View>
    );
}