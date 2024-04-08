export interface BasketDetail {
  productId: number;
  count: number;
  dateCreation: Date | string;
  name: string;
  price: number;
  imageUrl:string
  isLoading:boolean
}
