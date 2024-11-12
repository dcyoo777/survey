import React, {createContext, useCallback} from 'react';
import {EntityId} from "@reduxjs/toolkit";
import {QuestionEntity, SURVEY_MODE} from "../../../redux/type";
import QuestionHeader from "./QuestionHeader";
import QuestionBody from "./QuestionBody";
import QuestionFooter from "./QuestionFooter";
import './Question.scss';
import {defaultQuestion, selectMode} from "../../../redux/survey";
import {useSelector} from "react-redux";

export const questionContext:React.Context<{sectionId: EntityId, question: QuestionEntity}> = createContext({
    question: defaultQuestion,
    sectionId: 0 as EntityId
});

type QuestionProps = {
    sectionId: EntityId;
    question: QuestionEntity;
}

function Question({sectionId, question}: QuestionProps) {

    const mode = useSelector(selectMode);

    return (
        <questionContext.Provider value={{question, sectionId}}>
            <div className={"question"}>
                <QuestionHeader/>
                <QuestionBody/>
                {mode === SURVEY_MODE.EDIT && <QuestionFooter/>}
            </div>
        </questionContext.Provider>
    );
}

export default Question;
