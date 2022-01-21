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
}

export type TDict<T> = {
    [name: string]: T;
}