export interface CardProps {
    _id: string;
    title: string;
    subTitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    imageUrl:string;
    imageAlt: string;
    state: string;
    country: string;
    city: string;
    street: string;
    zip: string;
    houseNum: string;
    bizNumber?: string;
    user_id?: string;
}
