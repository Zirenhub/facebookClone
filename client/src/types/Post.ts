export type TPost = {
  content: string;
  background: string | null;
  image: File | null;
  audience: string;
};

export type ImagePost = {
  __v: string;
  _id: string;
  author: string;
  audience: string;
  content: string;
  image: Blob;
  reactions: [];
  createdAt: string;
  updatedAt: string;
};

export type DefaultPost = {
  __v: string;
  _id: string;
  author: string;
  audience: string;
  content: string;
  background: string | null;
  reactions: [];
  createdAt: string;
  updatedAt: string;
};
