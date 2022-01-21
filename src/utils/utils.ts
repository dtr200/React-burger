import { BASE_URL } from "./constants";
import { TDict } from './types';

type TFetchOptions = {
  method: string;
  headers: TDict<string>;
  body: string;
}

export const setCookie = (name: string, value: string) => 
    document.cookie = `${name}=${value}`;

export const deleteCookie = (name: string) =>
    document.cookie = `${name}=;Expires=${new Date(0).toUTCString()}`;

export const checkResponse = (res: any) => {
  return res.ok ? 
      res.json() :
      res.json().then((err: any) => Promise.reject(err));
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

export const fetchWithRefresh = async (url: string, options: TFetchOptions) => {
  try{
      const res = await fetch(url, options);
      return await checkResponse(res);
  }
  catch(err: any){
      if(err.message === 'jwt expired'){
          const updateData = await updateToken();
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