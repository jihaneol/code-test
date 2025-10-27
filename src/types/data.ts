export type Book = {
    id: number;
    title: string;
    price: number;     // 숫자로 통일
    stock: number;
}

export type Cart = {
    id: number;
    bookId:number;
    userName:String;
    createAt:Date;
}

export type User = {
    authenticated: boolean;
    name?:String;
    role?: String;
}