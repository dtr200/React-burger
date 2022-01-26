export const BASE_URL: string = 'https://norma.nomoreparties.space/api';
export const ORDER_URL: string = '/orders';
export const INGREDIENTS_URL: string = '/ingredients';

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