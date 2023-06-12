import en from '~/i18n/en.json'
import zh from '~/i18n/zh.json'
import Link from '@/components/Link'
import {
    MaterialSymbolsMail,
    MdiGithub,
    MdiLinkedin,
    MdiTwitter,
    MdiWeb,
    CarbonGeneratePdf,
    IconParkOutlineChinese,
    IconParkOutlineEnglish,
    PrimeExternalLink,
} from '@/icons'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'

const icons: Record<string, ReactNode> = {
    mail: <MaterialSymbolsMail className='text-xl' />,
    github: <MdiGithub className='text-xl' />,
    linkedin: <MdiLinkedin className='text-xl' />,
    twitter: <MdiTwitter className='text-xl' />,
    blog: <MdiWeb className='text-xl' />,
}

function dateString(
    options?: Intl.DateTimeFormatOptions,
    lang?: string,
    date?: string,
): string {
    const l = lang === 'zh' ? 'zh-CN' : 'en-US'
    const right = /([\u4e00-\u9fa5]+)([0-9a-zA-Z]+)/gm
    const left = /([0-9a-zA-Z]+)([\u4e00-\u9fa5]+)/gm
    return new Date(date ?? Date.now())
        .toLocaleDateString(l, options)
        .replace(right, '$1 $2')
        .replace(left, '$1 $2')
}

function Time({
    startDate,
    endDate,
    lang,
}: {
    startDate: string
    endDate?: string
    lang?: string
}) {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
    }

    return (
        <>
            <time dateTime={startDate}>
                {dateString(options, lang, startDate)}
            </time>
            {' - '}
            {endDate ? (
                <time dateTime={endDate}>
                    {dateString(options, lang, endDate)}
                </time>
            ) : lang === 'zh' ? (
                '现在'
            ) : (
                'Present'
            )}
        </>
    )
}

function deepMerge(target: any, source: any): any {
    if (
        typeof target === 'object' &&
        target !== null &&
        typeof source === 'object' &&
        source !== null
    ) {
        const newTarget = Array.isArray(target) ? [...target] : { ...target }

        if (Array.isArray(newTarget) && Array.isArray(source)) {
            for (let i = 0; i < source.length; i++) {
                newTarget[i] = deepMerge(newTarget[i], source[i])
            }
        } else {
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    newTarget[key] = deepMerge(newTarget[key], source[key])
                }
            }
        }
        return Object.freeze(newTarget)
    } else {
        return source !== undefined ? source : target
    }
}

function Markdown({ children }: { children: string }) {
    return (
        <ReactMarkdown
            components={{
                a: (props) => (
                    <Link
                        href={props.href}
                        target='_blank'
                        className='underline-offset-4'
                    >
                        {props.children}
                    </Link>
                ),
            }}
        >
            {children}
        </ReactMarkdown>
    )
}

const cache = new Map<string, typeof en>([
    ['en', en],
    ['zh', deepMerge(en, zh)],
])

