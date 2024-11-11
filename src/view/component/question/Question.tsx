import React, {useCallback} from 'react';
import {EntityId} from "@reduxjs/toolkit";
import {QuestionEntity} from "../../../redux/type";
import QuestionHeader from "./QuestionHeader";
import QuestionBody from "./QuestionBody";
import QuestionFooter from "./QuestionFooter";
import './Question.scss';

type QuestionProps = {
    sectionId: EntityId;
    question: QuestionEntity;
}

function Question({sectionId, question}: QuestionProps) {

    return (
        <div className={"question"}>
            <QuestionHeader sectionId={sectionId} question={question}/>
            <QuestionBody sectionId={sectionId} question={question}/>
            <QuestionFooter sectionId={sectionId} question={question}/>
        </div>
    );
}

export default Question;
