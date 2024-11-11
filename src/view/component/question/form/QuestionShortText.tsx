import React from 'react';
import './QuestionShortText.scss';

type QuestionShortTextProps = {

}

function QuestionShortText({}) {

    return (
        <div className={"question-short-text"}>
            <input className={"question-short-text-input"} placeholder={"짧은 답변을 입력해주세요."}/>
        </div>
    );
}

export default QuestionShortText;
