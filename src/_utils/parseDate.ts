import { format, parseISO } from 'date-fns'

export const toDate = (date: string) => {
    const parsedDate = parseISO(date)
    return format(parsedDate, 'yyyy 年 M 月')
}
