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

export type TDict<T> = {
    [name: string]: T;
};

export type TRegisterUserData = {
    name: string;
    email: string;
    password: string;
}
export type TUpdateUserData = {
    login: string;
    password: string;
}
export type TUserName = {
    name: string;
}
export type TUserLogin = {
    login: string;
}
export type TUserEmail = {
    email: string;
}
export type TUserPassword = {
    password: string;
}
export type TUserNewPassword = {
    newPassword: string;
}
type TOrderField = {
    number: number;
}
export type TOrderResponseData = {
    success: boolean;
    name: string;
    order: TOrderField;
}