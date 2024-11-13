import React, {createContext, useEffect} from 'react';
import {EntityId} from "@reduxjs/toolkit";
import {QuestionEntity, SURVEY_MODE} from "../../../redux/type";
import QuestionHeader from "./QuestionHeader";
import QuestionBody from "./QuestionBody";
import QuestionFooter from "./QuestionFooter";
import './Question.scss';
import {defaultQuestion, selectMode} from "../../../redux/survey";
import useClickOutside from "../../../hook/useClickOutside";
import cn from "classnames";
import {useSelector} from "react-redux";

// @ts-ignore
export const questionContext:React.Context<{
    sectionId: EntityId,
    question: QuestionEntity,
    isFocus: boolean
}> = createContext({
    sectionId: 0 as EntityId,
    question: defaultQuestion,
    isFocus: false
});

type QuestionProps = {
    sectionId: EntityId;
    question: QuestionEntity;
}

function Question({sectionId, question}: QuestionProps) {

    const mode = useSelector(selectMode);

    const [isFocus, setIsFocus] = React.useState<boolean>(false);

    const questionRef = useClickOutside({
        handler: () => {
            setIsFocus(false);
        }
    })

    useEffect(() => {
        if (mode === SURVEY_MODE.VIEW) {
            setIsFocus(false);
        }
    }, []);

    return (
        <questionContext.Provider value={{question, sectionId, isFocus}}>
            <div className={cn("question", {focus: isFocus})}
                 ref={questionRef}
                 onMouseDown={(e) => {
                     if (mode === SURVEY_MODE.EDIT) {
                         setIsFocus(true);
                     }
                 }}
            >
                <QuestionHeader/>
                <QuestionBody/>
                {isFocus && <QuestionFooter/>}
            </div>
        </questionContext.Provider>
    );
}

export default Question;
