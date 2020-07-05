// import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, SafeAreaView } from "react-native";
import styled from "styled-components";
import Card from "./components/Card";
import { sample_data } from "./sample_data";
// import { Ionicons } from "@expo/vector-icons";
import { NotificationIcon } from "./components/Icons";
import Tab from "./components/Tab";
import Resource from "./components/Resource";

export default function App() {
    return (
        <Container>
            <SafeAreaView>
                <ScrollView>
                    <TitleBar>
                        <Avatar source={sample_data.user["avatar"]} />
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
                        <Resource
                            img={require("./assets/background_1.jpg")}
                            logo={require("./assets/action_logo.jpg")}
                            subtitle="Useful resources for personal finance"
                            title="Finance"
                            avatar={require("./assets/avatar.jpg")}
                            caption="Let's talk about money"
                            name="Your Financial Advisor"
                        />
                    </ScrollView>
                </ScrollView>
            </SafeAreaView>
        </Container>
    );
}

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
    position: absolute;
    top: 0;
    left: 0;
`;

const Container = styled.View`
    flex: 1;
    background-color: #f0f3f5;
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
