import { Text } from './components/Text'
import data from './data/zh.json'

function App() {
  const { skills, experience, projects, education } = data

  return (
    <main className=''>
      <h1>{data.name}</h1>
      <h2>技能</h2>
    </main>
  )
}

export default App
