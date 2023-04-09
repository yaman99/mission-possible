import { ProductItem } from '../productItem.model';

export class UpdateItemRequest {
  itemId: string;
  name: string;
  url: string;
  product?: ProductItem;
}
