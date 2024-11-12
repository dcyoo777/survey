import React, {useCallback, useContext} from 'react';
import {questionContext} from "../Question";
import {useDispatch, useSelector} from "react-redux";
import {selectMode, updateQuestion} from "../../../../redux/survey";
import {SURVEY_MODE} from "../../../../redux/type";
import './QuestionLongText.scss';

function QuestionLongText() {

    const dispatch = useDispatch();

    const {sectionId, question} = useContext(questionContext);

    const mode = useSelector(selectMode);

    const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        dispatch(updateQuestion({
            sectionId,
            question: {
                ...question,
                [name]: value
            }
        }));

    }, [dispatch, question, sectionId]);

    return (
        <div className={"question-long-text"}>
            <textarea className={"question-long-text-input"} name={'answer'} value={question.answer} onChange={onChange} placeholder={"답변을 입력해주세요."} disabled={mode !== SURVEY_MODE.VIEW}/>
        </div>
    );
}

export default QuestionLongText;
