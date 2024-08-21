import { create } from 'zustand'

type Question = {
    id: number
    title: string
    description: string
}

type State = {
    questions: Question[]
    fetchQuestions: () => void
    deleteQuestion: (id: number) => void
}

export const useQuestions = create<State>((set) => ({
    questions: [],
    fetchQuestions: async () => {
        const response = await fetch('https://api.example.com/questions')
        const questions = await response.json()
        set({ questions })
    },
    deleteQuestion: async (id) => {
        await fetch(`https://api.example.com/questions/${id}`, {
            method: 'DELETE'
        })
        set((state) => ({
            questions: state.questions.filter((question) => question.id !== id)
        }))
    }
}))





