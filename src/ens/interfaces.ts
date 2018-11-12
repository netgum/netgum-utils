export interface IEnsNode {
  name: string;
  nameHash: string;
}

export interface IEnsNameInfo extends IEnsNode {
  label: string;
  labelHash: string;
  rootNode: IEnsNode;
}
