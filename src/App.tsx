import data from './data/zh.json'
import {
  FiGithub,
  FiLink2,
  FiLinkedin,
  FiMail,
  FiSmartphone,
} from 'react-icons/fi'
import { FaMobileAlt, FaEnvelope } from 'react-icons/fa'
import { useEffect } from 'react'

function InfoWithIcon({ icon, text }: { icon: JSX.Element; text: string }) {
  return (
    <div className='grid grid-flow-col gap-1 place-items-center'>
      {icon}
      {text}
    </div>
  )
}

function App() {
  const { skills, experience, projects, education } = data

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.classList.add('dark')
    else document.documentElement.classList.add('light')
  })

  return (
    <div className='w-screen-md mx-auto my-5 py-12 px-10'>
      <header className='grid justify-center justify-items-center grid-cols-1'>
        <h1 className='text-teal-600'>{data.name}</h1>
        <div className='w-full grid grid-flow-col justify-between content-center'>
          <InfoWithIcon icon={<FaMobileAlt />} text={data.phone} />
          <InfoWithIcon icon={<FaEnvelope />} text={data.email} />
          <InfoWithIcon icon={<FiLink2 />} text={data.blog} />
          <InfoWithIcon icon={<FiGithub />} text={data.github} />
          <InfoWithIcon icon={<FiLinkedin />} text={data.linkedin} />
        </div>
      </header>
      <main className=''>
        <section>
          <h2>{skills.name}</h2>
          {skills.items.map((item, index) => {
            return (
              <div key={index}>
                <span>{item.name}</span>：<span>{item.stacks}</span>
              </div>
            )
          })}
        </section>
        <section>
          <h2>{experience.name}</h2>
          {experience.items.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item.name}</h3>
                <div>
                  {item.startDate} ~ {item.endDate}
                </div>
                <div>{item.roles}</div>
                <div>{item.description}</div>
              </div>
            )
          })}
        </section>
        <section>
          <h2>{projects.name}</h2>
          {projects.items.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item.name}</h3>
                <div>
                  {item.startDate} ~ {item.endDate}
                </div>
                <div>{item.roles}</div>
                <div>{item.stacks}</div>
                <div>{item.brief}</div>
                <div>{item.description}</div>
              </div>
            )
          })}
        </section>
        <section>
          <h2>{education.name}</h2>
          {education.items.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item.name}</h3>
                <div>
                  {item.startDate} ~ {item.endDate}
                </div>
                <div>{item.major}</div>
                <div>{item.degree}</div>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default App
