export type ServerActionResponse<T = undefined> = {
  error?: string;
  data?: T | undefined;
};
