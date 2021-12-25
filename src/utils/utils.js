import { BASE_URL } from "./constants";

export const setCookie = (name, value) => 
    document.cookie = `${name}=${value}`;

export const deleteCookie = (name) =>
    document.cookie = `${name}=;Expires=${new Date(0).toUTCString()}`;

export const checkResponse = (res) => {
  return res.ok ? 
      res.json() :
      res.json().then((err) => Promise.reject(err));
}

export const updateToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage['refreshToken']
    })
  })
  .then(checkResponse);
}

export const fetchWithRefresh = async (url, options) => {
  try{
      const res = await fetch(url, options);
      return await checkResponse(res);
  }
  catch(err){
      if(err.message === 'jwt expired'){
          const updateData = await updateToken(url, options);
          localStorage.setItem('refreshToken', updateData.refreshToken);
          setCookie('accessToken', updateData.accessToken);
          options.headers.authorization = updateData.accessToken;
          const res = await fetch(url, options)
          return await checkResponse(res);
      }
      else{
          return Promise.reject(err);
      }
  }
}