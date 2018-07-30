import axios from 'axios';

const URL = 'https://photoslibrary.googleapis.com/v1/';
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
 * Get all media items for album
 * @param {String} access_token API access token
 * @param {Number} albumId Album Id
 */
const getAllMediaItems = async access_token => {
  const options = getOptions(access_token);

  let mediaItemsResult = [];
  let pageToken = null;

  do {
    const res = await axios.post(URL_MEDIA_ITEMS_SEARCH, { pageSize: 50, pageToken }, options);
    const { mediaItems /*, nextPageToken*/ } = res.data;

    mediaItemsResult.push(...mediaItems);
    // pageToken = nextPageToken;
  } while (pageToken);

  return mediaItemsResult;
};

export { getAllMediaItems };
