import cv from '~/resume.json'
import Link from '@/components/Link'
import {
    MaterialSymbolsMail,
    MdiGithub,
    MdiLinkedin,
    MdiTwitter,
    MdiWeb,
} from '@/icons'
import { ReactNode } from 'react'

const icons: Record<string, ReactNode> = {
    mail: <MaterialSymbolsMail className='text-xl' />,
    github: <MdiGithub className='text-xl' />,
    linkedin: <MdiLinkedin className='text-xl' />,
    twitter: <MdiTwitter className='text-xl' />,
    blog: <MdiWeb className='text-xl' />,
}

function App() {
    return (
        <main className='w-[48rem] p-8 m-4 mx-auto'>
            <section className='-ml-6 flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <h1>{cv.basics.name}</h1>
                    <div className='text-gray-500'>{cv.basics.label}</div>
                </div>
                <div className='flex gap-4 items-center'>
                    <Link
                        className='text-sm text-gray-600 w-max flex gap-1 items-center'
                        href={`mailto:${cv.basics.email}`}
                    >
                        {icons.mail}
                        {cv.basics.email.toUpperCase()}
                    </Link>
                    {cv.basics.profiles.map((profile) => (
                        <Link
                            key={profile.network}
                            href={profile.url}
                            className='text-sm text-gray-600 w-max flex gap-1 items-center'
                        >
                            {icons[profile.network.toLowerCase()]}
                            {profile.username.toUpperCase()}
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
                    <div key={job.name}>
                        <h3 className='text-lg'>{job.name}</h3>
                        <div className='text-gray-500 text-sm'>
                            {job.position}
                        </div>
                        <div className='text-gray-500 text-sm'>
                            {job.startDate} - {job.endDate}
                        </div>
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
                    <div key={project.name}>
                        <h3 className='text-lg'>{project.name}</h3>
                        <div className='text-gray-500 text-sm'>
                            {project.startDate} - {project.endDate}
                        </div>
                        <ul>
                            {project.highlights.map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
            <section>
                <h2>Skills</h2>
                <ul>
                    {cv.skills.map((skill) => (
                        <li key={skill.name}>
                            <h3 className='text-lg'>{skill.name}</h3>
                            <ul>
                                {skill.keywords.map((keyword) => (
                                    <li key={keyword}>{keyword}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Education</h2>
                {cv.education.map((school) => (
                    <div key={school.institution}>
                        <h3 className='text-lg'>{school.institution}</h3>
                        <div className='text-gray-500 text-sm'>
                            {school.area}
                        </div>
                        <div className='text-gray-500 text-sm'>
                            {school.startDate} - {school.endDate}
                        </div>
                        {/* <ul>
                            {school.courses.map((course) => (
                                <li key={course}>{course}</li>
                            ))}
                        </ul> */}
                    </div>
                ))}
            </section>
        </main>
    )
}

export default App
