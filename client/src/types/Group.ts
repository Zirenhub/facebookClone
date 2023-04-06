export type TGroup = {
  _id: string;
  __v: string;
  owner: string;
  name: string;
  invited: string[];
  createdAt: string;
  updatedAt: string;
};

export type TGroups = {
  myGroups: TGroup[];
  invitedGroups: TGroup[];
};
