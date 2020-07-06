import React from "react";
import styled from "styled-components";
import { WebView } from "react-native-webview";
import { Animated, Easing, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

export default class WebScreen extends React.Component {
    state = {
        top: new Animated.Value(screenHeight),
        opacity: new Animated.Value(0.5),
    };

    componentDidMount() {
        Animated.timing(this.state.top, {
            // animation properties for user profile / menu
            toValue: 54,
            duration: 600,
            easing: Easing.in(),
            useNativeDriver: false,
        }).start();
        Animated.spring(this.state.opacity, {
            toValue: 1,

            useNativeDriver: false,
        }).start();
    }

    render() {
        return (
            <AnimatedContainer style={{ top: this.state.top, opacity: this.state.opacity }}>
                <WebView source={{ uri: "https://expo.io" }} style={{ marginTop: 20, borderRadius: 14 }} />
            </AnimatedContainer>
        );
    }
}

const Container = styled.View`
    height: ${screenHeight}px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
