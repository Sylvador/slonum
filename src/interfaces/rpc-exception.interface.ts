export interface IRpcException {
  response: { statusCode: number; message: string; error: string };
  name: string;
  message: string;
  status: number;
  error?: IRpcException;
}
