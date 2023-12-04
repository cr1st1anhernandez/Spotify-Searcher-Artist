'use client'
import SearchArtist from '@/app/components/SearchArtist'
import ThemeToggle from '@/app/components/ThemeToggle'
import Image from 'next/image'
import { useState } from 'react'
import { FaHeadphones, FaHeart } from 'react-icons/fa'
export default function ArtistPage(): JSX.Element {
  const [artist, setArtist] = useState({
    name: 'Billie Eilish',
    albums: [
      {
        name: 'Happier Than Ever',
        images: [
          {
            url: 'https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e',
          },
        ],
      },
      {
        name: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
        images: [
          {
            url: 'https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce',
          },
        ],
      },
    ],
    genres: ['art pop', 'electropop', 'pop'],
    followers: 84618723,
    imageUrl:
      'https://i.scdn.co/image/ab6761610000e5ebd8b9980db67272cb4d2c3daf',
    popularity: 88,
    spotifyLink:
      'https://open.spotify.com/intl-es/artist/6qqNVTkY8uBg9cP3Jd7DAH',
  })

  return (
    <section className="flex w-full max-w-7xl flex-col gap-4 text-zinc-100">
      <ThemeToggle />
      <SearchArtist />
      <section className="flex flex-col items-start justify-between gap-2 rounded-md bg-gradient-to-b from-green-600 to-emerald-800 p-8 lg:flex-row">
        <div className="mx-auto flex flex-col gap-2 lg:w-2/3">
          <Image
            width={1000}
            height={1000}
            src={artist.imageUrl}
            className="mx-auto w-full rounded-md sm:w-2/3 lg:hidden"
            alt="Imagen del artista"
          />
          <h1 className="">{artist.name}</h1>
          <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
            <div className="flex items-center gap-2 lg:flex-col lg:items-start">
              <h3>Seguidores</h3>
              <span>{artist.followers}</span>
            </div>
            <div className="flex items-center gap-2 lg:flex-col lg:items-start">
              <h3>Popularidad</h3>
              <div className="flex items-center gap-2">
                <span>{artist.popularity}/100</span>
                <FaHeart />
              </div>
            </div>
            <div className="flex gap-2 sm:items-center lg:flex-col lg:items-start">
              <h3>Géneros</h3>
              <p className="">
                {artist.genres.map((genre) => {
                  return (
                    <span className="mx-1 inline-flex" key={genre}>
                      {genre}
                    </span>
                  )
                })}
              </p>
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-md bg-zinc-100 px-8 py-2 font-bold text-green-700 lg:w-fit">
            Listen Artist
            <FaHeadphones />
          </button>
        </div>
        <Image
          width={1000}
          height={1000}
          src={artist.imageUrl}
          className="hidden w-1/3 rounded-md lg:block"
          alt="Imagen del artista"
        />
      </section>

      <section className="flex flex-col gap-2 rounded-md bg-gradient-to-b from-zinc-400 to-zinc-300 p-8 dark:from-zinc-900 dark:to-zinc-800 md:from-zinc-100 md:to-zinc-100 dark:md:from-black dark:md:to-black">
        <h2 className="md:text-green-900 dark:md:text-zinc-400">
          Popular Albums
        </h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artist.albums.map((album) => {
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
                  <button className="flex w-full items-center justify-center gap-2 rounded-md bg-zinc-100 py-2 font-bold text-green-700 md:w-fit md:bg-green-800 md:px-4 md:text-zinc-100 md:dark:bg-green-600">
                    Listen
                    <FaHeadphones />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </section>
  )
}
