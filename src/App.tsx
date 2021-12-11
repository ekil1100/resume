import data from './data/zh.json'
import * as Icon from 'react-feather'
import { useEffect, useState } from 'react'
import { styled } from '@stitches/react'
import { css, darkTheme } from '../stitches.config'
import { rem } from 'polished'
import { Link } from './components/Link'
import { toDate } from './_utils/parseDate'
import ReactMarkdown from 'react-markdown'

const InfoWithIcon = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gap: rem(8),
  alignItems: 'center',
  svg: {
    width: rem(16),
    height: rem(16),
  },
})

const Tag = styled('div', {
  display: 'inline-block',
  borderRadius: rem(4),
  padding: `0 ${rem(8)}`,
  fontSize: rem(14),

  variants: {
    variant: {
      primary: {
        color: '$primary',
        background: '$primaryBackground',
        border: '1px solid $primaryBorder',
      },
      secondary: {
        color: '$secondary',
        background: '$secondaryBackground',
        border: '1px solid $secondaryBorder',
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        a: (props) => (
          <Link
            href={props.href}
            target='_blank'
            className='inline-grid grid-flow-col justify-start gap-1 items-center'
          >
            {props.children}
            <Icon.ExternalLink size={16} />
          </Link>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

const Button = styled('button', {
  background: '$background',
  color: '$text',
  cursor: 'pointer',
  padding: rem(8),
  borderRadius: rem(8),
  '&:hover': {
    background: '$backgroundHover',
  },
  '&:active': {
    background: '$backgroundActive',
  },
})

function App() {
  const { skills, experience, projects, education } = data
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem('isDarkMode') ?? 'false'),
  )

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add(darkTheme)
    } else {
      document.documentElement.classList.remove(darkTheme)
    }
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
  })

  return (
    <>
      <Button
        className='absolute top-4 right-4 no-print <md:hidden'
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? <Icon.Moon /> : <Icon.Sun />}
      </Button>
      <div className='max-w-screen-lg mx-auto py-12 px-10'>
        <header className='grid place-items-center grid-cols-1 px-4'>
          <h1>{data.name}</h1>
          <div className='w-full flex flex-wrap gap-4 justify-between'>
            <InfoWithIcon>
              <Icon.Smartphone />
              {data.phone}
            </InfoWithIcon>
            <InfoWithIcon>
              <Icon.Mail />
              <Link href={`mailto:${data.email}`}>{data.email}</Link>
            </InfoWithIcon>
            <InfoWithIcon>
              <Icon.Link2 />
              <Link href={`https://${data.blog}`} target='_blank'>
                {data.blog}
              </Link>
            </InfoWithIcon>
            <InfoWithIcon>
              <Icon.GitHub />
              <Link href={`https://github.com/${data.github}`} target='_blank'>
                {data.github}
              </Link>
            </InfoWithIcon>
            <InfoWithIcon>
              <Icon.Linkedin />
              <Link
                href={`https://www.linkedin.com/in/${data.linkedin}`}
                target='_blank'
              >
                {data.linkedin}
              </Link>
            </InfoWithIcon>
          </div>
        </header>
        <main className=''>
          <section>
            <h2>{skills.name}</h2>
            {skills.items.map((item, index) => {
              return (
                <div
                  className='flex flex-wrap justify-start items-center gap-2 my-2'
                  key={index}
                >
                  <span>{item.name}</span>
                  {item.stacks.map((stack, index) => {
                    return (
                      <Tag variant='secondary' key={index}>
                        {stack}
                      </Tag>
                    )
                  })}
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
                  <div className='flex flex-wrap gap-2 justify-start mb-4'>
                    <Tag>
                      {toDate(item.startDate)} ~ {toDate(item.endDate)}
                    </Tag>
                    {item.roles.map((role, index) => {
                      return <Tag key={index}>{role}</Tag>
                    })}
                  </div>
                  <ReactMarkdown>{item.description}</ReactMarkdown>
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
                  <div className='flex flex-wrap gap-2 justify-start mb-4'>
                    <Tag>
                      {toDate(item.startDate)} ~ {toDate(item.endDate)}
                    </Tag>
                    {item.roles.map((role, index) => {
                      return <Tag key={index}>{role}</Tag>
                    })}
                    {item.stacks.map((stack, index) => {
                      return (
                        <Tag variant='secondary' key={index}>
                          {stack}
                        </Tag>
                      )
                    })}
                  </div>
                  <ReactMarkdown>{item.brief}</ReactMarkdown>
                  <Markdown>{item.description}</Markdown>
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
                  <div className='flex flex-wrap gap-2 justify-start mb-4'>
                    <Tag>
                      {toDate(item.startDate)} ~ {toDate(item.endDate)}
                    </Tag>
                    <Tag>{item.major}</Tag>
                    <Tag>{item.degree}</Tag>
                  </div>
                </div>
              )
            })}
          </section>
        </main>
      </div>
    </>
  )
}

export default App
