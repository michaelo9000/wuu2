import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const [cameraReady, setCameraReady] = useState(false);
  const [camera, assignCamera] = useState();
  const [takingPhoto, setTakingPhoto] = useState(false);
  const [frontPhoto, setFrontPhoto] = useState({});
  const [backPhoto, setBackPhoto] = useState({});

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
    setType(CameraType.front);
    setTimeout(async () => {
      try {
        var frontPhoto = await camera.takePictureAsync();
      }
      catch (e) {
        alert(e);
      }
      setFrontPhoto(frontPhoto);

      setType(CameraType.back);

      setTimeout(async () => {
        try {
          var backPhoto = await camera.takePictureAsync();
        }
        catch (e) {
          alert(e);
        }
        setBackPhoto(backPhoto);

        setTakingPhoto(false);
      }, 20);
    }, 20);
  }

  const sendPhotos = () => {

  }

  return (
    <View styles={styles.container}>
      <View style={styles.camera}>
        <Camera
          type={type}
          onCameraReady={() => setCameraReady(true)}
          ref={camera => assignCamera(camera)}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(type === CameraType.back ? CameraType.front : CameraType.back);
              }}>
            </TouchableOpacity>
            <Text style={styles.text}> Flip </Text>
          </View>
        </Camera>
      </View>
      <View style={{ ...styles.flex, top: height * .7 }} >
        {frontPhoto.uri &&
          <Button onPress={sendPhotos} title="send" disabled={takingPhoto} />
        }
      </View>
      <View style={{ top: height - 60, height: 40 }} >
        <Button onPress={takePhotos} title="take photos" disabled={takingPhoto} />
      </View>
      <View style={styles.photo}>
        <Image style={{ maxWidth: width, maxHeight: height }}
          source={{ uri: backPhoto.uri, width: backPhoto.width, height: backPhoto.height }} />
        <Image style={{ width: width * .4, height: width * .5, left: width * .5, top: width * .2, position: 'absolute' }}
          source={{ uri: frontPhoto.uri, width: frontPhoto.width, height: frontPhoto.height }} />
      </View>
    </View>
  );
}

const baseStyles = {
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    border: '1px solid black',
  },
}

const styles = StyleSheet.create({
  flex: {
    ...baseStyles.flex
  },
  container: {
    ...baseStyles.container,
  },
  camera: {
    position: 'absolute',
    top: -20
  },
  photo: {
    position: 'absolute',
  }
});