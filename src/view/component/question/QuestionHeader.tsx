import React, {useCallback, useContext} from 'react';
import {QuestionType} from "../../../redux/type";
import {useDispatch} from "react-redux";
import {updateQuestion} from "../../../redux/survey";
import './QuestionHeader.scss';
import SelectQuestionType from "./SelectQuestionType";
import {questionContext} from "./Question";

type QuestionHeaderProps = {}

function QuestionHeader() {

    const dispatch = useDispatch();
    const {sectionId, question} = useContext(questionContext);

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
                <input className={"question-header-question"} name={"question"} value={question.question} onChange={onChange} placeholder={"질문"} />
                <SelectQuestionType selectedQuestionType={question.type} setSelectedQuestionType={setSelectedQuestionType}/>
            </div>
            {question.isShowDescription && <input className={"question-header-description"} name={"description"} value={question.description} onChange={onChange} placeholder={"설명"}/>}
        </div>
    );
}

export default QuestionHeader;
