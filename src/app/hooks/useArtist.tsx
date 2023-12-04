import type { Artist, ArtistState, Search } from '@/app/lib/definitions'
import { searchArtist } from '@/app/services/artist'
import { useCallback, useRef, useState } from 'react'

export function useArtist({ search, accessToken }: Search): ArtistState {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const previousSearch = useRef(search)
  const [artist, setArtist] = useState<Artist | null>({
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

  const getArtist = useCallback(
    async ({ search, accessToken }: Search) => {
      if (search === previousSearch.current) return
      try {
        setLoading(true)
        setError(null)
        const newArtist = await searchArtist({ search, accessToken })
        setArtist(newArtist)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
        } else {
          setError('An error has ocurred')
        }
      } finally {
        setLoading(false)
      }
    },
    [search],
  )

  return { artist, getArtist, error, loading }
}
