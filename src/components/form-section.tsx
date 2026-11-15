import type { ReactNode } from "react"

type FormSectionProps = {
    title: string
    action?: ReactNode
    children: ReactNode
}

export function FormSection({ title, action, children }: FormSectionProps) {
    return (
        <fieldset className="mt-16 first:mt-0">
            <legend className="w-full flex items-center justify-between pb-4 border-b border-gray-lines-in-white">
                <span className="font-archivo-semibold text-2xl text-text-title">{title}</span>
                {action}
            </legend>
            <div className="mt-6">
                {children}
            </div>
        </fieldset>
    )
}
