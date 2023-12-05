'use client'
import ThemeToggle from '@/app/components/ThemeToggle'
import Image from 'next/image'
import { FaHeadphones, FaHeart } from 'react-icons/fa'

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

export default function ArtistPage(): JSX.Element {
  const { search, updateSearch, error } = useSearch()
  const [accessToken, setAccessToken] = useState('')
  const { artist, getArtist } = useArtist({ search, accessToken })

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
  }, [CLIENT_ID, CLIENT_SECRET])

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
    <section className="flex w-full max-w-7xl flex-col gap-4 text-zinc-100">
      <ThemeToggle />
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
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-md bg-green-600 px-8 py-2 font-bold lg:w-fit"
          >
            Buscar
          </button>
        </div>
        <p className="hidden font-semibold text-rose-600 lg:block">{error}</p>
      </form>
      <section className="flex flex-col items-start justify-between gap-2 rounded-md bg-gradient-to-b from-green-600 to-emerald-800 p-8 lg:flex-row">
        <div className="mx-auto flex flex-col gap-2 lg:w-2/3">
          <Image
            width={1000}
            height={1000}
            src={
              artist?.imageUrl != null ? artist?.imageUrl : '/userDefault.png'
            }
            className="mx-auto w-full rounded-md sm:w-2/3 lg:hidden"
            alt="Imagen del artista"
          />
          <h1 className="">{artist?.name}</h1>
          <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
            <div className="flex items-center gap-2 lg:flex-col lg:items-start">
              <h3>Seguidores</h3>
              <span>{artist?.followers}</span>
            </div>
            <div className="flex items-center gap-2 lg:flex-col lg:items-start">
              <h3>Popularidad</h3>
              <div className="flex items-center gap-2">
                <span>{artist?.popularity}/100</span>
                <FaHeart />
              </div>
            </div>
            <div className="flex gap-2 sm:items-center lg:flex-col lg:items-start">
              <h3>Géneros</h3>
              <p className="">
                {artist?.genres.map((genre) => {
                  return (
                    <span className="mx-1 inline-flex" key={genre}>
                      {genre}
                    </span>
                  )
                })}
              </p>
            </div>
          </div>
          <Link
            target="_blank"
            href={artist?.spotifyLink != null ? artist?.spotifyLink : '/artist'}
            className="flex items-center justify-center gap-2 rounded-md bg-zinc-100 px-8 py-2 font-bold text-green-700 lg:w-fit"
          >
            Listen Artist
            <FaHeadphones />
          </Link>
        </div>

        <Image
          width={1000}
          height={1000}
          src={artist?.imageUrl != null ? artist?.imageUrl : '/userDefault.png'}
          className="hidden w-1/3 rounded-md lg:block"
          alt="Imagen del artista"
        />
      </section>

      <section className="flex flex-col gap-2 rounded-md bg-gradient-to-b from-zinc-400 to-zinc-300 p-8 dark:from-zinc-900 dark:to-zinc-800 md:from-zinc-100 md:to-zinc-100 dark:md:from-black dark:md:to-black">
        <h2 className="md:text-green-900 dark:md:text-zinc-400">
          Popular Albums
        </h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artist?.albums.map((album) => {
            return (
              <li
                className="flex items-start gap-2 rounded-md bg-zinc-400 p-2 shadow-lg dark:bg-zinc-800 md:flex-col md:bg-zinc-100 md:p-4 md:text-green-800 md:shadow-none dark:md:bg-black dark:md:text-zinc-400"
                key={album.name}
              >
                <Image
                  width={500}
                  height={500}
                  src={album.images[0].url}
                  className="mx-auto h-auto w-1/2 rounded-md md:w-full"
                  alt="Imagen del artista"
                />
                <div className="flex w-1/2 flex-col gap-2 md:w-full md:flex-row md:items-start">
                  <h3>{album.name}</h3>
                  <Link
                    target="_blank"
                    href={album.external_urls.spotify}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-zinc-100 py-2 font-bold text-green-700 md:w-fit md:bg-green-800 md:px-4 md:text-zinc-100 md:dark:bg-green-600"
                  >
                    Listen
                    <FaHeadphones />
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </section>
  )
}
