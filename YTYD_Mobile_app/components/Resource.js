import React from "react";
import styled from "styled-components";

const Resource = (props) => (
    <Container>
        <Cover>
            <Image source={props.img} />
            {/* <Logo source={props.logo} resizeMode="contain" /> */}
            <Subtitle>{props.subtitle}</Subtitle>
            <Title>{props.title}</Title>
        </Cover>
        <Content>
            <Avatar source={props.avatar} />
            <Caption>{props.caption}</Caption>
            <Name>{props.name}</Name>
        </Content>
    </Container>
);

export default Resource;

const Container = styled.View`
    width: 335px;
    height: 335px;
    border-radius: 14px;
    background: white;
    margin: 10px 20px 
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    
`;

const Cover = styled.View`
    width: 100%;
    height: 260px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    overflow: hidden;
    justify-content: flex-end;
`;

const Subtitle = styled.Text`
    font-size:15px;
    font-weight: 500;
    color: rgba(255,255,255,0.80);
    text-transform: uppercase;
    margin-left: 20px;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: 600;
    color: white;    
    margin-top: 4px;
    margin-left: 20px;
    margin-bottom: 20px;
    width: 170px;
`;

const Content = styled.View`
    padding-left: 62px;
    height: 75px;
    justify-content: center;
`;

const Avatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background: black;
    position: absolute;
    top: 20px;
    left: 20px;
`;

const Caption = styled.Text`
    font-size: 14px;
    color: #3c4560;
    font-weight: 500;

`;

const Logo = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 24px;  
    position: absolute;
    top: 90px;  
    left: 50%;
    margin-left: -24px;
`;

const Image = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;

`;

const Name = styled.Text`
    color: #b8bece;
    margin-top: 4px;
    font-size: 13px;
    font-weight: 500;

`;
