import React, {useCallback} from 'react';
import useClickOutside from "../../../hook/useClickOutside";
import {IoMdArrowDropdown} from "react-icons/io";
import './Select.scss';
import cn from "classnames";

export type SelectOptionId = number | string;

export type SelectOption = {
    id: SelectOptionId
    icon?: any;
    label: string;
}

export type SelectQuestionTypeProps = {
    selectedOptionId: SelectOptionId;
    setSelectedOptionId: (optionId: SelectOptionId) => void;
    options: SelectOption[];
}

function Select({selectedOptionId, setSelectedOptionId, options}: SelectQuestionTypeProps) {

    const [isSelectActive, setIsSelectActive] = React.useState(false);

    const activateSelect = useCallback(() => {
        setIsSelectActive(true);
    }, []);

    const onSelect = useCallback((optionId: SelectOptionId) => {
        setSelectedOptionId(optionId);
        setIsSelectActive(false);
    }, [setSelectedOptionId]);

    const selectRef = useClickOutside({
        handler: () => {
            setIsSelectActive(false)
        }
    })

    return (
        <div ref={selectRef} className={"select"}>
            <button className={"select-input"} onClick={activateSelect}>
                {options.find((option) => option.id === selectedOptionId)?.icon && options.find((option) => option.id === selectedOptionId)?.icon()}
                {options.find((option) => option.id === selectedOptionId)?.label}
                <div className={"select-input-dropdown"}>
                    <IoMdArrowDropdown />
                </div>
            </button>
            {isSelectActive && <div className={"select-options"}>
                {options.map((option) => {
                        return <button className={cn("select-options-button", {active: option.id === selectedOptionId})} key={option.id}
                                       onClick={() => onSelect(option.id)}>
                            {option.icon && option.icon()}
                            {option.label}
                        </button>
                    }
                )}
            </div>}
        </div>
    );
}

export default Select;
