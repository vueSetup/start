export const thousands = (value: string | number, fixed = false) => {
    const number = typeof value === 'string' ? parseFloat(value) : value
    const floor = Math.floor(number * 100) / 100
    return String(fixed ? floor.toFixed(2) : floor).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}