import React, {useCallback} from 'react';
import {SectionType} from "../../../redux/type";
import {useDispatch} from "react-redux";
import {updateSection} from "../../../redux/survey";
import './SectionHeader.scss';

type SectionHeaderProps = {
    section: SectionType;
}

function SectionHeader({section}: SectionHeaderProps) {

    const dispatch = useDispatch();

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        dispatch(updateSection({
            ...section,
            [name]: value
        }));

    }, [dispatch]);

    return (
        <div className={"section-header"}>
            <input className={"section-header-title"} name={"title"} value={section.title} onChange={onChange} placeholder={"제목없는 설문지"}/>
            <input className={"section-header-description"} name={"description"} value={section.description} onChange={onChange} placeholder={"설문지 설명"}/>
        </div>
    );
}

export default SectionHeader;
