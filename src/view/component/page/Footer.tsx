import React, {useCallback} from 'react';
import './Footer.scss';
import {useDispatch} from "react-redux";
import {clearAnswers} from "../../../redux/survey";
import {clearContext} from "../layout/RootLayout";

function Footer() {

    const dispatch = useDispatch();

    const {clear: clearInputs} = React.useContext(clearContext);

    const submit = useCallback(() => {
        console.log("submit");

    }, []);

    const clear = useCallback(() => {
        clearInputs();
        // @ts-ignore
        dispatch(clearAnswers());
    }, [clearInputs, dispatch]);

    return (
        <footer>
            <button className={"submit"} onClick={submit}>제출</button>
            <button className={"clear"} onClick={clear}>양식 지우기</button>
        </footer>
    );
}

export default Footer;
