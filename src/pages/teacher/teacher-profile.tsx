import { zodResolver } from "@hookform/resolvers/zod"
import { Camera } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import { Navigate } from "react-router"
import { toast } from "sonner"

import backgroundPattern from '../../assets/background-finaly.svg'
import { FormCard } from "../../components/form-card"
import { FormFooter } from "../../components/form-footer"
import { FormSection } from "../../components/form-section"
import { InputCustom } from "../../components/input-custom"
import { PageHeader } from "../../components/page-header"
import { BioField } from "../../components/teacher/bio-field"
import { ClassSection } from "../../components/teacher/class-section"
import { ScheduleSection } from "../../components/teacher/schedule-section"
import { WhatsappField } from "../../components/teacher/whatsapp-field"
import { currentUser } from "../../data/current-user"
import { useTeacher } from "../../hooks/use-teacher"
import { teacherProfileSchema, type TeacherProfileData } from "../../schemas/teacher"

type ProfileFormProps = {
    teacher: TeacherProfileData
    onSave: (teacher: TeacherProfileData) => void
}

function ProfileForm({ teacher, onSave }: ProfileFormProps) {
    const form = useForm<TeacherProfileData>({
        resolver: zodResolver(teacherProfileSchema),
        mode: "onTouched",
        defaultValues: teacher
    })
    const { register, formState: { errors } } = form

    function handleSaveProfile(data: TeacherProfileData) {
        onSave(data)
        toast.success("Perfil atualizado com sucesso")
    }

    return (
        <FormProvider {...form}>
            <FormCard
                onSubmit={form.handleSubmit(handleSaveProfile)}
                footer={<FormFooter buttonTitle="Salvar cadastro" disabled={form.formState.isSubmitting} />}
            >
                <FormSection title="Seus dados">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col">
                            <InputCustom
                                name="name"
                                label="Nome"
                                labelColor="text-text-complement"
                                bgColor="bg-white-shape"
                                register={register}
                                error={errors.name}
                            />
                        </div>
                        <div className="flex flex-col">
                            <InputCustom
                                name="lastName"
                                label="Sobrenome"
                                labelColor="text-text-complement"
                                bgColor="bg-white-shape"
                                register={register}
                                error={errors.lastName}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr] gap-8 mt-6">
                        <div className="flex flex-col">
                            <InputCustom
                                name="email"
                                label="E-mail"
                                type="email"
                                labelColor="text-text-complement"
                                bgColor="bg-white-shape"
                                register={register}
                                error={errors.email}
                            />
                        </div>
                        <WhatsappField />
                    </div>
                    <BioField />
                </FormSection>

                <ClassSection />
                <ScheduleSection allowRemove />
            </FormCard>
        </FormProvider>
    )
}

export function TeacherProfile() {
    const { teacher, saveTeacher } = useTeacher()

    if (!teacher) {
        return <Navigate to="/give-classes" replace />
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-background antialiased">
            <PageHeader title="Meu perfil" />

            <div className="relative w-full flex justify-center overflow-hidden bg-purple pb-32">
                <img
                    src={backgroundPattern}
                    alt=""
                    className="absolute top-0 w-[69rem] max-w-none h-full object-cover opacity-80 pointer-events-none"
                />
                <div className="relative flex flex-col items-center mt-16">
                    <div className="relative">
                        <img
                            src={currentUser.avatarUrl}
                            alt={`Foto de ${teacher.name}`}
                            className="w-44 h-44 rounded-full"
                        />
                        <button
                            type="button"
                            aria-label="Alterar foto"
                            className="absolute bottom-1 right-1 w-12 h-12 flex items-center justify-center rounded-full bg-green hover:bg-green-dark transition cursor-pointer"
                        >
                            <Camera size={24} className="text-white" />
                        </button>
                    </div>
                    <strong className="mt-6 font-archivo-bold text-4xl text-white">
                        {teacher.name} {teacher.lastName}
                    </strong>
                    <span className="mt-2 font-poppins-regular text-2xl text-text-purple-base">
                        {teacher.subject}
                    </span>
                </div>
            </div>

            <ProfileForm teacher={teacher} onSave={saveTeacher} />
        </div>
    )
}
