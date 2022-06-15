import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Content from '../components/layout/Content'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'

const App = props => (
    <div className='App'>
        <Router>
            <Header />
            <Content />
            <Footer />
        </Router>
    </div>
)

export default App
