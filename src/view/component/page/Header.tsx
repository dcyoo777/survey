import React, {useCallback} from 'react';
import './Header.scss';
import {FaRegEye} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {selectMode, setMode} from "../../../redux/survey";
import {SURVEY_MODE} from "../../../redux/type";
import {FiEdit3} from "react-icons/fi";

function Header() {

    const dispatch = useDispatch();

    const mode = useSelector(selectMode);

    const onClickModeButton = useCallback(() => {
        dispatch(setMode({mode: mode === SURVEY_MODE.EDIT ? SURVEY_MODE.VIEW : SURVEY_MODE.EDIT}))
    }, [dispatch, mode])

    return (
        <header>
            <h1>Survey</h1>
            <button className={"mode-button"} onClick={onClickModeButton} >
                {mode === SURVEY_MODE.EDIT && <FaRegEye />}
                {mode === SURVEY_MODE.VIEW && <FiEdit3 />}
            </button>
        </header>
    );
}

export default Header;
