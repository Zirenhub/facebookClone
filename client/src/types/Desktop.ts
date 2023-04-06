export type TSection = {
  section: string;
  _id: string;
};

type TSectionButton = {
  name: string;
  _id: string;
  description: string;
}[];

export type TSectionButtons = {
  section: string;
  _id: string;
  buttons: TSectionButton;
};
