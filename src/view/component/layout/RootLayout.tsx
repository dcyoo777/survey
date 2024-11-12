import React from 'react';
import './RootLayout.scss';
import Main from "../page/Main";
import Header from "../page/Header";

function RootLayout() {
    return (
        <div className={"root-layout"}>
            <Header/>
            <Main/>
        </div>
    );
}

export default RootLayout;
