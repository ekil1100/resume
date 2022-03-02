import * as React from 'react'
import * as ReactDOM from 'react-dom'
// eslint-disable-next-line import/no-unresolved
import 'virtual:windi.css'
// eslint-disable-next-line import/no-unresolved
import 'virtual:windi-devtools'
import 'sanitize.css'
import './index.css'
import App from './App'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
)
