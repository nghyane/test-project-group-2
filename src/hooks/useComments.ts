
import { useState, useEffect, useCallback } from "react";

const API_URL = "https://6665b6afd122c2868e418159.mockapi.io/reply";

const useComments = (questionId) => {
    const [comments, setComments] = useState([]);

    const fetchComments = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}?questionId=${questionId}`);
            const data = await response.json();
            // checkk data is array
            if (Array.isArray(data)) {
                setComments(data);
            } else {
                console.error('Fetched data is not an array', data);
                setComments([]);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            setComments([]);
        }
    }, [questionId]);
    

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    //add comment
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
    //update comment
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
//delete comment
    const deleteComment = async (commentId) => {
        await fetch(`${API_URL}/${commentId}`, {
            method: "DELETE",
        });
        fetchComments();
    };

    return { comments, addComment, updateComment, deleteComment };
};

export default useComments;
