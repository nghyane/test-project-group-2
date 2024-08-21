import React from "react";
import { useParams } from "react-router-dom";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

const Question: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    console.log(id);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 py-8 px-6">
                <h1>Question</h1>
            </main>
            
            <Footer />
        </div>
    );
}

export default Question;