export interface IBaseResponse {
  status: boolean;
  message: string;
  data: Record<string, any> | null;
}
