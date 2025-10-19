// src\types\Kit.ts
import { KitLunchbox } from "./KitLunchbox";

export type Kit = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | File;
  categoryId: number;
  kitLunchboxes?: KitLunchbox[];
};



//Um kit pode conter várias marmitas (lunchboxes), 
// e cada relação entre o kit e uma marmita é representada por um objeto do tipo KitLunchbox, que inclui a quantidade de marmitas daquele tipo.

/*
{
  "id": 1,
  "name": "Kit Fitness",
  "price": 35.90,
  "categoryId": 2,
  "kitLunchboxes": [
    {
      "id": 10,
      "kitId": 1,
      "lunchboxId": 5,
      "quantity": 2,
      "lunchbox": {
        "id": 5,
        "name": "Frango com batata doce",
        "price": 12.50
      }
    },
    {
      "id": 11,
      "kitId": 1,
      "lunchboxId": 6,
      "quantity": 1,
      "lunchbox": {
        "id": 6,
        "name": "Peixe grelhado",
        "price": 14.90
      }
    }
  ]
}
*/

