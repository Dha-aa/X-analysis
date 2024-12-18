import axios from 'axios';
import { XProfile, Tweet, DeletedTweet, SearchError } from '../types/profile';  // Ensure the correct import paths

export const searchProfile = async (): Promise<{ profile: XProfile, tweets: Tweet[], deletedTweets: DeletedTweet[] }> => {
  try {
    const response = await axios.get('http://localhost:3000/api/profiles/elonmusk');
    const data = response.data;

    return {
      profile: data as XProfile,
      tweets: data.tweets as Tweet[],
      deletedTweets: data.deletedTweets as DeletedTweet[],
    };
  } catch (error) {
    handleError(error);
  }
};

// Handle Axios errors
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      throw { message: 'Data not found.', code: 'NOT_FOUND' } as SearchError;
    } else {
      throw { message: 'Network error or server issue.', code: 'NETWORK_ERROR' } as SearchError;
    }
  } else {
    throw new Error('Failed to fetch data.');
  }
};
