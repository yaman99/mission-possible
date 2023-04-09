import { ProductItem } from '../productItem.model';

export class AddNewItemRequest {
  workspace: string;
  name: string;
  url: string;
  product?: ProductItem;


}
