import dayjs from 'dayjs'

/**
 * 千分位
 * @param value 
 * @param fixed 
 * @returns 
 */
export const thousands = (value: string | number, fixed = false) => {
    const number = typeof value === 'string' ? parseFloat(value) : value
    const floor = Math.floor(number * 100) / 100
    return String(fixed ? floor.toFixed(2) : floor).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 月份格式化：（两位，补0）月
 * @param value 
 * @returns 
 */
export const month = (value: string) => {
    const month = String(dayjs(value).month() + 1).padStart(2, '0')
    return `${month}月`
}

/**
 * 如果是周一的话，返回`月份-日期`，否则返回`Null`
 * @param value 
 */
export const monday = (value: string) => {
    return dayjs(value).format('dddd') === 'Monday' ? dayjs(value).format('MM.DD') : null
}