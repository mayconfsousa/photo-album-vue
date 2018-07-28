import axios from 'axios';

export default async function getAlbums(access_token) {
  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const res = await axios.get('https://photoslibrary.googleapis.com/v1/albums', options);
  let { albums } = res.data;

  albums = await Promise.all(
    albums.map(
      album =>
        new Promise(async resolve => {
          album.mediaItems = [];

          let pageToken = null;

          do {
            const res = await axios.post(
              'https://photoslibrary.googleapis.com/v1/mediaItems:search',
              {
                pageSize: 500,
                albumId: album.id,
                pageToken,
              },
              options
            );

            const { mediaItems, nextPageToken } = res.data;

            album.mediaItems.push(...mediaItems);
            pageToken = nextPageToken;
          } while (pageToken);

          resolve(album);
        })
    )
  );

  return albums;
}
