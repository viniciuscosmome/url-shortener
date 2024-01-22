export type CreateShortURLExpect = {
  shortURL: string;
  origin: string;
  userId?: string | undefined;
};

export type GenerateShortURLResponse = {
  id: string;
  shortURL: string;
};

export type GetAllUrlsByUserIdResponse = Array<{
  shortURL: string;
  origin: string;
  views: number;
}>;
