export const BASE_URL: string = 'https://norma.nomoreparties.space/api';
export const ORDER_URL: string = '/orders';
export const INGREDIENTS_URL: string = '/ingredients';
export const WS_ORDERS: string = 'wss://norma.nomoreparties.space/orders';

type TOrderData = {
  num: string;
  description: string;
  extra: string;
};

export const DEFAULT_ORDER_DATA: TOrderData = {
  num: '034536',
  description: 'Ваш заказ начали готовить', 
  extra: 'Дождитесь готовности на орбитальной станции'
};

export const TABS = [
  {
    id: 'bun',
    title: 'Булки',
    ratio: 0
  },
  {
    id: 'sauce',
    title: 'Соусы',
    ratio: 0
  },
  {
    id: 'main',
    title: 'Начинки',
    ratio: 0
  }
]