// chatApi/fetchData.js
import api from './api.js';

export default async function fetchData() {
  const channelsResponse = await api.get('/channels');
  const messagesResponse = await api.get('/messages');

  return {
    channels: channelsResponse.data,
    messages: messagesResponse.data,
  };
}
