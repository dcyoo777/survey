import React, {useCallback} from 'react';
import './Footer.scss';
import {useDispatch, useSelector} from "react-redux";
import {clearContext} from "./layout/RootLayout";
import {clearAnswers, selectAllSections} from "../../redux/survey";
import AnswerModal from "./modal/AnswerModal";
function Footer() {

    const dispatch = useDispatch();

    const {clear: clearInputs} = React.useContext(clearContext);

    const sections = useSelector(selectAllSections);

    const [isOpenAnswerModal, setIsOpenAnswerModal] = React.useState(false);

    const submit = useCallback(() => {
        const isFill = sections.every(section => section.questions.every(question => {
            console.log(question.isRequired, question.answer);
            return (!question.isRequired || question.answer !== "")
        }));

        if (!isFill) {
            alert("모든 필수 질문에 답변해주세요.");
            return
        }

        setIsOpenAnswerModal(true)

    }, [sections]);

    const clear = useCallback(() => {
        clearInputs();
        // @ts-ignore
        dispatch(clearAnswers());
    }, [clearInputs, dispatch]);

    return (
        <footer>
            <AnswerModal isOpen={isOpenAnswerModal} onClose={() => {setIsOpenAnswerModal(false)}} />
            <button className={"submit"} onClick={submit}>제출</button>
            <button className={"clear"} onClick={clear}>양식 지우기</button>
        </footer>
    );
}

export default Footer;
