import React, {createContext, useCallback} from 'react';
import {EntityId} from "@reduxjs/toolkit";
import {QuestionEntity} from "../../../redux/type";
import QuestionHeader from "./QuestionHeader";
import QuestionBody from "./QuestionBody";
import QuestionFooter from "./QuestionFooter";
import './Question.scss';
import {defaultQuestion} from "../../../redux/survey";

export const questionContext:React.Context<{sectionId: EntityId, question: QuestionEntity}> = createContext({
    question: defaultQuestion,
    sectionId: 0 as EntityId
});

type QuestionProps = {
    sectionId: EntityId;
    question: QuestionEntity;
}

function Question({sectionId, question}: QuestionProps) {

    return (
        <questionContext.Provider value={{question, sectionId}}>
            <div className={"question"}>
                <QuestionHeader/>
                <QuestionBody/>
                <QuestionFooter/>
            </div>
        </questionContext.Provider>
    );
}

export default Question;
