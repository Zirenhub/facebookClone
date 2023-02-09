export type TPost = {
  content: string;
  background: string | null;
  image: File | null;
  audience: string;
};

export type TDBPost = {
  __v: string;
  _id: string;
  author: string;
  audience: string;
  content: string;
  image?: {
    data: BufferType;
    contentType: string;
  };
  background?: string | null;
  reactions: [];
  createdAt: string;
  updatedAt: string;
};
