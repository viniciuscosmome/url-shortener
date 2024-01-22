export type CreateShortURLInput = {
  id: string;
  origin: string;
  userId?: string | undefined;
};

export type GenerateURLResponse = {
  id: string;
  shortURL: string;
};
