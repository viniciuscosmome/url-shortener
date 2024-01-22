export type CreateShortURLExpect = {
  shortURL: string;
  origin: string;
  userId?: string | undefined;
};

export type GenerateShortURLResponse = {
  id: string;
  shortURL: string;
};
