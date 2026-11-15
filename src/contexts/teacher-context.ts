import { createContext } from "react"
import type { TeacherProfileData } from "../schemas/teacher"

export type TeacherContextValue = {
    teacher: TeacherProfileData | null
    saveTeacher: (teacher: TeacherProfileData) => void
}

export const TeacherContext = createContext<TeacherContextValue | null>(null)
