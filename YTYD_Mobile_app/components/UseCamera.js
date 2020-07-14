import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Text, View, Animated, Easing, TouchableOpacity, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";


const screenHeight = Dimensions.get("window").screenHeight;

const UseCamera = () => {
    const [top, setTop] = useState(new Animated.Value(0));
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    },[]);

    if (hasPermission === null) {
        return <View />
    }

    if(hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    return(
        <AnimatedContainer 
            style={{
                top: top
            }}
        >
            <TouchableOpacity 
                style={{
                    top: 60,
                    left:10,
                    zIndex: 120
                }}
                onPress = { () => {
                    Animated.timing(top, {
                        toValue: screenHeight,
                        duration: 300,
                        easing: Easing.in(),
                        useNativeDriver: false
                    }).start()
                }}
            >
                <CloseView>
                    <Ionicons name="ios-close" size={44} color="#546bfb" />
                </CloseView>
            </TouchableOpacity>
            <Camera 
                style={{flex: 1}} 
                type={type} 
                ref={ ref => setCameraRef(ref) }
            >
                <CameraView>
                    <TouchableOpacity
                        style={{
                            flex:0.1,
                            alignSelf: 'flex-end'
                        }}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18, 
                                marginBottom: 10,
                                color: 'white'
                            }}
                        >
                            Flip
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignSelf: 'center',
                            bottom: 30
                        }}
                        onPress={ async() => {
                            if(cameraRef) {
                                let photo = await cameraRef.takePictureAsync();
                                console.log('photo', photo)
                            }        
                        }}
                    >
                        <RoundOuter>
                            <RoundInner />
                        </RoundOuter>
                    </TouchableOpacity>
                </CameraView>
            </Camera>

        </AnimatedContainer>
    )
}

export default UseCamera;


const Container = styled.View`
    position: absolute;
    background: white;
    height: 100%;
    width: 100%;
    z-index: 100;
    border-radius: 10px;
    overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const CameraView = styled.View`
    flex: 1;
    background-color: transparent;
    justify-content: flex-end;
`;

const RoundOuter = styled.View`
    border-radius: 25px;
    border: 2px solid white;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RoundInner = styled.View`
    border-radius: 20px;
    border: 2px solid white;
    width: 40px;
    height: 40px;
    background-color: white;
`;

const CloseView = styled.View`
    width: 44px;
    height: 44px;
    background: white;
    justify-content: center;
    align-items: center;
    border-radius: 22px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;