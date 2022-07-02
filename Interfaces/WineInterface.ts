export interface WineObj {
  avaliations: number,
  classification: string,
  country: string,
  discount: number,
  flag: string,
  id: number,
  image: string,
  name: string,
  price: number,
  priceMember: number,
  priceNonMember: number,
  rating: number,
  region: string,
  size: string,
  sommelierComment: string,
  type: string,
}

export interface WineCart extends WineObj {
  quantity: number
}

export interface CartContextType {
  cart: WineCart[];
  setCart: React.Dispatch<React.SetStateAction<WineCart[]>>
};
