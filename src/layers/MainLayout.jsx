import React from 'react'
import TopHeader from '../components/TopHeader'
import Header from '../components/Header'
import Filter from '../components/Filter'

function MainLayout({ children }) {
    return (
        <div>
            <TopHeader />
            <Header />
            <Filter />
            {children}
        </div>
    )
}

export default MainLayout
