import { Plus } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { weekDayOptions } from "../../data/options"
import { emptySchedule, type TeacherClassData } from "../../schemas/teacher"
import { FieldErrorMessage } from "../field-error"
import { FormSection } from "../form-section"
import { InputCustom } from "../input-custom"
import { Select } from "../select"

type ScheduleSectionProps = {
    allowRemove?: boolean
}

export function ScheduleSection({ allowRemove = false }: ScheduleSectionProps) {
    const { register, control, formState: { errors } } = useFormContext<TeacherClassData>()
    const { fields, append, remove } = useFieldArray({ control, name: "schedules" })

    const addScheduleButton = (
        <button
            type="button"
            onClick={() => append(emptySchedule)}
            className="flex items-center gap-2 font-archivo-semibold text-base text-purple hover:text-dark-purple transition cursor-pointer"
        >
            <Plus size={20} />
            Novo horário
        </button>
    )

    return (
        <FormSection title="Horários disponíveis" action={addScheduleButton}>
            {fields.map((field, index) => {
                const scheduleErrors = errors.schedules?.[index]
                const canRemove = allowRemove && fields.length > 1

                return (
                    <div key={field.id} className="mt-6 first:mt-0">
                        <div className="grid grid-cols-[2.5fr_1fr_1fr] gap-4">
                            <div className="flex flex-col">
                                <Select
                                    name={`schedules.${index}.weekDay`}
                                    label="Dia da semana"
                                    labelColor="text-text-complement"
                                    bgColor="bg-white-shape"
                                    optionDefault="Selecione o dia"
                                    options={weekDayOptions}
                                    register={register}
                                    error={scheduleErrors?.weekDay}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputCustom
                                    name={`schedules.${index}.from`}
                                    label="Das"
                                    type="time"
                                    labelColor="text-text-complement"
                                    bgColor="bg-white-shape"
                                    register={register}
                                    error={scheduleErrors?.from}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputCustom
                                    name={`schedules.${index}.to`}
                                    label="Até"
                                    type="time"
                                    labelColor="text-text-complement"
                                    bgColor="bg-white-shape"
                                    register={register}
                                    error={scheduleErrors?.to}
                                />
                            </div>
                        </div>

                        {canRemove && (
                            <div className="flex items-center gap-6 mt-6">
                                <span className="flex-1 h-px bg-gray-lines-in-white" />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="font-archivo-semibold text-sm text-red-500 hover:text-red-700 transition cursor-pointer"
                                >
                                    Excluir horário
                                </button>
                                <span className="flex-1 h-px bg-gray-lines-in-white" />
                            </div>
                        )}
                    </div>
                )
            })}
            <FieldErrorMessage message={errors.schedules?.root?.message ?? errors.schedules?.message} />
        </FormSection>
    )
}
