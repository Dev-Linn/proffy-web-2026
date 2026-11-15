export function onlyDigits(value: string) {
    return value.replace(/\D/g, "")
}

export function maskPhone(value: string) {
    const digits = onlyDigits(value).slice(0, 11)

    if (digits.length === 0) return ""
    if (digits.length <= 2) return `(${digits}`
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 10) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function maskCurrency(value: string) {
    const digits = onlyDigits(value).replace(/^0+/, "").slice(0, 8)

    if (digits.length === 0) return ""

    const cents = digits.padStart(3, "0")
    const integer = cents.slice(0, -2)
    const decimal = cents.slice(-2)

    return `${Number(integer).toLocaleString("pt-BR")},${decimal}`
}

export function parseCurrency(value: string) {
    const digits = onlyDigits(value)
    return digits ? Number(digits) / 100 : 0
}
