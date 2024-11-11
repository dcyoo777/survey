import React, {useCallback} from 'react';
import {EntityId} from "@reduxjs/toolkit";
import {QuestionEntity} from "../../../redux/type";
import {useDispatch} from "react-redux";

type QuestionFooterProps = {
    sectionId: EntityId;
    question: QuestionEntity;
}

function QuestionFooter({sectionId, question}: QuestionFooterProps) {

    const dispatch = useDispatch();

    const onCopy = useCallback(() => {
        dispatch({type: "COPY_QUESTION", payload: {sectionId, question}});
    }, [dispatch]);

    return (
        <div>
            <button onClick={onCopy}>copy</button>
        </div>
    );
}

export default QuestionFooter;
