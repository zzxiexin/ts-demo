import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class CustomeFetch {
    instance: AxiosInstance = null as unknown as AxiosInstance

    get baseUrl() {
        return this.instance.defaults.baseURL || ''
    }

    set baseUrl(url: string) {
        this.instance.defaults.baseURL = url
    }

    private setRequest() {
        this.instance?.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            console.log('请求拦截器', config)
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });
    }

    constructor(options?: AxiosRequestConfig) {
        this.instance = axios.create({
            ...options,
            baseURL: options?.url || 'https://jsonplaceholder.typicode.com',
        })
        this.setRequest()
    }

    get(relativeUrl: string, options?: Omit<AxiosRequestConfig, 'url'>) {
        // console.log(this)
        return this.instance.get(relativeUrl, {
            method: 'get',
        })
    }

}

export default new CustomeFetch()