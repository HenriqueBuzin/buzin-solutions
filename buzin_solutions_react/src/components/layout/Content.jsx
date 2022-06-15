import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../../views/components/Home'

const Content = props => (
    <div className='Content'>
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    </div>
)

export default Content
