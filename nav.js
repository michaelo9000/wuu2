import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { styles } from './styles';

export default function Nav(props) {

    return (
        <View style={styles.nav}>
            <TouchableOpacity onPress={() => props.setPage('mates')} style={styles.navItem}>
                <Text>Mates</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.setPage('requests')} style={styles.navItem}>
                <Text>Requests</Text>
            </TouchableOpacity>
        </View>
    );
}