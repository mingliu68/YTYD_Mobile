import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import WebScreen from "./screens/WebScreen";

const initialState = {
    action: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_MENU": 
            return { action: "openMenu" };
        case "CLOSE_MENU":
            return { action: "closeMenu" };
        default:
            return state
    }
};

const store = createStore(reducer);

const app = () => (
    
    <Provider store={store}>
        {/* <WebScreen /> */}
        <HomeScreen />
    </Provider>
)

export default app;
