import React, {useEffect} from 'react';
import './RootLayout.scss';
import Main from "../page/Main";
import Header from "../page/Header";
import {loadSurvey, selectSurvey} from "../../../redux/survey";
import {useDispatch, useSelector} from "react-redux";

function RootLayout() {

    const dispatch = useDispatch();

    const survey = useSelector(selectSurvey);

    const [isLoaded, setIsLoaded] = React.useState(false);

    useEffect(() => {
        const survey = localStorage.getItem("survey");
        if (survey) {
            dispatch(loadSurvey(JSON.parse(survey)));
        }
        setIsLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        if (survey) {
            console.log(survey);
            localStorage.setItem("survey", JSON.stringify(survey));
        }
    }, [survey]);

    if (!isLoaded) {
        return <div>로딩중...</div>
    }

    return (
        <div className={"root-layout"}>
            <Header/>
            <Main/>
        </div>
    );
}

export default RootLayout;
