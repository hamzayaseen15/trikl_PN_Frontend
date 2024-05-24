import axios from 'axios';

const API_URL = 'http://localhost:5002/notifications';

export const sendNotifications = (csvUrl, campaign) => {
  return axios.post(`${API_URL}/send`, { csvUrl, campaign });
};
