import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { styles } from '../styles';

export default function Nav(props) {

    return (
        <View style={styles.nav}>
            <TouchableOpacity onPress={props.signOut} style={{ ...styles.navItemContainer, width: '23%' }}>
                <View style={{ ...styles.navItem }}>
                    <Image style={{ ...styles.icon, marginLeft: -7 }} source={{ uri: '../assets/signout.svg' }} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.setPage('mates')} style={{ ...styles.navItemContainer, width: '70%' }}>
                <View style={{ ...styles.navItem }}>
                    {/* aaaaaaahhhhh react native doesn't do svgs */}
                    <Image style={styles.icon} source={{ uri: '../assets/home.svg' }} />
                </View>
            </TouchableOpacity>
        </View>
    );
}