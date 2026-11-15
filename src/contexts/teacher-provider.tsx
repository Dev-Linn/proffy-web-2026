import { useState, type ReactNode } from "react"
import type { TeacherProfileData } from "../schemas/teacher"
import { TeacherContext } from "./teacher-context"

const STORAGE_KEY = "@proffy:teacher"

function loadTeacher(): TeacherProfileData | null {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
}

export function TeacherProvider({ children }: { children: ReactNode }) {
    const [teacher, setTeacher] = useState<TeacherProfileData | null>(loadTeacher)

    function saveTeacher(data: TeacherProfileData) {
        setTeacher(data)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }

    return (
        <TeacherContext.Provider value={{ teacher, saveTeacher }}>
            {children}
        </TeacherContext.Provider>
    )
}
