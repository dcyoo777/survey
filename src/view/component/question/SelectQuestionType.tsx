import React, {useCallback} from 'react';
import useClickOutside from "../../../hook/useClickOutside";
import {QUESTION_TYPE, QuestionType} from "../../../redux/type";
import {MdOutlineCheckBox, MdOutlineShortText} from "react-icons/md";
import {GrTextAlignFull} from "react-icons/gr";
import {IoIosArrowDropdown, IoMdArrowDropdown, IoMdRadioButtonOn} from "react-icons/io";
import './SelectQuestionType.scss';


const QUESTION_CONTENTS = [
    {
        type: QUESTION_TYPE.SHORT_TEXT,
        icon: () => <MdOutlineShortText/>,
        label: "단답형",
    },
    {
        type: QUESTION_TYPE.LONG_TEXT,
        icon: () => <GrTextAlignFull/>,
        label: "장문형",
    },
    {
        type: QUESTION_TYPE.RADIO_BUTTON,
        icon: () => <IoMdRadioButtonOn/>,
        label: "객관식 질문",
    },
    {
        type: QUESTION_TYPE.CHECKBOX,
        icon: () => <MdOutlineCheckBox/>,
        label: "체크박스",
    },
    {
        type: QUESTION_TYPE.SELECT,
        icon: () => <IoIosArrowDropdown/>,
        label: "드롭다운",
    },
]

type SelectQuestionTypeProps = {
    selectedQuestionType: QuestionType;
    setSelectedQuestionType: (questionType: QuestionType) => void;
}

function SelectQuestionType({selectedQuestionType, setSelectedQuestionType}: SelectQuestionTypeProps) {

    const [isSelectActive, setIsSelectActive] = React.useState(false);

    const activateSelect = useCallback(() => {
        setIsSelectActive(true);
    }, []);

    const onSelect = useCallback((questionType: QuestionType) => {
        setSelectedQuestionType(questionType);
        setIsSelectActive(false);
    }, []);

    const selectRef = useClickOutside({
        handler: () => {
            setIsSelectActive(false)
        }
    })

    return (
        <div ref={selectRef} className={"select-question-type"}>
            <button className={"select-question-type-input"} onClick={activateSelect}>
                {QUESTION_CONTENTS.find((questionContent) => questionContent.type === selectedQuestionType)?.icon()}
                {QUESTION_CONTENTS.find((questionContent) => questionContent.type === selectedQuestionType)?.label}
                <div className={"select-question-type-input-dropdown"}>
                    <IoMdArrowDropdown />
                </div>
            </button>
            {isSelectActive && <div className={"select-question-type-options"}>
                {QUESTION_CONTENTS.map((questionContent) => {
                        return <button className={"select-question-type-options-button"} key={questionContent.type}
                                       onClick={() => onSelect(questionContent.type as QuestionType)}>
                            {questionContent.icon()}
                            {questionContent.label}
                        </button>
                    }
                )}
            </div>}
        </div>
    );
}

export default SelectQuestionType;
