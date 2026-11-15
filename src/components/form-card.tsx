import type { FormHTMLAttributes, ReactNode } from "react"

interface FormCardProps extends FormHTMLAttributes<HTMLFormElement> {
    footer: ReactNode
    children: ReactNode
}

export function FormCard({ footer, children, ...rest }: FormCardProps) {
    return (
        <form
            {...rest}
            noValidate
            className="relative w-full max-w-[736px] mx-auto -mt-16 mb-16 bg-white rounded-lg shadow-[0_4px_24px_rgba(50,38,77,0.08)] border border-gray-lines-in-white"
        >
            <div className="px-16 pt-16 pb-14">
                {children}
            </div>
            {footer}
        </form>
    )
}
