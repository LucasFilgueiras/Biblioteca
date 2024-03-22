export interface IBook {
    id: number;
    title: string;
    description: string;
    author: string;
    publicationYear: string;
    copies: number;
    availbleCopies: number;
    category: ICategory;
}

export interface ICategory {
    id: number;
    name: string;
}