import { useArtist } from '@/app/hooks/useArtist'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface Search {
  search: string
  updateSearch: (search: string) => void
  error: string
  isError: boolean
}

function useSearch(): Search {
  const [search, updateSearch] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const isFirstInput = useRef<boolean>(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una artista vacía')
      setIsError(true)
      return
    }

    if (search.match(/^\d+$/) != null) {
      setError('No se puede buscar una artista con un número')
      setIsError(true)
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      setIsError(true)
      return
    }
    setIsError(false)
    setError('')
  }, [search])

  return { search, updateSearch, error, isError }
}

export default function SearchArtist(): JSX.Element {
  const { search, updateSearch, error } = useSearch()
  const [accessToken, setAccessToken] = useState('')
  const { artist, getArtist, loading } = useArtist({ search, accessToken })

  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET

  useEffect(() => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:
        'grant_type=client_credentials&client_id=' +
        CLIENT_ID +
        '&client_secret=' +
        CLIENT_SECRET,
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(async (response) => await response.json())
      .then((data) => {
        setAccessToken(data.access_token)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    getArtist({ search, accessToken })
      .then(() => {})
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newSearch = event.target.value
    updateSearch(newSearch)
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="submit"
      className="flex w-full flex-col gap-2 lg:flex-col"
    >
      <div className="flex w-full flex-col gap-2 lg:flex-row">
        <input
          type="text"
          placeholder="Search"
          name="query"
          value={search}
          onChange={handleChange}
          className="h-10 w-full rounded-md border-2 border-zinc-400 bg-zinc-200 px-4 outline-none focus:border-zinc-700 dark:border-zinc-500 dark:bg-zinc-700 dark:focus:border-zinc-100"
        />
        <p className="font-semibold text-rose-600 lg:hidden">{error}</p>
        <Link
          href="/artist"
          className="w-full rounded-md bg-green-600 px-6 py-2 font-bold text-zinc-200 hover:bg-green-700 lg:w-fit"
        >
          Buscar
        </Link>
      </div>
      <p className="hidden font-semibold text-rose-600 lg:block">{error}</p>
    </form>
  )
}