function App() {
    const search = new URLSearchParams(window.location.search)
    const [lang, setLang] = useState(search.get('lang') ?? 'en')
    const [cv, setCv] = useState(cache.get(lang) ?? en)

    useEffect(() => {
        setCv(cache.get(lang) ?? en)
    }, [lang])

    const switchLang = () => {
        setLang((pre) => {
            if (pre === 'en') {
                return 'zh'
            } else {
                return 'en'
            }
        })
    }

    return (
        <div className='mx-auto max-w-[52rem] p-12 print:p-0 max-sm:p-10'>
            <main className='relative mb-4'>
                <div className='absolute top-0 right-0 print:hidden'>
                    <a
                        href={`/resume_${lang}.pdf`}
                        download={`Like_Resume_${lang}_${cv.meta.lastModified}.pdf`}
                    >
                        <button className='rounded-sm p-2 hover:bg-gray-200 active:bg-gray-300'>
                            <CarbonGeneratePdf className='text-xl' />
                        </button>
                    </a>
                    <button
                        className='rounded-sm p-2 hover:bg-gray-200 active:bg-gray-300'
                        onClick={switchLang}
                    >
                        {lang === 'en' ? (
                            <IconParkOutlineChinese className='text-xl' />
                        ) : (
                            <IconParkOutlineEnglish className='text-xl' />
                        )}
                    </button>
                </div>
                <section className='-ml-6 flex flex-col gap-4 print:items-center'>
                    <div className='flex flex-col gap-2 print:items-center'>
                        <h1>{cv.basics.name}</h1>
                        <div className='text-gray-500'>{cv.basics.label}</div>
                    </div>
                    <div className='flex flex-wrap items-center gap-4'>
                        <Link
                            className='flex w-max items-center gap-1 text-sm text-gray-600'
                            href={`mailto:${cv.basics.email}`}
                        >
                            {icons.mail}
                            {cv.basics.email}
                        </Link>
                        {cv.basics.profiles.map((profile) => (
                            <Link
                                key={profile.network}
                                href={profile.url}
                                className='flex w-max items-center gap-1 text-sm text-gray-600'
                            >
                                {icons[profile.network.toLowerCase()]}
                                {profile.username}
                            </Link>
                        ))}
                    </div>
                </section>
                <section>
                    <h2>About</h2>
                    <p>{cv.basics.summary}</p>
                </section>
                {/* Skills */}
                <section>
                    <h2>Skills</h2>
                    <div>
                        {cv.skills
                            .filter((v) => v.show ?? true)
                            .map((skill) => (
                                <div
                                    key={skill.name}
                                    className='mb-4 flex flex-wrap items-start justify-between gap-2'
                                >
                                    <div className='flex flex-col max-sm:w-full'>
                                        <h4>{skill.name}</h4>
                                        <small className='text-gray-500'>
                                            {skill.level}
                                        </small>
                                    </div>
                                    <div className='flex flex-wrap gap-2'>
                                        {skill.keywords.map((item) => (
                                            <span
                                                key={item}
                                                className='border border-black px-2 py-0.5 text-sm'
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
                <section>
                    <h2>Experience</h2>
                    {cv.work.map((job) => (
                        <div key={job.startDate} className='mb-6'>
                            <div className='mb-2 flex flex-wrap items-baseline justify-between gap-1 max-sm:mb-1'>
                                <h3 className='max-sm:w-full'>
                                    <Link
                                        href={job.url}
                                        className='text-with-slashes underline-offset-4'
                                    >
                                        {job.name}
                                    </Link>
                                </h3>
                                <div className='text-sm text-gray-500'>
                                    <Time
                                        startDate={job.startDate}
                                        endDate={job.endDate}
                                        lang={lang}
                                    />
                                </div>
                            </div>
                            <div className='mb-2 flex flex-wrap items-baseline justify-between gap-1 text-gray-500'>
                                <div className='max-sm:w-full max-sm:text-sm'>
                                    {job.position}
                                </div>
                                <div className='text-sm'>{job.location}</div>
                            </div>
                            <p className='text-gray-900'>{job.summary}</p>
                            <ul>
                                {job.highlights.map((highlight) => (
                                    <li key={highlight}>
                                        <Markdown>{highlight}</Markdown>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
                <section>
                    <h2>Projects</h2>
                    {cv.projects.map((project) => (
                        <div
                            key={project.startDate + project.name}
                            className='mb-6'
                        >
                            <div className='mb-2 flex flex-wrap items-baseline justify-between gap-1 max-sm:mb-1'>
                                <h3 className='text-with-slashes max-sm:w-full'>
                                    {project.name}
                                </h3>
                                <div className='text-sm text-gray-500'>
                                    <Time
                                        startDate={project.startDate}
                                        endDate={project.endDate}
                                        lang={lang}
                                    />
                                </div>
                            </div>
                            <div className='mb-2 flex flex-wrap items-baseline justify-between gap-1 text-gray-500'>
                                <div className='max-sm:w-full max-sm:text-sm'>
                                    {project.roles.join(' & ')}
                                </div>
                                <div className='text-sm'>{project.entity}</div>
                            </div>
                            <div className='mb-2 flex flex-wrap gap-2'>
                                {project.keywords.map((item) => (
                                    <span
                                        key={item}
                                        className='border border-black px-2 py-0.5 text-xs'
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                            <p className='text-gray-900'>
                                {project.description}
                            </p>
                            <ul>
                                {project.highlights.map((highlight) => (
                                    <li key={highlight}>
                                        <Markdown>{highlight}</Markdown>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
                <section>
                    <h2>Education</h2>
                    {cv.education.map((school) => (
                        <div key={school.institution} className='mb-6'>
                            <div className='mb-2 flex flex-wrap items-baseline justify-between gap-1 max-sm:mb-1'>
                                <h3 className='max-sm:w-full'>
                                    <Link
                                        href={school.url}
                                        className='text-with-slashes underline-offset-4'
                                    >
                                        {school.institution}
                                    </Link>
                                </h3>
                                <div className='text-sm text-gray-500'>
                                    <Time
                                        startDate={school.startDate}
                                        endDate={school.endDate}
                                        lang={lang}
                                    />
                                </div>
                            </div>
                            <div className='text-gray-500 max-sm:text-sm'>
                                {lang === 'zh'
                                    ? `${school.area}${school.studyType}`
                                    : `${school.studyType} of ${school.area}`}
                            </div>
                        </div>
                    ))}
                </section>
                <section>
                    <h2>Languages</h2>
                    <div className='flex flex-wrap items-center gap-4 max-sm:gap-2'>
                        {cv.languages.map((language) => (
                            <div
                                key={language.language}
                                className='flex items-baseline gap-2 max-sm:w-full'
                            >
                                <h4>{language.language}</h4>
                                <small className='text-gray-500'>
                                    {language.fluency}
                                </small>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <footer className='flex flex-col items-center justify-center gap-1'>
                <Link
                    className='text-sm text-gray-500 print:hidden'
                    href='https://github.com/ekil1100/resume'
                >
                    Source Code
                </Link>
                <Link
                    className='hidden text-sm text-gray-500 print:block'
                    href={`https://resume.ekil.io?lang=${lang}`}
                >
                    https://resume.ekil.io
                </Link>
                <small className='text-gray-500'>
                    {dateString(
                        {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                        },
                        lang,
                        cv.meta.lastModified,
                    )}
                </small>
            </footer>
        </div>
    )
}

export default App
