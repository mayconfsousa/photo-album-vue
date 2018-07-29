import axios from 'axios';
import _ from 'lodash';

const URL = 'https://photoslibrary.googleapis.com/v1/';
const URL_ALBUMS = `${URL}albums`;
const URL_MEDIA_ITEMS_SEARCH = `${URL}mediaItems:search`;

/**
 * Get options (with headers) common to all requests
 * @param {String} access_token API access token
 */
const getOptions = access_token => {
  return {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
};

/**
 * Get all albums
 * @param {String} access_token API access token
 */
const getAlbums = async access_token => {
  const options = getOptions(access_token);

  // GET ALL ALBUMS
  const res = await axios.get(URL_ALBUMS, options);
  let { albums } = res.data;

  // SORT ALBUMS BY NAME
  albums = _.sortBy(albums, 'title');

  // GET ALL MEDIA ITEMS FOR EACH ALBUM
  await Promise.all(
    albums.map(async album => {
      album.mediaItems = parseInt(album.totalMediaItems)
        ? await getMediaItemsForAlbum(access_token, album.id)
        : [];
    })
  );

  return albums;
};

/**
 * Create a new album
 * @param {String} access_token API access token
 * @param {String} albumTitle Album title
 */
const createAlbum = async (access_token, albumTitle) => {
  const options = getOptions(access_token);
  return await axios.post(URL_ALBUMS, { album: { title: albumTitle } }, options);
};

/**
 * Get all media items for album
 * @param {String} access_token API access token
 * @param {Number} albumId Album Id
 */
const getMediaItemsForAlbum = async (access_token, albumId) => {
  const options = getOptions(access_token);

  let mediaItemsResult = [];
  let pageToken = null;

  do {
    const res = await axios.post(
      URL_MEDIA_ITEMS_SEARCH,
      { pageSize: 500, albumId, pageToken },
      options
    );

    const { mediaItems, nextPageToken } = res.data;

    mediaItemsResult.push(...mediaItems);
    pageToken = nextPageToken;
  } while (pageToken);

  return mediaItemsResult;
};

export { getAlbums, createAlbum };
