export type Size = {
  width: number;
  height: number;
};

export type Product = {
  id: string;
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: string;
  comments: string[]; // если "CommentModel" — просто строка
};