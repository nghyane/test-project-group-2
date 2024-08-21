import { create } from 'zustand'

type Question = {
    id: number
    title: string
    description: string
}

type State = {
    questions: Question[]
    fetchQuestions: () => void
    deleteQuestion: (id: number) => void,
    createQuestion: (question: Question) => void
}

export const useQuestions = create<State>((set) => ({
    questions: [],
    fetchQuestions: async () => {
        const response = await fetch('https://6665b6afd122c2868e418159.mockapi.io/question')
        const questions = await response.json()
        console.log(questions)
        set({ questions })
    },
    createQuestion: async (question) => {
        const response = await fetch('https://api.example.com/questions', {
            method: 'POST',
            body: JSON.stringify(question)
        })
        const newQuestion = await response.json()
        set((state) => ({
            questions: [...state.questions, newQuestion]
        }))
    },
    deleteQuestion: async (id) => {
        await fetch(`https://6665b6afd122c2868e418159.mockapi.io/question${id}`, {
            method: 'DELETE'
        })
        set((state) => ({
            questions: state.questions.filter((question) => question.id !== id)
        }))
    }
}))





