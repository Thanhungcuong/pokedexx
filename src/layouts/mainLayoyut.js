import React from 'react'
import { Outlet,Link } from 'react-router-dom'
const mainLayoyut = () => {
  return (
    <div>
    <header>
        <nav>
            <ul className='flex w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-20 justify-between'>
                <Link className='text-white text-2xl hover:bg-white hover:text-black mx-auto w-fit my-auto rounded-md p-4' to="/">
                <li >Home</li>
                </Link>

                <Link className='text-white text-2xl hover:bg-white hover:text-black mx-auto w-fit my-auto rounded-md p-4' to="/search">
                <li>Search</li>
                </Link>
                
                <Link className='text-white text-2xl hover:bg-white hover:text-black mx-auto w-fit my-auto rounded-md p-4' to="/detail">
                <li >Detail</li>
                </Link>

                <Link className='text-white text-2xl hover:bg-white hover:text-black mx-auto w-fit my-auto rounded-md p-4' to="/category">
                <li>Category</li>
                </Link>
            </ul>
        </nav>
    </header>
    <Outlet />

    <footer className='fixed left-0 bottom-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-20 flex justify-center items-center'>
        <p className='text-white text-xl'>Pokedex mady by ThanHungCuong for studying</p>
    </footer>
    </div>
  )
}

export default mainLayoyut