import React, {useCallback} from 'react';
import {EntityId} from "@reduxjs/toolkit";
import {QuestionEntity} from "../../../redux/type";
import {useDispatch} from "react-redux";
import {updateQuestion, updateSection} from "../../../redux/survey";
import './QuestionHeader.scss';

type QuestionHeaderProps = {
    sectionId: EntityId;
    question: QuestionEntity;
}

function QuestionHeader({sectionId, question}: QuestionHeaderProps) {

    const dispatch = useDispatch();

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

    return (
        <div className={"question-header"}>
            <div className={"question-header-top"}>
                <input className={"question-header-question"} name={"question"} value={question.question} onChange={onChange} placeholder={"질문"} />
                <div></div>
            </div>
            <input className={"question-header-description"} name={"description"} value={question.description} onChange={onChange} placeholder={"설명"}/>
        </div>
    );
}

export default QuestionHeader;
