import { Controller, useFormContext } from "react-hook-form"
import type { TeacherClassData } from "../../schemas/teacher"
import { maskPhone } from "../../utils/masks"
import { InputCustom } from "../input-custom"

export function WhatsappField() {
    const { control } = useFormContext<TeacherClassData>()

    return (
        <Controller
            name="whatsapp"
            control={control}
            render={({ field, fieldState }) => (
                <div className="flex flex-col">
                    <InputCustom
                        name={field.name}
                        label="Whatsapp"
                        labelColor="text-text-complement"
                        bgColor="bg-white-shape"
                        type="tel"
                        inputMode="numeric"
                        placeholder="(  ) _ ____ ____"
                        value={field.value}
                        onChange={event => field.onChange(maskPhone(event.target.value))}
                        onBlur={field.onBlur}
                        error={fieldState.error}
                    />
                </div>
            )}
        />
    )
}
