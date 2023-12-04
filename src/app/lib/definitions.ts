interface Image {
  url: string
}

interface Album {
  name: string
  images: Image[]
}

export interface Search {
  search: string
  accessToken: string
}

export interface Artist {
  name: string
  albums: Album[]
  genres: string[]
  followers: number
  imageUrl: string
  popularity: number
  spotifyLink: string
}

export interface ArtistState {
  loading: boolean
  error: null | string
  artist: Artist | null
  getArtist: ({ search, accessToken }: Search) => Promise<void>
}
