import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const API_URL = "https://6665b6afd122c2868e418159.mockapi.io/admin";

interface Comment {
    comment: string;
    name: string;
    questionId: string;
    id: string;
}

const Question: React.FC = () => {
    const { id: paramQuestionId } = useParams<{ id: string }>();
    const [questionTitle, setQuestionTitle] = useState<string | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [editCommentId, setEditCommentId] = useState<string | null>(null);
    const [editCommentText, setEditCommentText] = useState<string>("");

    useEffect(() => {
        fetchQuestion(paramQuestionId);
        fetchComments(paramQuestionId);
    }, [paramQuestionId]);

    const fetchQuestion = async (id: string) => {
        //get quesion
        const response = await fetch(`https://6665b6afd122c2868e418159.mockapi.io/test`);
        const data = await response.json();
        const question = data.find((q: { id: string }) => q.id === id);
        setQuestionTitle(question ? question.title : "Loading question...");
    };

    const fetchComments = async (questionId: string) => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setComments(data.filter((comment: Comment) => comment.questionId === questionId));
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === "") return;

        const newCommentObj = {
            comment: newComment,
            name: "New User",
            questionId: paramQuestionId,
            id: Date.now().toString(),
        };

        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCommentObj),
        });

        setNewComment("");
        fetchComments(paramQuestionId);
    };

    const handleEditComment = (comment: Comment) => {
        setEditCommentId(comment.id);
        setEditCommentText(comment.comment);
    };

    const handleUpdateComment = async () => {
        if (editCommentText.trim() === "") return;

        await fetch(`${API_URL}/${editCommentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment: editCommentText }),
        });

        setEditCommentId(null);
        setEditCommentText("");
        fetchComments(paramQuestionId);
    };

    const handleDeleteComment = async (commentId: string) => {
        await fetch(`${API_URL}/${commentId}`, {
            method: "DELETE",
        });

        fetchComments(paramQuestionId);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 py-8 px-6">
                <h1 className="text-2xl font-bold mb-4">Question</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Question Details</h2>
                    <p>{questionTitle || "Loading question..."}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Comments</h2>
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="p-4 border rounded-md">
                                <p className="text-lg font-bold">{comment.name}</p>
                                {editCommentId === comment.id ? (
                                    <>
                                        <Textarea
                                            value={editCommentText}
                                            onChange={(e) => setEditCommentText(e.target.value)}
                                            placeholder="Edit your comment"
                                            rows={3}
                                            className="mb-4"
                                        />
                                        <Button onClick={handleUpdateComment} className="mr-2">Update</Button>
                                        <Button onClick={() => setEditCommentId(null)}>Cancel</Button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-600">{comment.comment}</p>
                                        <div className="flex gap-2 mt-2">
                                            <Button onClick={() => handleEditComment(comment)} variant="ghost">
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDeleteComment(comment.id)} variant="ghost">
                                                Delete
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Add a Comment</h2>
                    <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Enter your comment"
                        rows={3}
                        className="mb-4"
                    />
                    <Button onClick={handleCommentSubmit}>Submit Comment</Button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Question;
