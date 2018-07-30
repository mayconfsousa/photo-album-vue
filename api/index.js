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
 * @param {Function} partialResultCallback Partial result callback (paging)
 */
const getAllMediaItems = async (access_token, partialResultCallback) => {
  const options = getOptions(access_token);

  let mediaItemsResult = [];
  let pageToken = null;

  do {
    const res = await axios.post(URL_MEDIA_ITEMS_SEARCH, { pageSize: 500, pageToken }, options);
    const { mediaItems, nextPageToken } = res.data;

    mediaItemsResult.push(...mediaItems);

    if (partialResultCallback) partialResultCallback(mediaItemsResult);

    pageToken = nextPageToken;
  } while (pageToken);

  return mediaItemsResult;
};

export { getAllMediaItems };
