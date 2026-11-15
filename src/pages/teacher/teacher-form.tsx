import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router"

import rocket from '../../assets/rocket.svg'
import { FormCard } from "../../components/form-card"
import { FormFooter } from "../../components/form-footer"
import { FormSection } from "../../components/form-section"
import { PageHeader } from "../../components/page-header"
import { BioField } from "../../components/teacher/bio-field"
import { ClassSection } from "../../components/teacher/class-section"
import { ScheduleSection } from "../../components/teacher/schedule-section"
import { WhatsappField } from "../../components/teacher/whatsapp-field"
import { currentUser } from "../../data/current-user"
import { useTeacher } from "../../hooks/use-teacher"
import { emptySchedule, teacherClassSchema, type TeacherClassData } from "../../schemas/teacher"

export function TeacherForm() {
    const navigate = useNavigate()
    const { saveTeacher } = useTeacher()

    const form = useForm<TeacherClassData>({
        resolver: zodResolver(teacherClassSchema),
        mode: "onTouched",
        defaultValues: {
            whatsapp: "",
            bio: "",
            subject: "",
            cost: "",
            schedules: [emptySchedule]
        }
    })

    function handleSaveTeacher(data: TeacherClassData) {
        saveTeacher({
            ...data,
            name: currentUser.name,
            lastName: currentUser.lastName,
            email: currentUser.email
        })
        navigate("/give-classes/success")
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-background antialiased">
            <PageHeader title="Dar aulas" />

            <div className="w-full flex justify-center bg-purple pb-32">
                <div className="w-full max-w-[736px] flex items-end justify-between mt-16">
                    <div>
                        <h1 className="font-archivo-bold text-4xl/tight text-white">
                            Que incrível que você<br />quer dar aulas.
                        </h1>
                        <p className="mt-6 font-poppins-regular text-base text-text-purple-base">
                            O primeiro passo, é preencher esse<br />formulário de inscrição.
                        </p>
                    </div>
                    <div className="flex items-center gap-5">
                        <img src={rocket} alt="" className="w-10 h-10" />
                        <span className="font-poppins-regular text-xs text-text-purple-base">
                            Preparare-se!<br />vai ser o máximo.
                        </span>
                    </div>
                </div>
            </div>

            <FormProvider {...form}>
                <FormCard
                    onSubmit={form.handleSubmit(handleSaveTeacher)}
                    footer={<FormFooter buttonTitle="Salvar cadastro" disabled={form.formState.isSubmitting} />}
                >
                    <FormSection title="Seus dados">
                        <div className="grid grid-cols-[1fr_14rem] gap-8 items-start">
                            <div className="flex items-center gap-6 h-full">
                                <img
                                    src={currentUser.avatarUrl}
                                    alt={`Foto de ${currentUser.name}`}
                                    className="w-20 h-20 rounded-full"
                                />
                                <strong className="font-archivo-bold text-xl text-text-title">
                                    {currentUser.name} {currentUser.lastName}
                                </strong>
                            </div>
                            <WhatsappField />
                        </div>
                        <BioField />
                    </FormSection>

                    <ClassSection />
                    <ScheduleSection />
                </FormCard>
            </FormProvider>
        </div>
    )
}
