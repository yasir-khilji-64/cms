type BaseAPIRespone = {
  statusCode: number;
};

export type DataAPIResponse<T> = BaseAPIRespone & {
  data: T;
};

export type AuthAPIResponse<T> = BaseAPIRespone & {
  user: T;
  token: string;
};
