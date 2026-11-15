import { useFormContext, useWatch } from "react-hook-form"
import { BIO_MAX_LENGTH, type TeacherClassData } from "../../schemas/teacher"
import { TextArea } from "../text-area"

export function BioField() {
    const { register, control, formState: { errors } } = useFormContext<TeacherClassData>()
    const bio = useWatch({ control, name: "bio" }) ?? ""

    return (
        <div className="flex flex-col mt-6">
            <TextArea
                name="bio"
                label="Biografia"
                spanLabel={`(Máximo ${BIO_MAX_LENGTH} caracteres)`}
                labelColor="text-text-complement"
                bgColor="bg-white-shape"
                maxLength={BIO_MAX_LENGTH}
                register={register}
                error={errors.bio}
            />
            <span className="self-end mt-1 font-poppins-regular text-xs text-text-complement">
                {bio.length}/{BIO_MAX_LENGTH}
            </span>
        </div>
    )
}
