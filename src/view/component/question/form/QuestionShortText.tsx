import React, {useContext} from 'react';
import './QuestionShortText.scss';
import {questionContext} from "../Question";
import {useSelector} from "react-redux";
import {selectMode} from "../../../../redux/survey";
import {SURVEY_MODE} from "../../../../redux/type";

function QuestionShortText() {

    const {sectionId, question} = useContext(questionContext);

    const mode = useSelector(selectMode);

    return (
        <div className={"question-short-text"}>
            <input className={"question-short-text-input"} placeholder={"짧은 답변을 입력해주세요."} disabled={mode !== SURVEY_MODE.VIEW}/>
        </div>
    );
}

export default QuestionShortText;
