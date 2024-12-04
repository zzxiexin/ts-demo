

interface ConfigTypes {
    url: string;
    accept?: string[];
    maxSize?: number;
    onError?: () => void;
    onSuccess?: () => void;
    onProgress?: (precent: number) => void;
}


class ImageUpload {
    static version = '0.1.1';

    private url: ConfigTypes['url'] = '';
    private accept: ConfigTypes['accept'] = ['image/jpeg', 'image/png'];
    private maxSize: ConfigTypes['maxSize'] = 0
    private onError: ConfigTypes['onError'] = () => { }
    private onSuccess: ConfigTypes['onSuccess'] = () => { }
    private onProgress: ConfigTypes['onProgress'] = () => { }


    constructor(config: ConfigTypes) {
        const { url, accept, maxSize, onError, onProgress, onSuccess, } = config || {}
        this.url = url || this.url;
        this.accept = accept || this.accept;
        this.maxSize = maxSize || this.maxSize
        this.onError = onError || this.onError
        this.onProgress = onProgress || this.onProgress
        this.onSuccess = onSuccess || this.onSuccess
    }

    checkFileTypes(file: File) {
        const { type, name, size } = file || {}
        if (!this.accept?.includes(type)) {
            this.onError?.()
            return;
        }
        if ((this.maxSize as number * 1024 * 1024) as number < size) {
            this.onError?.()
            return;
        }
        this.upload(file)
    }

    private upload(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        try {
            fetch(this.url).then((res) => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }

    }

}

export default ImageUpload