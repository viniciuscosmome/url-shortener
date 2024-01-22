export type JwtPayload = {
  uid: string;
  iat: number;
  exp: number;
  sub: string;
};
