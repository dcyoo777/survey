import React, {useCallback} from 'react';
import {EntityId} from "@reduxjs/toolkit";
import {QuestionEntity} from "../../../redux/type";
import {useDispatch} from "react-redux";
import {updateQuestion, updateSection} from "../../../redux/survey";

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

    }, [dispatch]);

    return (
        <div>
            <input name={"title"} value={question.question} onChange={onChange} />
            <input name={"description"} value={question.description} onChange={onChange}/>
        </div>
    );
}

export default QuestionHeader;
