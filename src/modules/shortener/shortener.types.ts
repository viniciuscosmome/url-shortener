export type CreateShortURLExpect = {
  shortURL: string;
  origin: string;
  userId?: string | undefined;
};

export type GenerateShortURLResponse = {
  id: string;
  shortURL: string;
};

type shortUTLInfo = {
  shortURL: string;
  origin: string;
  views: number;
};

export type GetAllUrlsByUserIdResponse = Array<shortUTLInfo>;

export type UpdateOriginExpect = {
  userId: string;
  shortURL: string;
  origin: string;
};

export type UpdateOrignResponse = shortUTLInfo;

export type ShortUrlIsFromThisUserExpect = {
  shortURL: string;
  userId: string;
};
