'use client'
import { useEffect, useState } from 'react'
import { FaMoon } from 'react-icons/fa'
import { MdLightMode } from 'react-icons/md'

export default function ToggleTheme(): JSX.Element {
  const [darkMode, setDarkMode] = useState(true)
  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') setDarkMode(true)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <header className="absolute right-6 top-6 flex w-fit items-center gap-2">
      <button
        className="relative flex h-8 w-16 cursor-pointer items-center rounded-full bg-green-600 p-1 dark:bg-zinc-100"
        onClick={() => {
          setDarkMode(!darkMode)
        }}
      >
        <FaMoon className="text-white shadow-sm" size={18} />
        <div
          className="absolute h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 dark:bg-black"
          style={darkMode ? { left: '2px' } : { right: '2px' }}
        ></div>
        <MdLightMode className="ml-auto text-black shadow-sm" size={18} />
      </button>
    </header>
  )
}
