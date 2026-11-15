type FieldErrorMessageProps = {
    message?: string
}

export function FieldErrorMessage({ message }: FieldErrorMessageProps) {
    if (!message) return null

    return (
        <span role="alert" className="mt-1 font-poppins-regular text-xs text-red-500">
            {message}
        </span>
    )
}
