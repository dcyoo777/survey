import {QuestionOptionType} from "../../../../redux/type";
import React from "react";
import {useDrag} from "react-dnd";
import {RiDraggable} from "react-icons/ri";
import './QuestionOption.scss';


const QuestionOptionDrag = ({type, questionKey, option, children}: {type: string, questionKey: string, option: QuestionOptionType, children: React.ReactNode}) => {

    const [isHover, setIsHover] = React.useState<boolean>(false);

    const [{isDragging}, drag, preview] = useDrag(
        () => ({
            type: `${questionKey}-${type}`,
            item: {option},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [option],
    );

    return (
        <div ref={preview} className={"question-option-drag"}
             onMouseEnter={() => setIsHover(true)}
             onMouseLeave={() => setIsHover(false)}
        >
            {isHover && <div ref={drag} className={"question-option-handle"}>
                <RiDraggable />
            </div>}
            {children}
        </div>
    )
}

export default QuestionOptionDrag;
