export const ItemBasePath = 'item';
export const ItemActions = {
  ItemsList: 'list',
  AddItem: 'add',
  EditItem: 'edit',
  ViewItem: 'view',
};

let itemPaths: IItemPaths = {
  ItemDefaultPath: ItemBasePath,
  AddItem: `${ItemActions.AddItem}`,
  EditItem: `${ItemActions.EditItem}`,
  ItemsList: `${ItemActions.ItemsList}`,
  ViewItem: `${ItemActions.ViewItem}`,
  ItemsListComponents: [],
  AddItemComponents: [],
  EditItemComponents: [],
  ViewItemComponents: [],
};

itemPaths = {
  ...itemPaths,
  ItemsListComponents: ['/w/', ItemBasePath, itemPaths.ItemsList],
  AddItemComponents :['/w/' , ItemBasePath , itemPaths.AddItem],
  EditItemComponents: ['/w/' , ItemBasePath , itemPaths.EditItem],
  ViewItemComponents: ['/w/' , ItemBasePath , itemPaths.ViewItem],
};

interface IItemPaths {
  readonly ItemDefaultPath: string;
  readonly AddItem: string;
  readonly EditItem: string;
  readonly ViewItem: string;
  readonly ItemsList: string;
  readonly ItemsListComponents: string[];
  readonly AddItemComponents: string[];
  readonly EditItemComponents: string[];
  readonly ViewItemComponents: string[];
}
export const ItemPaths: IItemPaths = itemPaths;
