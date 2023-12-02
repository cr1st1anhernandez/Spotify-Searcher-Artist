'use client'
import SearchArtist from '@/app/components/SearchArtist'
import ThemeToggle from '@/app/components/ThemeToggle'
import Link from 'next/link'
import { FaGithubAlt, FaSpotify } from 'react-icons/fa'
import { TiDocumentText } from 'react-icons/ti'
export default function Home(): JSX.Element {
  return (
    <section className="flex max-w-7xl flex-col gap-2 bg-zinc-100 dark:bg-black dark:text-zinc-100">
      <ThemeToggle />
      <header className="flex items-center justify-between gap-2">
        <h1>
          Spotify
          <br />
          Searcher
        </h1>
        <FaSpotify className="h-auto w-1/3 lg:w-60 xl:w-72" />
      </header>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-zinc-400">
          Herramienta para buscar información de artistas mediante Spotify.
        </p>
        <form action="" className="flex flex-col gap-2 lg:flex-row">
          <SearchArtist />
          <button className="w-full rounded-md bg-green-600 px-6 py-2 font-bold text-zinc-200 hover:bg-green-700 lg:w-fit">
            Buscar
          </button>
          <div className="flex w-full gap-2 lg:w-fit">
            <Link
              href="https://github.com/cr1st1anhernandez/spotify-searcher-artist"
              className="flex h-10 w-1/2 items-center justify-center rounded-md bg-black p-2 text-zinc-200 dark:bg-zinc-200 dark:text-black lg:w-10"
            >
              <FaGithubAlt className="h-auto w-4" />
            </Link>
            <Link
              href="https://developer.spotify.com/documentation/web-api"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-1/2 items-center justify-center rounded-md bg-black p-2 text-zinc-200 dark:bg-zinc-200 dark:text-black lg:w-10"
            >
              <TiDocumentText />
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
