export type PostType = {
    id: number,
    title:string,
    description:string,
    images:string[],
    category:{id:number,name:string},
    price:number,
}