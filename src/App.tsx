import React from 'react';
import './App.scss';
import {Provider} from "react-redux";
import store from "./redux";
import RootLayout from "./view/component/layout/RootLayout";

function App() {
    return (
        <Provider store={store}>
            <RootLayout/>
        </Provider>
    );
}

export default App;
