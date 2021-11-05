
export type DataDim = "month" | "quarterly" | "halfYear" | "year"

const steps = {
    month: 7,
    quarterly: 15,
    halfYear: 30,
    year: 60
}

export const getLabels = (data: any[], field: string, type: DataDim): string[] => {
    const filters = data.filter((item, index) => index % steps[type] === (data.length - 1) % steps[type])
    return filters.map(item => item[field])
}