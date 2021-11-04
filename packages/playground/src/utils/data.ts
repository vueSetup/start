
type TimeDim = "month" | "quarterly" | "halfYear" | "year"

export const getLabels = (data: any[], field: string, type: TimeDim): string[] => {
    const filters = data.filter((item, index) => index % steps[type] === (data.length - 1) % steps[type])
    return filters.map(item => item[field])
}