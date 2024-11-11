import React, {useCallback} from 'react';
import {SectionType} from "../../../redux/type";
import {useDispatch} from "react-redux";
import {updateSection} from "../../../redux/survey";

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
        <div>
            <input name={"title"} value={section.title} onChange={onChange} />
            <input name={"description"} value={section.description} onChange={onChange}/>
        </div>
    );
}

export default SectionHeader;
