// import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, SafeAreaView, TouchableOpacity, Animated, Easing } from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import { sample_data } from "../sample_data";
// import { Ionicons } from "@expo/vector-icons";
import { NotificationIcon } from "../components/Icons";
import Tab from "../components/Tab";
import Resource from "../components/Resource";
import Menu from "../components/Menu";
import { connect } from "react-redux";

class HomeScreen extends React.Component {
    state = {
        scale: new Animated.Value(1),
        opacity: new Animated.Value(1),
    };

    componentDidUpdate() {
        this.toggleMenu();
    }

    toggleMenu = () => {
        if (this.props.action == "openMenu") {
            Animated.timing(this.state.scale, {
                toValue: 0.9,
                duration: 300,
                easing: Easing.in(),
                useNativeDriver: false,
            }).start();
            Animated.spring(this.state.opacity, {
                toValue: 0.5,
                useNativeDriver: false,
            }).start();
        }
        if (this.props.action == "closeMenu") {
            Animated.timing(this.state.scale, {
                toValue: 1,
                duration: 300,
                easing: Easing.in(),
                useNativeDriver: false,
            }).start();
            Animated.spring(this.state.opacity, {
                toValue: 1,
                useNativeDriver: false,
            }).start();
        }
    };

    render() {
        return (
            <RootView>
                <Menu />
                <AnimatedContainer
                    style={{
                        transform: [{ scale: this.state.scale }],
                        opacity: this.state.opacity,
                    }}
                >
                    <SafeAreaView>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <TitleBar>
                                <TouchableOpacity onPress={this.props.openMenu} style={{ position: "absolute" }}>
                                    <Avatar source={sample_data.user["avatar"]} />
                                </TouchableOpacity>

                                <Title>Welcome back, </Title>
                                <Name>{sample_data.user["name"]}</Name>
                                {/* <Ionicons name="ios-notifications" size={32} color="#4775f2" style={{position: "absolute", top: 5, right: 20}}/> */}
                                <NotificationIcon style={{ position: "absolute", top: 5, right: 20 }} />
                            </TitleBar>
                            <ScrollView
                                style={{
                                    flexDirection: "row",
                                    padding: 20,
                                    paddingLeft: 12,
                                    paddingTop: 30,
                                }}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {sample_data.logos.map((logo, i) => (
                                    <Tab key={"logo_" + i} text={logo.text} img={logo.img} />
                                ))}
                            </ScrollView>
                            <Subtitles>My Tasks</Subtitles>
                            <ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>
                                {sample_data.cards.map((card, i) => (
                                    <Card key={"card_" + i} title={card.title} caption={card.caption} subtitle={card.subtitle} local_img={card.local_img} img={card.img} />
                                ))}
                            </ScrollView>
                            <Subtitles>Resources</Subtitles>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {sample_data.resourceCards.map((card, i) => (
                                    <Resource key={i} img={card.img} logo={card.logo} subtitle={card.subtitle} title={card.title} avatar={card.avatar} caption={card.caption} name={card.name} />
                                ))}
                            </ScrollView>
                        </ScrollView>
                    </SafeAreaView>
                </AnimatedContainer>
            </RootView>
        );
    }
}

function mapStateToProps(state) {
    return { action: state.action };
}

function mapDispatchToProps(dispatch) {
    return {
        openMenu: () =>
            dispatch({
                type: "OPEN_MENU",
            }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const Subtitles = styled.Text`
    font-size: 15px;
    color: #b8bece;
    font-weight: 600;
    margin-left: 20px;
    margin-top: 20px;
    text-transform: uppercase;
`;

const Avatar = styled.Image`
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background: black;
    margin-left: 20px;
    top: 0;
    left: 0;
`;

const Container = styled.View`
    flex: 1;
    background-color: #f0f3f5;
    border-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const RootView = styled.View`
    flex: 1;
    background: black;
`;

const Title = styled.Text`
    font-size: 16px;
    color: #b8bece;
    font-weight: 500;
`;

const Name = styled.Text`
    color: #3c4560;
    font-size: 20px;
    font-weight: bold;
`;

const TitleBar = styled.View`
    width: 100%;
    margin-top: 50px;
    padding-left: 80px;
`;
