import { z } from "zod"
import { onlyDigits, parseCurrency } from "../utils/masks"

export const BIO_MAX_LENGTH = 300

const scheduleSchema = z
    .object({
        weekDay: z.string().min(1, "Selecione o dia da semana"),
        from: z.string().min(1, "Informe o horário inicial"),
        to: z.string().min(1, "Informe o horário final")
    })
    .refine(schedule => !schedule.from || !schedule.to || schedule.to > schedule.from, {
        message: "O horário final deve ser depois do inicial",
        path: ["to"]
    })

export const teacherClassSchema = z.object({
    whatsapp: z
        .string()
        .refine(value => [10, 11].includes(onlyDigits(value).length), "Informe um WhatsApp válido com DDD"),
    bio: z
        .string()
        .trim()
        .min(1, "Escreva uma biografia")
        .max(BIO_MAX_LENGTH, `A biografia deve ter no máximo ${BIO_MAX_LENGTH} caracteres`),
    subject: z.string().min(1, "Selecione a matéria"),
    cost: z.string().refine(value => parseCurrency(value) > 0, "Informe o custo da hora por aula"),
    schedules: z.array(scheduleSchema).min(1, "Adicione pelo menos um horário")
})

export const teacherProfileSchema = teacherClassSchema.extend({
    name: z.string().trim().min(2, "Informe o nome"),
    lastName: z.string().trim().min(2, "Informe o sobrenome"),
    email: z.email("Informe um e-mail válido")
})

export type TeacherClassData = z.infer<typeof teacherClassSchema>
export type TeacherProfileData = z.infer<typeof teacherProfileSchema>
export type Schedule = TeacherClassData["schedules"][number]

export const emptySchedule: Schedule = { weekDay: "", from: "", to: "" }
