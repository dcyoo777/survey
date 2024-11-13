import React, {useCallback, useEffect} from 'react';
import {SectionType, SURVEY_MODE} from "../../../redux/type";
import {useDispatch, useSelector} from "react-redux";
import {selectMode, updateSection} from "../../../redux/survey";
import './SectionHeader.scss';
import useClickOutside from "../../../hook/useClickOutside";
import cn from "classnames";

type SectionHeaderProps = {
    section: SectionType;
}

function SectionHeader({section}: SectionHeaderProps) {

    const dispatch = useDispatch();

    const mode = useSelector(selectMode);

    const [isFocus, setIsFocus] = React.useState<boolean>(false);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        dispatch(updateSection({
            ...section,
            [name]: value
        }));

    }, [dispatch, section]);

    const sectionHeaderRef = useClickOutside({
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
        <div ref={sectionHeaderRef}
             className={cn("section-header", {focus: isFocus})}
             onMouseDown={(e) => {
                 if (mode === SURVEY_MODE.EDIT) {
                     setIsFocus(true);
                 }
             }}
        >
            <input className={"section-header-title"} name={"title"} value={section.title} onChange={onChange}
                   placeholder={"제목없는 설문지"} disabled={mode !== SURVEY_MODE.EDIT}/>
            <input className={"section-header-description"} name={"description"} value={section.description}
                   onChange={onChange} placeholder={"설문지 설명"} disabled={mode !== SURVEY_MODE.EDIT}/>
        </div>
    );
}

export default SectionHeader;
