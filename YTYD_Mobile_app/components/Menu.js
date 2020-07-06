import React from "react";
import styled from "styled-components";
import { Animated, Easing, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sample_data } from "../sample_data";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";

const screenHeight = Dimensions.get("window").height;

class Menu extends React.Component {
    state = {
        top: new Animated.Value(screenHeight),
    };

    componentDidMount() {
        this.toggleMenu();
    }

    componentDidUpdate() {
        this.toggleMenu();
    }

    toggleMenu = () => {
        if (this.props.action == "openMenu") {
            Animated.timing(this.state.top, {
                // animation properties for user profile / menu
                toValue: 54,
                duration: 300,
                easing: Easing.in(),
                useNativeDriver: false,
            }).start();
        }
        if (this.props.action == "closeMenu") {
            Animated.spring(this.state.top, {
                toValue: screenHeight,
                duration: 300,
                easing: Easing.in(),
                useNativeDriver: false,
            }).start();
        }
    };

    render() {
        return (
            <AnimatedContainer style={{ top: this.state.top }}>
                <Cover>
                    <Image source={require("../assets/background_1.jpg")} />
                    <Title>{sample_data.user["name"] + " " + sample_data.user["lastName"]}</Title>
                    <Subtitle>{sample_data.user["role"]}</Subtitle>
                </Cover>
                <TouchableOpacity
                    onPress={this.props.closeMenu}
                    style={{
                        position: "absolute",
                        left: "50%",
                        marginLeft: -22,
                        top: 120,
                        zIndex: 1,
                        // boxShadow: "1px 2px 5px rbga(0, 0, 0, 0.15)"
                    }}
                >
                    <CloseView>
                        <Ionicons name="ios-close" size={44} color="#546bfb" />
                    </CloseView>
                </TouchableOpacity>
                <Content>
                    {sample_data.menuItems.map((item, i) => (
                        <MenuItem key={i} icon={item.icon} title={item.title} text={item.text} />
                    ))}
                    <MenuItem />
                </Content>
            </AnimatedContainer>
        );
    }
}

function mapStateToProps(state) {
    return { action: state.action };
}

function mapDispatchToProps(dispatch) {
    return {
        closeMenu: () =>
            dispatch({
                type: "CLOSE_MENU",
            }),
    };
}

// export default Menu;

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Container = styled.View`
    position: absolute;
    background: white;
    height: 100%;
    width: 100%;
    z-index: 100;
    border-radius: 10px;
    overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
    height: 142px;
    background: black;
    justify-content: center;
    align-items: center;
`;

const Content = styled.View`
    background: #f0f3f5;
    height: ${screenHeight}px;
    padding: 50px;
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

const Image = styled.Image`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const Title = styled.Text`
    font-size: 24px;
    color: white;
    font-weight: 600;
`;

const Subtitle = styled.Text`
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 8px;
`;
