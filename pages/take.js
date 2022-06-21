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
    const [frontPhoto, setFrontPhoto] = useState({});
    const [backPhoto, setBackPhoto] = useState({});
    const [sent, setSent] = useState();
    const { height, width } = useWindowDimensions();

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
            setBackPhoto(backPhoto);

            setType(CameraType.front);

            setTimeout(async () => {
                try {
                    var frontPhoto = await camera.takePictureAsync();
                }
                catch (e) {
                    alert(e);
                }
                setFrontPhoto(frontPhoto);

                setTakingPhoto(false);
            }, 200);
        }, 200);
    }

    const sendPhotos = async () => {
        var urls = await uploadPhotos(frontPhoto.uri, backPhoto.uri, props.user.key, props.request.key);
        updateObject('requests', { ...props.request, frontUrl: urls.front, backUrl: urls.back });
        setSent(true);
        setTimeout(() => props.setPage('requests'), 1500);
    }

    return (
        <View style={styles.page}>
            <View style={styles.camera}>
                <Camera type={type} onCameraReady={() => setCameraReady(true)} ref={camera => assignCamera(camera)}>
                    {/* This needs to stay or the camera breaks who knows why */}
                    <Text>Flip</Text>
                </Camera>
            </View>
            {/* Back photo has to be first so that front photo gets rendered on top. */}
            {backPhoto.uri &&
                <Image
                    style={{ ...styles.backPhoto, width: width, height: height }}
                    source={{ uri: backPhoto.uri, width: backPhoto.width, height: backPhoto.height }}
                />
            }
            {frontPhoto.uri &&
                <Image
                    style={{ width: width * .4, height: width * .5, left: width * .5, top: width * .2, position: 'absolute' }}
                    source={{ uri: frontPhoto.uri, width: frontPhoto.width, height: frontPhoto.height }}
                />
            }
            {frontPhoto.uri && backPhoto.uri &&
                <View style={styles.input} >
                    <Button onPress={sendPhotos} title={sent ? 'sent!' : 'send'} disabled={takingPhoto || sent} />
                </View>
            }
            {!backPhoto.uri &&
                <View style={styles.input} >
                    <Button onPress={takePhotos} title="take photos" disabled={!cameraReady || takingPhoto} />
                </View>
            }
        </View>
    );
}