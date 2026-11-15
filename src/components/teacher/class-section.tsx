import { Controller, useFormContext } from "react-hook-form"
import { subjectOptions } from "../../data/options"
import type { TeacherClassData } from "../../schemas/teacher"
import { maskCurrency } from "../../utils/masks"
import { FormSection } from "../form-section"
import { InputCustom } from "../input-custom"
import { Select } from "../select"

export function ClassSection() {
    const { register, control, formState: { errors } } = useFormContext<TeacherClassData>()

    return (
        <FormSection title="Sobre a aula">
            <div className="grid grid-cols-[1fr_13rem] gap-8">
                <div className="flex flex-col">
                    <Select
                        name="subject"
                        label="Matéria"
                        labelColor="text-text-complement"
                        bgColor="bg-white-shape"
                        optionDefault="Selecione qual você quer ensinar"
                        options={subjectOptions}
                        register={register}
                        error={errors.subject}
                    />
                </div>
                <Controller
                    name="cost"
                    control={control}
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col">
                            <InputCustom
                                name={field.name}
                                label="Custo da sua hora por aula"
                                labelColor="text-text-complement"
                                bgColor="bg-white-shape"
                                prefix="R$"
                                inputMode="numeric"
                                value={field.value}
                                onChange={event => field.onChange(maskCurrency(event.target.value))}
                                onBlur={field.onBlur}
                                error={fieldState.error}
                            />
                        </div>
                    )}
                />
            </div>
        </FormSection>
    )
}
