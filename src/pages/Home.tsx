import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useQuestions } from "@/hooks/useQuestions";

const Home: React.FC = () => {
    const defaultQuestion = {
        title: "",
        description: "",
        username: "Anonymous"
    };

    const [question, setQuestion] = React.useState(defaultQuestion);
    const [errors, setErrors] = React.useState({
        title: "",
        description: ""
    });

    const { questions, fetchQuestions, createQuestion, deleteQuestion } = useQuestions();

    React.useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newErrors = {
            title: question.title ? "" : "Title is required",
            description: question.description ? "" : "Description is required"
        };

        if (newErrors.title || newErrors.description) {
            setErrors(newErrors);
            return;
        }

        createQuestion(question);
        setQuestion(defaultQuestion);
        setErrors({
            title: "",
            description: ""
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuestion({
            ...question,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 py-8 px-6">
                <Tabs defaultValue="intern">
                    <TabsList className="mb-4">
                        <TabsTrigger value="intern">Intern</TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>

                    <TabsContent value="intern">
                        <div className="grid gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ask a Question</CardTitle>
                                    <CardDescription>Share your questions and get answers from our team.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmission}>
                                        <div className="space-y-2">
                                            <div>
                                                <Label htmlFor="title">Title</Label>
                                                <Input
                                                    id="title"
                                                    placeholder="Enter your question"
                                                    value={question.title}
                                                    onChange={handleChange}
                                                    name="title"
                                                />
                                                {errors.title && <p className="text-red-600">{errors.title}</p>}
                                            </div>
                                            <div>
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    placeholder="Provide more details about your question"
                                                    rows={3}
                                                    value={question.description}
                                                    onChange={handleChange}
                                                    name="description"
                                                />
                                                {errors.description && <p className="text-red-600">{errors.description}</p>}
                                            </div>
                                        </div>
                                        <Button type="submit" className="mt-4">
                                            Ask Questions
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>My Questions</CardTitle>
                                    <CardDescription>View and manage the questions you've asked.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Questions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {questions.map((q) => (
                                                <TableRow key={q.id}>
                                                    <TableCell>
                                                        <Link to={`/q/${q.id}`} className="font-medium hover:underline">
                                                            {q.title}
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="admin">
                        <div className="grid gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Unanswered Questions</CardTitle>
                                    <CardDescription>Review and respond to questions from interns.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Questions</TableHead>
                                                <TableHead>Intern</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {questions.map((q) => (
                                                <TableRow key={q.id}>
                                                    <TableCell>
                                                        <Link to={`/q/${q.id}`} className="font-medium hover:underline">
                                                            {q.title}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="w-6 h-6 border">
                                                                <AvatarImage src="https://avatar.iran.liara.run/public/1" alt="Image" />
                                                                <AvatarFallback>
                                                                    <span>{q.username?.charAt(0).toUpperCase()}</span>
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <span>{q.username || "Anonymous"}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Button variant="ghost" size="icon" className="hover:bg-muted/50 rounded-full">
                                                                <FilePenIcon className="w-4 h-4" />
                                                                <span className="sr-only">Answer</span>
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="hover:bg-muted/50 rounded-full"
                                                                onClick={() => deleteQuestion(q.id!)}
                                                            >
                                                                <TrashIcon className="w-4 h-4" />
                                                                <span className="sr-only">Delete</span>
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
};

function FilePenIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
        </svg>
    );
}

function TrashIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    );
}

export default Home;
