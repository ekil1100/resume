import dayjs from 'dayjs'

export const toDate = (lang: string) => (date: string) => lang === 'zh' ? dayjs(date).format('YYYY 年 M 月') : dayjs(date).format('MMM, YYYY')

export const formatDate = (lang: string) => (start: string) => (end: string) => {
    const startDate = toDate(lang)(start)
    const endDate = end ? toDate(lang)(end) : lang === 'en' ? 'Present' : '现在'
    return `${startDate} ~ ${endDate}`
}
