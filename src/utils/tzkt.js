import axios from "axios";

const makeReqest = async (uri, params = {}) => {
  return axios.get(`${"https://api.tzkt.io"}${uri}`, {
    params: { limit: 1000, ...params },
  });
};

export default {
  async getContractBigMapKeys(address, name, params = {}) {
    return makeReqest(`/v1/contracts/${address}/bigmaps/${name}/keys`, params);
  },

  async getContractStorage(address) {
    return makeReqest(`/v1/contracts/${address}/storage`);
  },

};
