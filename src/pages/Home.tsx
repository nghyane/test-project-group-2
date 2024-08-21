import React from "react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import Header from "@/components/layout/Header"
import Footer from "components/layout/Footer";


const Home: React.FC = () => (
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
                                <form>
                                    <div className="space-y-2">
                                        <div>
                                            <Label htmlFor="title">Title</Label>
                                            <Input id="title" placeholder="Enter your question" />
                                        </div>
                                        <div>
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea id="description" placeholder="Provide more details about your question" rows={3} />
                                        </div>
                                    </div>
                                    <Button type="submit" className="mt-4">
                                        Ask Question
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
                                            <TableHead>Title</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Link to="/q/1" className="font-medium hover:underline">
                                                    How to set up a React project?
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">Pending</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="icon" className="hover:bg-muted/50 rounded-full">
                                                        <FilePenIcon className="w-4 h-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="hover:bg-muted/50 rounded-full">
                                                        <TrashIcon className="w-4 h-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Link to="/q/1" className="font-medium hover:underline">
                                                    What is the difference between useState and useEffect?
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">Pending</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="icon" className="hover:bg-muted/50 rounded-full">
                                                        <FilePenIcon className="w-4 h-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="hover:bg-muted/50 rounded-full">
                                                        <TrashIcon className="w-4 h-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
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
                                            <TableHead>Title</TableHead>
                                            <TableHead>Intern</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Link to="/q/1" className="font-medium hover:underline">
                                                    How to set up a React project?
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="w-6 h-6 border">
                                                        <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                                                        <AvatarFallback>JD</AvatarFallback>
                                                    </Avatar>
                                                    <span>John Doe</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="icon" className="hover:bg-muted/50 rounded-full">
                                                        <FilePenIcon className="w-4 h-4" />
                                                        <span className="sr-only">Answer</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="hover:bg-muted/50 rounded-full">
                                                        <TrashIcon className="w-4 h-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Link to="/q/1" className="font-medium hover:underline">
                                                    What is the difference between useState and useEffect?
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="w-6 h-6 border">
                                                        <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                                                        <AvatarFallback>JD</AvatarFallback>
                                                    </Avatar>
                                                    <span>Jane Doe</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="icon" className="hover:bg-muted/50 rounded-full">
                                                        <FilePenIcon className="w-4 h-4" />
                                                        <span className="sr-only">Answer</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="hover:bg-muted/50 rounded-full">
                                                        <TrashIcon className="w-4 h-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
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
)




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
    )
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
    )
}

export default Home;
