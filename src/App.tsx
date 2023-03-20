import mutEn from '~/public/i18n/en.json'
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
        if (Array.isArray(target) && Array.isArray(source)) {
            for (let i = 0; i < source.length; i++) {
                target[i] = deepMerge(target[i], source[i])
            }
        } else {
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = deepMerge(target[key], source[key])
                }
            }
        }
    } else {
        return source !== undefined ? source : target
    }
    return target
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

const cache = new Map<string, any>()

function App() {
    const search = new URLSearchParams(window.location.search)
    const [lang, setLang] = useState(search.get('lang') ?? 'en')
    const [cv, setCv] = useState(mutEn)

    useEffect(() => {
        fetch('/i18n/en.json').then((res) => {
            res.json().then((en) => {
                cache.set('en', en)
            })
        })

        fetch('/i18n/zh.json').then((res) => {
            res.json().then((zh) => {
                cache.set('zh', deepMerge(mutEn, zh))
            })
        })
    }, [])

    useEffect(() => {
        if (lang === 'zh') {
            if (cache.has('zh')) {
                setCv(cache.get('zh'))
            } else {
                fetch('/i18n/zh.json').then((res) => {
                    res.json().then((zh) => {
                        const v = deepMerge(mutEn, zh)
                        setCv(v)
                        cache.set('zh', v)
                    })
                })
            }
        } else {
            if (cache.has('en')) {
                setCv(cache.get('en'))
            } else {
                fetch('/i18n/en.json').then((res) => {
                    res.json().then((en) => {
                        setCv(en)
                        cache.set('en', en)
                    })
                })
            }
        }
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
        <div className='w-[52rem] p-12 mx-auto print:p-0'>
            <main className='relative mb-4'>
                <div className='absolute top-0 right-0 print:hidden'>
                    <a
                        href={`/resume_${lang}.pdf`}
                        download={`Like_Resume_${lang}_${cv.meta.lastModified}.pdf`}
                    >
                        <button className='p-2 rounded-sm hover:bg-gray-200 active:bg-gray-300'>
                            <CarbonGeneratePdf className='text-xl' />
                        </button>
                    </a>
                    <button
                        className='p-2 rounded-sm hover:bg-gray-200 active:bg-gray-300'
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
                    <div className='flex gap-4 items-center'>
                        <Link
                            className='text-sm text-gray-600 w-max flex gap-1 items-center'
                            href={`mailto:${cv.basics.email}`}
                        >
                            {icons.mail}
                            {cv.basics.email}
                        </Link>
                        {cv.basics.profiles.map((profile) => (
                            <Link
                                key={profile.network}
                                href={profile.url}
                                className='text-sm text-gray-600 w-max flex gap-1 items-center'
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
                <section>
                    <h2>Experience</h2>
                    {cv.work.map((job) => (
                        <div key={job.startDate} className='mb-6'>
                            <div className='flex justify-between items-center mb-1'>
                                <h3>
                                    <Link
                                        href={job.url}
                                        className='underline-offset-4 text-with-slashes'
                                    >
                                        {job.name}
                                    </Link>
                                </h3>
                                <div className='text-gray-500 text-sm'>
                                    <Time
                                        startDate={job.startDate}
                                        endDate={job.endDate}
                                        lang={lang}
                                    />
                                </div>
                            </div>
                            <div className='text-gray-500 flex justify-between'>
                                <p>{job.position}</p>
                                <p className='text-sm'>{job.location}</p>
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
                            <div className='flex justify-between items-center mb-1'>
                                <h3 className='text-with-slashes'>
                                    {project.name}
                                </h3>
                                <div className='text-gray-500 text-sm'>
                                    <Time
                                        startDate={project.startDate}
                                        endDate={project.endDate}
                                        lang={lang}
                                    />
                                </div>
                            </div>
                            <div className='text-gray-500 flex justify-between'>
                                <p>{project.roles.join(' & ')}</p>
                                <p className='text-sm'>{project.entity}</p>
                            </div>
                            <p>
                                {project.keywords.map((item) => (
                                    <span
                                        key={item}
                                        className='border border-black px-2 py-0.5 mr-2 text-sm'
                                    >
                                        {item}
                                    </span>
                                ))}
                            </p>
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
                            <div className='flex justify-between items-center mb-2'>
                                <h3 className='text-with-slashes'>
                                    <Link
                                        href={school.url}
                                        className='underline-offset-4 text-with-slashes'
                                    >
                                        {school.institution}
                                    </Link>
                                </h3>
                                <div className='text-gray-500 text-sm'>
                                    <Time
                                        startDate={school.startDate}
                                        endDate={school.endDate}
                                        lang={lang}
                                    />
                                </div>
                            </div>
                            <div className='text-gray-500'>
                                {lang === 'zh'
                                    ? `${school.area}${school.studyType}`
                                    : `${school.studyType} of ${school.area}`}
                            </div>
                        </div>
                    ))}
                </section>
                <section>
                    <h2>Skills</h2>
                    <div>
                        {cv.skills.map((skill) => (
                            <div
                                key={skill.name}
                                className='mb-4 flex justify-between items-center'
                            >
                                <div className='flex gap-2 items-baseline'>
                                    <h4>{skill.name}</h4>
                                    <small className='text-gray-500'>
                                        {skill.level}
                                    </small>
                                </div>
                                <div>
                                    {skill.keywords.map((item) => (
                                        <span
                                            key={item}
                                            className='border border-black px-2 py-0.5 mr-2 text-sm'
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
                    <h2>Languages</h2>
                    <div className='flex gap-4'>
                        {cv.languages.map((language) => (
                            <div
                                key={language.language}
                                className='flex gap-2 items-baseline mb-2'
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
            <footer className='flex flex-col justify-center items-center gap-1'>
                <Link
                    className='text-sm text-gray-500 print:hidden'
                    href='https://github.com/ekil1100/resume'
                >
                    Source Code
                </Link>
                <Link
                    className='text-sm text-gray-500 hidden print:block'
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
