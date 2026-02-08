import client from './index';

export const propertiesAPI = {
  list: async () => {
    const res = await client.get('/properties');
    return res.data;
  },
  getById: async (id) => {
    const res = await client.get(`/properties/${id}`);
    return res.data;
  }
};

export default propertiesAPI;
