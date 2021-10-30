import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { notification } from "ant-design-vue"

export type ResponseBody<T = any> = {
    success: true,
    data: T | T[]
} | {
    success: false,
    error: {
        errorNo: number,
        errorInfo: string
    }
}

export const REQUEST_TOKEN_KEY = 'Access-Token';

// 创建 axios 实例
const request = axios.create();

// 请求拦截器
const requestHandler = (
    config: AxiosRequestConfig,
): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    // config.headers[REQUEST_TOKEN_KEY] = "";
    return config;
};

// 响应拦截器
const responseHandler = (
    response: AxiosResponse,
): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any => {
    return response.data;
};

// 异常拦截处理器
const errorHandler = (error: AxiosError): Promise<any> => {
    if (error.response) {
        const { data = {}, status, statusText } = error.response;
        // 401 未登录/未授权
        if (status === 401) {
            // notification.error({
            //     message: 'Unauthorized',
            //     description: 'Authorization verification failed',
            // });
        }
        // 403 无权限
        if (status === 403) {
            // notification.error({
            //     message: 'Forbidden',
            //     description: statusText,
            // });
        }
        // 500 內部
        if (status === 403) {
            // notification.error({
            //     message: 'Forbidden',
            //     description: statusText,
            // });
        }
    }
    return Promise.reject(error);
};

// Add a request interceptor
request.interceptors.request.use(requestHandler, errorHandler);

// Add a response interceptor
request.interceptors.response.use(responseHandler, errorHandler);

export default request;
