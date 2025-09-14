export type AxiosErrorType = {
  message: string;
  name: string;
  stack?: string;
  config: {
    transitional: {
      silentJSONParsing: boolean;
      forcedJSONParsing: boolean;
      clarifyTimeoutError: boolean;
    };
    adapter: string[];
    transformRequest: (null | any)[];
    transformResponse: (null | any)[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: Record<string, any>;
    headers: Record<string, string>;
    withCredentials: boolean;
    method: string;
    url: string;
    allowAbsoluteUrls: boolean;
  };
  code?: string;
  status?: number;
  response?: {
    data?: any;
    status?: number;
    headers?: Record<string, string>;
  };
};
