import React from 'react'
import Navbar from '../layouts/Navbar'
import Main from '../layouts/Main'

const Home = () => {
    return (
        <div className="w-full flex flex-col min-h-screen bg-[#08080f] text-white">
            <Navbar />
            <Main />
        </div>
    )
}

export default Home