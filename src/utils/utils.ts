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

export const checkResponse = (res: Response) => {
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

export const getTime = (createdTime: string) => {
    const created = new Date(createdTime);
    const time = `${created.getHours()}:${
        created.getMinutes() < 10 ? "0" + created.getMinutes() : created.getMinutes()
    }`;
    const msInMinute = 60 * 1000;
    const msInDay = msInMinute * 60 * 24;

    const todayDate = new Date();
    const todayLeft = todayDate.getHours() * msInMinute * 60 + todayDate.getMinutes() * msInMinute;
    const yesterdayLeft = todayLeft + msInDay;

    const left = todayDate.getTime() - created.getTime();

    const daysBefore = Math.floor((todayDate.getTime() - created.getTime())/msInDay);
    
    const getDayForm = (day: number): string => {
        return day % 10 === 1 ? 'день' :
            day % 10 >= 2 && day % 10 <= 4 && day !== 12 && day !== 13 && day !== 14 ? 
            'дня' : 'дней'; 
    }

    const getDay = () => {
        return left < todayLeft ? 'Сегодня' : 
               left < yesterdayLeft ? 'Вчера' : 
               `${daysBefore} ${getDayForm(daysBefore)} назад`;
    }

    return `${getDay()} ${time} i-GMT+3`;
}