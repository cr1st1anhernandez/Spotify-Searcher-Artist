import type { Artist, Search } from '@/app/lib/definitions'
import { toast } from 'sonner'

export const searchArtist = async ({
  search,
  accessToken,
}: Search): Promise<Artist | null> => {
  if (search === '') return null
  try {
    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    }

    const responseArtist = await fetch(
      'https://api.spotify.com/v1/search?q=' + search + '&type=artist',
      searchParameters,
    )
    const dataArtist = await responseArtist.json()
    const artistID = dataArtist.artists.items[0].id
    const responseAlbums = await fetch(
      'https://api.spotify.com/v1/artists/' +
        artistID +
        '/albums' +
        '?include_groups=album&limit=3',
      searchParameters,
    )
    const dataAlbums = await responseAlbums.json()
    return {
      name: dataArtist.artists.items[0].name,
      albums: dataAlbums.items,
      genres: dataArtist.artists.items[0].genres,
      followers: dataArtist.artists.items[0].followers.total,
      imageUrl: dataArtist.artists.items[0].images[0].url,
      popularity: dataArtist.artists.items[0].popularity,
      spotifyLink: dataArtist.artists.items[0].external_urls.spotify,
    }
  } catch (e) {
    toast.error('Artist Not Found')
    throw new Error('Error searching artist')
  }
}
