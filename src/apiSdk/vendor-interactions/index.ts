import axios from 'axios';
import queryString from 'query-string';
import { VendorInteractionInterface, VendorInteractionGetQueryInterface } from 'interfaces/vendor-interaction';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getVendorInteractions = async (
  query?: VendorInteractionGetQueryInterface,
): Promise<PaginatedInterface<VendorInteractionInterface>> => {
  const response = await axios.get('/api/vendor-interactions', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createVendorInteraction = async (vendorInteraction: VendorInteractionInterface) => {
  const response = await axios.post('/api/vendor-interactions', vendorInteraction);
  return response.data;
};

export const updateVendorInteractionById = async (id: string, vendorInteraction: VendorInteractionInterface) => {
  const response = await axios.put(`/api/vendor-interactions/${id}`, vendorInteraction);
  return response.data;
};

export const getVendorInteractionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/vendor-interactions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVendorInteractionById = async (id: string) => {
  const response = await axios.delete(`/api/vendor-interactions/${id}`);
  return response.data;
};
