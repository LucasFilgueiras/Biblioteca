import { Book } from "@prisma/client";

export interface IFilterBook extends Book {
    categoryName: string;
}