export interface User {
    token?: string;
    _id?: string;
    isAdmin?:boolean
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    imageUrl: string;
    imageAlt: string;
    state?: string;
    country?: string;
    city?: string;
    street?: string;
    houseNum?: string;
    zip?: string;
    cards?: string[];
    favorites?: string[];
    user?:any
}
