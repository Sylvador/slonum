/**
 * В зависимости от типа исключения в микросервисе, вид rpc исключения может отличаться.
 *
 * В `RpcExceptionFilter` все виды учитываются
 */
export interface IRpcException {
  response: { statusCode: number; message: string; error: string };
  name: string;
  message: string;
  status: number;
  error?: IRpcException;
}
