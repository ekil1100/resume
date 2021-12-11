import dayjs from 'dayjs'

export const toDate = (date: string) => dayjs(date).format('YYYY 年 M 月')
