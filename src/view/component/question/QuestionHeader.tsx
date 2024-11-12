import React, {useCallback, useContext} from 'react';
import {QuestionType, SURVEY_MODE} from "../../../redux/type";
import {useDispatch, useSelector} from "react-redux";
import {selectMode, updateQuestion} from "../../../redux/survey";
import './QuestionHeader.scss';
import SelectQuestionType from "./SelectQuestionType";
import {questionContext} from "./Question";

function QuestionHeader() {

    const dispatch = useDispatch();

    const {sectionId, question} = useContext(questionContext);

    const mode = useSelector(selectMode);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        dispatch(updateQuestion({
            sectionId,
            question: {
                ...question,
                [name]: value
            }
        }));

    }, [dispatch, question, sectionId]);

    const setSelectedQuestionType = useCallback((questionType: QuestionType) => {
        dispatch(updateQuestion({
            sectionId,
            question: {
                ...question,
                type: questionType
            }
        }));
    }, [dispatch, question, sectionId])

    return (
        <div className={"question-header"}>
            <div className={"question-header-top"}>
                <input className={"question-header-question"} name={"question"} value={question.question} onChange={onChange} placeholder={"질문"} disabled={mode !== SURVEY_MODE.EDIT}/>
                {mode === SURVEY_MODE.EDIT && <SelectQuestionType selectedQuestionType={question.type} setSelectedQuestionType={setSelectedQuestionType}/>}
            </div>
            {question.isShowDescription && <input className={"question-header-description"} name={"description"} value={question.description} onChange={onChange} placeholder={"설명"} disabled={mode !== SURVEY_MODE.EDIT}/>}
        </div>
    );
}

export default QuestionHeader;
