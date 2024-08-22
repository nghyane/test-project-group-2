import { create } from 'zustand';

type Question = {
    id?: number;
    title: string;
    description: string;
    username?: string;
};

type State = {
    questions: Question[];
    fetchQuestions: () => void;
    deleteQuestion: (id: number) => void;
    createQuestion: (question: Question) => void;
};

export const useQuestions = create<State>((set) => ({
    questions: [],
    fetchQuestions: async () => {
        try {
            const response = await fetch('https://6665b6afd122c2868e418159.mockapi.io/question?order=desc&sortBy=id');
            const questions = await response.json();

            set({ questions });
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    },
    createQuestion: async (question) => {
        try {
            const response = await fetch('https://6665b6afd122c2868e418159.mockapi.io/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(question),
            });
            const newQuestion = await response.json();

            set((state) => ({
                questions: [...state.questions, newQuestion],
            }));
        } catch (error) {
            console.error('Error creating question:', error);
        }
    },
    deleteQuestion: async (id) => {
        try {
            await fetch(`https://6665b6afd122c2868e418159.mockapi.io/question/${id}`, {
                method: 'DELETE',
            });

            set((state) => ({
                questions: state.questions.filter((question) => question.id !== id),
            }));
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    },
}));
