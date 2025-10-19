// src\types\KitLunchbox.ts

import { Lunchbox } from "./Lunchbox";

export type KitLunchbox = {
  id: number; //id proprio da tabela juncao
  kitId: number; //id do kit para tabela juncao
  lunchboxId: number; //id da marmita para tabela juncao
  lunchbox?: Lunchbox;
  quantity: number;
};

//Essa classe é a tabela de junção entre Kit e Lunchbox
//Contém a propriedade Quantity, que diz quantas vezes essa marmita aparece no kit
//Essa KitLunchbox é a entidade intermediária que liga uma marmita (Lunchbox) a um kit (Kit) e diz quantas vezes essa marmita aparece no kit.
