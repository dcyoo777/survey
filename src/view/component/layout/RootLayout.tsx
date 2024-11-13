import React, {createContext, useEffect} from 'react';
import './RootLayout.scss';
import Main from "../page/Main";
import {loadSurvey, selectMode, selectSurvey} from "../../../redux/survey";
import {useDispatch, useSelector} from "react-redux";
import {useDebouncedCallback} from "use-debounce";
import {SURVEY_MODE} from "../../../redux/type";
import Header from "../Header";
import Footer from "../Footer";

export const clearContext = createContext({
    state: true,
    clear: () => {}
});

function RootLayout() {

    const dispatch = useDispatch();

    const survey = useSelector(selectSurvey);
    const mode = useSelector(selectMode);

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [clearState, setClearState] = React.useState(true);

    const saveToLocalStorage = useDebouncedCallback(async (item: any) => {
        localStorage.setItem("survey", JSON.stringify(item));
    }, 1000)

    useEffect(() => {
        const survey = localStorage.getItem("survey");
        if (survey) {
            dispatch(loadSurvey(JSON.parse(survey)));
        }
        setIsLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        if (survey) {
            saveToLocalStorage(survey);
        }
    }, [saveToLocalStorage, survey]);

    if (!isLoaded) {
        return <div>로딩중...</div>
    }

    return (
        <clearContext.Provider value={{
            state: clearState,
            clear: () => {
                setClearState(false)
                setTimeout(() => {
                    setClearState(true)
                }, 1)
            }
        }}>
            <div className={"root-layout"}>
                <Header/>
                <Main/>
                {mode === SURVEY_MODE.VIEW && <Footer/>}
            </div>
        </clearContext.Provider>
    );
}

export default RootLayout;
