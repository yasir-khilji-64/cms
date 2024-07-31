type BaseAPIRespone = {
  statusCode: number;
};

export type AuthAPIResponse<T> = BaseAPIRespone & {
  user: T;
  token: string;
};
