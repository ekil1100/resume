import cv from '~/resume.json'
import Link from '@/components/Link'
import {
    MaterialSymbolsMail,
    MdiGithub,
    MdiLinkedin,
    MdiTwitter,
    MdiWeb,
    CarbonGeneratePdf,
} from '@/icons'
import { ReactNode } from 'react'

const icons: Record<string, ReactNode> = {
    mail: <MaterialSymbolsMail className='text-xl' />,
    github: <MdiGithub className='text-xl' />,
    linkedin: <MdiLinkedin className='text-xl' />,
    twitter: <MdiTwitter className='text-xl' />,
    blog: <MdiWeb className='text-xl' />,
}

function Time({ startDate, endDate }: { startDate: string; endDate?: string }) {
    return (
        <time dateTime={startDate}>
            {new Date(startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
            })}
            {' - '}
            {endDate ? (
                <time dateTime={endDate}>
                    {new Date(endDate).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                    })}
                </time>
            ) : (
                'Present'
            )}
        </time>
    )
}

function App() {
    return (
        <div className='w-[52rem] p-12 mx-auto print:p-0'>
            <main className='relative mb-4'>
                <div className='absolute top-0 right-0 print:hidden'>
                    <a
                        href='/resume.pdf'
                        download={`Like_Resume_${cv.meta.lastModified}.pdf`}
                    >
                        <button className='p-2 rounded-sm hover:bg-gray-200 active:bg-gray-300'>
                            <CarbonGeneratePdf className='text-xl' />
                        </button>
                    </a>
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
                                    <li key={highlight}>{highlight}</li>
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
                                    <li key={highlight}>{highlight}</li>
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
                                    />
                                </div>
                            </div>
                            <div className='text-gray-500'>
                                {school.studyType} of {school.area}
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
                    href='https://resume.ekil.io'
                >
                    https://resume.ekil.io
                </Link>
                <small className='text-gray-500'>
                    {new Date(cv.meta.lastModified).toLocaleDateString(
                        'en-US',
                        {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                        },
                    )}
                </small>
            </footer>
        </div>
    )
}

export default App
