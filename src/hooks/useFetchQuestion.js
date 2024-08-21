
import { useState, useEffect } from "react";

const useFetchQuestion = (questionId) => {
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionDescription, setQuestionDescription] = useState("");

    useEffect(() => {
        const fetchQuestion = async () => {
            const response = await fetch(`https://6665b6afd122c2868e418159.mockapi.io/question/${questionId}`);
            const data = await response.json();
            setQuestionTitle(data.title || "Loading question...");
            setQuestionDescription(data.description || "Loading description...");
        };

        fetchQuestion();
    }, [questionId]);

    return { questionTitle, questionDescription };
};

export default useFetchQuestion;
