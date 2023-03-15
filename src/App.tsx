import cv from '~/resume.json'

function App() {
    return (
        <main className='w-[48rem] p-8 m-4 mx-auto'>
            <section className='-ml-4 mb-8'>
                <h1>{cv.basics.name}</h1>
                <small className='text-gray-500'>{cv.basics.label}</small>
                <a
                    className='block text-sm underline underline-offset-2 decoration-dashed hover:font-extrabold'
                    href={`mailto:${cv.basics.email}`}
                >
                    {cv.basics.email}
                </a>
                <div>
                    {cv.basics.profiles.map((profile) => (
                        <a
                            key={profile.network}
                            href={profile.url}
                            className='text-blue-600 hover:text-blue-800 hover:underline'
                        >
                            {profile.network}
                        </a>
                    ))}
                </div>
            </section>
            <section>
                <h2>About</h2>
                <p>{cv.basics.summary}</p>
            </section>
        </main>
    )
}

export default App
