
import { useState, useEffect, useCallback } from "react";

const API_URL = "https://6665b6afd122c2868e418159.mockapi.io/reply";

const useComments = (questionId) => {
    const [comments, setComments] = useState([]);

    const fetchComments = useCallback(async () => {
        const response = await fetch(`${API_URL}?questionId=${questionId}`);
        const data = await response.json();
        setComments(data);
    }, [questionId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const addComment = async (newCommentObj) => {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCommentObj),
        });
        fetchComments();
    };

    const updateComment = async (commentId, editCommentText) => {
        await fetch(`${API_URL}/${commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment: editCommentText }),
        });
        fetchComments();
    };

    const deleteComment = async (commentId) => {
        await fetch(`${API_URL}/${commentId}`, {
            method: "DELETE",
        });
        fetchComments();
    };

    return { comments, addComment, updateComment, deleteComment };
};

export default useComments;
