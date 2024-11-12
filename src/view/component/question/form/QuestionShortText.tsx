import React, {useContext} from 'react';
import './QuestionShortText.scss';
import {questionContext} from "../Question";

function QuestionShortText() {

    const {sectionId, question} = useContext(questionContext);

    return (
        <div className={"question-short-text"}>
            <input className={"question-short-text-input"} placeholder={"짧은 답변을 입력해주세요."}/>
        </div>
    );
}

export default QuestionShortText;
