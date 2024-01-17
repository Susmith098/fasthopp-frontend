import axios from 'axios';
const API = import.meta.env.VITE_APP_BASE_URL;

export const blockUser = (id, access) => {
  console.log(id, "from blockUser", access, "access");
  return axios.patch(
    `${API}/api/manager/user/block/${id}`,
    {},
    {
      headers: {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((response) => {
    
  }).catch((error) => {
    
  });
}

export const unblockUser = (id, access) => {
  console.log(id, "from blockUser", access, "access");
  return axios.patch(
    `${API}/api/manager/user/unblock/${id}`,
    {},
    {
      headers: {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((response) => {
    
  }).catch((error) => {
    
  });
}
