import axios from 'axios';
import _ from 'lodash';
// import uuid from 'uuid/v1';

const URL = 'https://photoslibrary.googleapis.com/v1/';
const URL_ALBUMS = `${URL}albums`;
// const URL_UPLOAD = `${URL}upload`;
const URL_MEDIA_ITEMS_SEARCH = `${URL}mediaItems:search`;
// const URL_MEDIA_BATCH_CREATE = `${URL}mediaItems:batchCreate`;

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
        ? await getMediaItems(access_token, album.id)
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
  const res = await axios.post(URL_ALBUMS, { album: { title: albumTitle } }, options);
  const album = res.data;
  album.mediaItems = [];
  return album;
};

/**
 * Get all media items for album
 * @param {String} access_token API access token
 * @param {Number} albumId Album Id
 */
const getMediaItems = async (access_token, albumId) => {
  const options = getOptions(access_token);

  let mediaItemsResult = [];
  let pageToken = null;

  do {
    const res = await axios.post(
      URL_MEDIA_ITEMS_SEARCH,
      { pageSize: 50, albumId, pageToken },
      options
    );

    const { mediaItems /*, nextPageToken*/ } = res.data;

    mediaItemsResult.push(...mediaItems);
    // pageToken = nextPageToken;
  } while (pageToken);

  return mediaItemsResult;
};

// const getBase64Image = async (access_token, url) => {
//   const options = getOptions(access_token);
//   try {
//     // const res = await axios.get(url, {
//     //   // headers: { 'Access-Control-Allow-Origin': '*' },
//     //   ...options,
//     //   responseType: 'arraybuffer',
//     // });
//     // return new Buffer(res.data, 'binary').toString('base64');
//     const res = await axios.get(url, {
//       headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' },
//       ...options,
//     });
//     console.log('res', res);
//   } catch (error) {
//     console.log(JSON.stringify(error));
//   }
// };

// const uploadMedia = (access_token, image) => {
//   const options = getOptions(access_token);
//   return axios.post(URL_UPLOAD, image, {
//     options,
//     ...{ headers: { 'Content-type': 'application/octet-stream', 'X-Goog-Upload-File-Name': uuid() } },
//   });
// };

// const batchCreateMedia = async (access_token, uploadTokens, albumId) => {
//   const options = getOptions(access_token);
//   const newMediaItems = uploadTokens.map(uploadToken => ({ simpleMediaItem: { uploadToken } }));
//   const data = { albumId, newMediaItems };
//   return await axios.post(URL_MEDIA_BATCH_CREATE, data, options);
// };

const addImagesToAlbum = async (access_token, urls, albumId) => {
  console.log('addImagesToAlbum', access_token, urls, albumId);
  // const images = await Promise.all(urls.map(async url => await getBase64Image(access_token, url)));
  // console.log('images', images, albumId);
  // const uploadTokens = await Promise.all(
  //   images.map(async image => await uploadMedia(access_token, image))
  // );
  // await batchCreateMedia(access_token, uploadTokens, albumId);
};

export { getAlbums, createAlbum, getMediaItems, addImagesToAlbum };
