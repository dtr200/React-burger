export type THeaderButtonsData = {
    title: string;
    logo: string;
};

export type TProductItem = {
    _id: string;
    calories: number;
    fat: number;
    carbohydrates: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
};

export type TTabs = {
    id: string;
    title: string;
    ratio: number;
}

export type TDict<T> = {
    [name: string]: T;
};

export type TRegisterUserData = {
    name: string;
    email: string;
}

type TOrderField = {
    number: number;
}

export type TOrderResponseData = {
    success: boolean;
    name: string;
    order: TOrderField;
}

export type TWSOrder = {
    ingredients: string[];
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    name: string;
};

export type TWSActions = {
    wsInit: string;
    wsSendOrder: string;
    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
}

export type TWSOrdersResponse = {
    "orders": TWSOrder[],
    "total": number;
    "totalToday": number;
}; 