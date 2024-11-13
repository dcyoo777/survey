import React, {useCallback, useContext} from 'react';
import {QUESTION_TYPE, QuestionType, SURVEY_MODE} from "../../../redux/type";
import {useDispatch, useSelector} from "react-redux";
import {selectMode, updateQuestion} from "../../../redux/survey";
import './QuestionHeader.scss';
import {questionContext} from "./Question";
import {MdOutlineCheckBox, MdOutlineShortText} from "react-icons/md";
import {GrTextAlignFull} from "react-icons/gr";
import {IoIosArrowDropdown, IoMdRadioButtonOn} from "react-icons/io";
import Select, {SelectOptionId} from "../../component-library/select/Select";

const QUESTION_CONTENTS = [
    {
        id: QUESTION_TYPE.SHORT_TEXT,
        icon: () => <MdOutlineShortText/>,
        label: "단답형",
    },
    {
        id: QUESTION_TYPE.LONG_TEXT,
        icon: () => <GrTextAlignFull/>,
        label: "장문형",
    },
    {
        id: QUESTION_TYPE.RADIO_BUTTON,
        icon: () => <IoMdRadioButtonOn/>,
        label: "객관식 질문",
    },
    {
        id: QUESTION_TYPE.CHECKBOX,
        icon: () => <MdOutlineCheckBox/>,
        label: "체크박스",
    },
    {
        id: QUESTION_TYPE.SELECT,
        icon: () => <IoIosArrowDropdown/>,
        label: "드롭다운",
    },
]

function QuestionHeader() {

    const dispatch = useDispatch();

    const {sectionId, question, isFocus} = useContext(questionContext);

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

    const setSelectedQuestionType = useCallback((questionType: SelectOptionId) => {
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
                {!isFocus && question.isRequired &&
                    <span className={"question-header-required"}>*</span>}
                <input className={"question-header-question"} name={"question"} value={question.question}
                       onChange={onChange} placeholder={"질문"} disabled={mode !== SURVEY_MODE.EDIT}/>
                {mode === SURVEY_MODE.EDIT && isFocus && <Select selectedOptionId={question.type}
                                                      setSelectedOptionId={setSelectedQuestionType}
                                                      options={QUESTION_CONTENTS}
                />}
            </div>
            {question.isShowDescription &&
                <input className={"question-header-description"} name={"description"} value={question.description}
                       onChange={onChange} placeholder={"설명"} disabled={mode !== SURVEY_MODE.EDIT}/>}
        </div>
    );
}

export default QuestionHeader;
