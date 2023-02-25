import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/AntDesign'
import { lightFONTS, darkFONTS } from '../constants';

export default function CameraComponent({ navigation, route }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  console.log(route.params);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePicture = async () => {
    const data = await camera.takePictureAsync();
    if (route.params.updateProfile) return navigation.navigate('editProfile', { image: data.uri })
    else if (route.params.addThumbnailImage) return navigation.navigate('Add', { thumbnailImage: data.uri })
    else if (route.params.addImage) return navigation.navigate('Add', { image: data.uri })
    else return navigation.navigate('register', {  image: data.uri })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (route.params.updateProfile) return navigation.navigate('editProfile', { image: result.uri })
    else if (route.params.addThumbnailImage) return navigation.navigate('Add', { thumbnailImage: result.uri })
    else if (route.params.addImage) return navigation.navigate('Add', { image: result.uri })
    else return navigation.navigate('register', { image: result.uri })
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ratio="1:1" ref={(e) => setCamera(e)} type={type}>
        <TouchableOpacity onPress={() => {
          if (route.params.updateProfile) return navigation.navigate('editProfile')
          else if (route.params.addThumbnailImage) return navigation.navigate('Add')
          else if (route.params.addImage) return navigation.navigate('Add')
          else return navigation.navigate('register')
        }} 
        style={{
          position: 'absolute',
          top: 30,
          backgroundColor: 'white',
          borderRadius:40,
          padding: 10,
        }}
        >
          <Text style={{...lightFONTS.body3}}>Close</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Icon name="flip-camera-ios" color="white" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Icon name="camera" color="white" size={60} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Icons name="picture" color="white" size={30} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    // aspectRatio: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 30,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
