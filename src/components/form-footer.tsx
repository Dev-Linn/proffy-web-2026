import attention from '../assets/attention.svg'
import { Button } from './button'

type FormFooterProps = {
    buttonTitle: string
    disabled?: boolean
}

export function FormFooter({ buttonTitle, disabled = false }: FormFooterProps) {
    return (
        <footer className="flex items-center justify-between gap-6 px-16 py-10 bg-white-shape border-t border-gray-lines-in-white rounded-b-lg">
            <p className="flex items-center gap-5 font-poppins-regular text-xs text-text-complement">
                <img src={attention} alt="Aviso importante" className="w-8 h-8" />
                <span>
                    <strong className="block font-poppins-regular font-normal text-purple">Importante!</strong>
                    Preencha todos os dados corretamente.
                </span>
            </p>
            <Button
                type="submit"
                title={buttonTitle}
                disabled={disabled}
                className="mt-0 w-auto px-10 py-4"
            />
        </footer>
    )
}
