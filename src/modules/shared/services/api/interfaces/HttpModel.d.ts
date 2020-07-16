/**
 * @export @interface HttpModel
 */
export declare namespace HttpModel {
  /**
   * @interface Request
   */
  type IRequest = (
    url: string,
    params?: IRequestQueryPayload & {},
    payload?: IRequestPayload & {},
  ) => Promise<{}>;
  export interface IRequestPayload {
    [key: string]: {};
  }

  export interface IRequestQueryPayload {
    [key: string]: {};
  }

  export interface IResponse<T> {
    data: T;
  }
}
