export interface Book {
    id:string,
    authors:string[], 
    title:string,
    subtitle?:string,
    language:string, 
    description?:string,
    pageCount?:number, 
    imageLinks?:Object,
    owner?:string
}
