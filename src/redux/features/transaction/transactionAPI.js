import axios from './../../../utilities/axiosInstance';

export const getTransactionsAPI = async () => {
   const response = await axios.get('/transactions');
   return response.data;
};

export const postTransactionAPI = async (data) => {
   const response = await axios.post('/transactions', data);
   return response.data;
};

export const putTransactionAPI = async ({ id, ...data }) => {
   const response = await axios.put(`/transactions/${id}`, { ...data });
   return response.data;
};

export const deleteTransactionAPI = async (id) => {
   await axios.delete(`/transactions/${id}`);
   return { id };
};
