import React, {useCallback, useContext} from 'react';
import {QUESTION_TYPE} from "../../../redux/type";
import QuestionShortText from "./form/QuestionShortText";
import QuestionLongText from "./form/QuestionLongText";
import QuestionRadioButton from "./form/QuestionRadioButton";
import QuestionCheckbox from "./form/QuestionCheckbox";
import QuestionSelect from "./form/QuestionSelect";
import {questionContext} from "./Question";
import "./QuestionBody.scss";

function QuestionBody() {

    const {question} = useContext(questionContext);

    const content = useCallback(() => {
        switch (question.type) {
            case QUESTION_TYPE.SHORT_TEXT:
                return <QuestionShortText />;
            case QUESTION_TYPE.LONG_TEXT:
                return <QuestionLongText />;
            case QUESTION_TYPE.RADIO_BUTTON:
                return <QuestionRadioButton />;
            case QUESTION_TYPE.CHECKBOX:
                return <QuestionCheckbox />;
            case QUESTION_TYPE.SELECT:
                return <QuestionSelect />;
            default:
                return null;
        }
    }, [question]);

    return (
        <div className={"question-body"}>
            {content()}
        </div>
    );
}

export default QuestionBody;
