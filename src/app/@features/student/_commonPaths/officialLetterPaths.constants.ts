export const BasePath = 'official-letter';
export const OfficialLetterPathActions = {
  list: 'list',
  addOfficialLetter: 'add',
};

let officialLetterPaths: IOfficialLetterPaths = {
  basePath: BasePath,
  list: `${OfficialLetterPathActions.list}`,
  addOfficialLetter: `${OfficialLetterPathActions.addOfficialLetter}`,
  listComponents: [],
  addOfficialLetterComponents: [],
};

officialLetterPaths = {
  ...officialLetterPaths,
  listComponents: ['/st/', BasePath, officialLetterPaths.list],
  addOfficialLetterComponents: ['/st/', BasePath, officialLetterPaths.addOfficialLetter],
};




interface IOfficialLetterPaths {
  readonly basePath: string;
  readonly list: string;
  readonly addOfficialLetter: string;
  readonly listComponents: string[];
  readonly addOfficialLetterComponents: string[];
}
export const OfficialLetterPaths: IOfficialLetterPaths = officialLetterPaths;
