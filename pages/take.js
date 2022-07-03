import React, { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { getCurrentUser, updateObject, uploadPhotos } from '../firebase-files/firebase';
import { styles } from '../styles';

export default function Take(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [cameraReady, setCameraReady] = useState(false);
    const [camera, assignCamera] = useState();
    const [takingPhoto, setTakingPhoto] = useState(false);
    const [tookPhoto, setTookPhoto] = useState(false);
    const [sent, setSent] = useState();

    useEffect(() => {
        (async () => {
            let permissionStatus = await (await Camera.getCameraPermissionsAsync()).status;
            if (permissionStatus !== 'granted') {
                permissionStatus = await (await Camera.requestCameraPermissionsAsync()).status;
            }
            setHasPermission(permissionStatus === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>NULL permissions for camera</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePhotos = async () => {
        if (!cameraReady)
            return;

        setTakingPhoto(true);

        // Wait half a second to let the camera flip?? idk if this is needed.
        setType(CameraType.back);
        setTimeout(async () => {
            try {
                var backPhoto = await camera.takePictureAsync();
            }
            catch (e) {
                alert(e);
            }

            setType(CameraType.front);

            setTimeout(async () => {
                try {
                    var frontPhoto = await camera.takePictureAsync();
                }
                catch (e) {
                    alert(e);
                }

                setTakingPhoto(false);
                setTookPhoto(true);

                await sendPhotos(frontPhoto, backPhoto);
            }, 500);
        }, 500);
    }

    const sendPhotos = async (frontPhoto, backPhoto) => {
        console.log(frontPhoto);
        var urls = await uploadPhotos(frontPhoto.uri, backPhoto.uri, props.user.key, props.request.key);
        updateObject('requests', { ...props.request, frontUrl: urls.front, backUrl: urls.back });
        setSent(true);
        setTimeout(() => props.setPage('mates'), 1500);
    }

    return (
        <View style={styles.page}>
            <View style={styles.camera}>
                <Camera type={type} onCameraReady={() => setCameraReady(true)} ref={camera => assignCamera(camera)}>
                    {/* This needs to stay or the camera breaks who knows why */}
                    <Text>Flip</Text>
                </Camera>
            </View>
            {sent &&
                <View style={styles.alert} >
                    <Text>Sent!</Text>
                </View>
            }
            {!tookPhoto &&
                <View style={styles.input} >
                    <Button onPress={takePhotos} title="take photos" disabled={!cameraReady || takingPhoto} />
                </View>
            }
        </View>
    );
}