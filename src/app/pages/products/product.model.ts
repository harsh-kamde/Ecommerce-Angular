export type Product = {
    category: string,
    description: string,
    id: string,
    image: string,
    price: string,
    rating: {
      count: number,
      rate: number,
    },
    title: string
  };
  
  export const emptyProduct:Product = {
    category:"Checking",
    description:"dummy text of product which is empty it also have a description",
    id:"abcxyz",
    image:"bedsheets.jpg",
    price:"123",
    rating:{rate:5,count:125},
    title:"title of product"
  }
  