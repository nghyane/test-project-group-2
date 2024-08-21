import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const API_URL = "https://6665b6afd122c2868e418159.mockapi.io/reply";

interface Comment {
    comment: string;
    name: string;
    questionId: string;
    id: string;
}

const Question: React.FC = () => {
    const { id: paramQuestionId } = useParams<{ id: string }>();
    const [questionTitle, setQuestionTitle] = useState<string | null>(null);
    const [questionDescription, setQuestionDescription] = useState<string | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [newUser, setNewUser] = useState<string>("");
    const [editCommentId, setEditCommentId] = useState<string | null>(null);
    const [editCommentText, setEditCommentText] = useState<string>("");

    useEffect(() => {
        fetchQuestion(paramQuestionId);
        fetchComments(paramQuestionId);
    }, [paramQuestionId]);

    const fetchQuestion = async (id: string) => {
        const response = await fetch(`https://6665b6afd122c2868e418159.mockapi.io/question`);
        const data = await response.json();
        const question = data.find((q: { id: string }) => q.id === id);
        setQuestionTitle(question ? question.title : "Loading question...");
        setQuestionDescription(question ? question.description : "Loading description...");
    };

    const fetchComments = async (questionId: string) => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setComments(data.filter((comment: Comment) => comment.questionId === questionId));
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === "" || newUser.trim() === "") {
            alert("Comment or Name empty")
            return;

        }


        const newCommentObj = {
            comment: newComment,
            name: newUser,
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
        setNewUser("");
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
        const confirmed = window.confirm("Are you sure you want to delete this comment?");
        if (!confirmed) return;

        await fetch(`${API_URL}/${commentId}`, {
            method: "DELETE",
        });

        fetchComments(paramQuestionId);
    };
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-1 py-10 px-6 w-full">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Question Details</h1>
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8 w-full">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">Question</h2>
                    <p className="text-lg text-gray-800 mb-2">{questionTitle || "Loading question..."}</p>
                    <p className="text-base text-gray-600">{questionDescription || "Loading description..."}</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8 w-full">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">Comments</h2>
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="p-6 border rounded-lg shadow-sm bg-gray-50 w-full">
                                <p className="text-lg font-semibold text-gray-900">{comment.name}</p>
                                {editCommentId === comment.id ? (
                                    <>
                                        <Textarea
                                            value={editCommentText}
                                            onChange={(e) => setEditCommentText(e.target.value)}
                                            placeholder="Edit your comment"
                                            rows={4}
                                            className="mt-2 mb-4 border rounded-lg w-full"
                                        />
                                        <div className="flex gap-4">
                                            <Button onClick={handleUpdateComment} className="bg-blue-500 text-white">Update</Button>
                                            <Button onClick={() => setEditCommentId(null)} className="bg-gray-300">Cancel</Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-base text-gray-700 mt-2">{comment.comment}</p>
                                        <div className="flex gap-3 mt-3">
                                            <Button
                                                onClick={() => handleEditComment(comment)}
                                                className="bg-gray-200 text-black px-3 py-1 rounded-md">
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="bg-gray-200 text-red-600 text-sm px-3 py-1 rounded-md">
                                                Delete
                                            </Button>

                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg w-full">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">Add a Comment</h2>
                    <input
                        type="text"
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
                        placeholder="Enter your name"
                        className="mb-4 p-2 border rounded-lg w-full"
                    />
                    <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Enter your comment"
                        rows={4}
                        className="mb-4 border rounded-lg w-full"
                    />
                    <Button onClick={handleCommentSubmit} className="bg-blue-500 text-white">Submit Comment</Button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Question;
