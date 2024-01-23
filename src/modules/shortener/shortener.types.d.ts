export type CreateShortUrlCodeExpect = {
  code: string;
  destiny: string;
  userId?: string | undefined;
};

export type GenerateShortUrlCodeResponse = {
  code: string;
  shortUrl: string;
};

type ShortUrlCodeInfo = {
  code: string;
  destiny: string;
  views: number;
};

export type GetAllUrlsByUserIdResponse = Array<ShortUrlCodeInfo>;

export type UpdateDestinationUrlExpect = {
  userId: string;
  code: string;
  destiny: string;
};

export type UpdateDestinationUrlResponse = ShortUrlCodeInfo;

export type ShortUrlCodeIsFromThisUser = {
  code: string;
  userId: string;
};
