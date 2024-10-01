const baseUrl = 'https://chisu3000.online/api/v1/'
export const apiEndpoints = {
    mediaFile: {
        getList: baseUrl + 'mediafiles/',
        create: baseUrl + 'mediafiles/create',
        getDetail: baseUrl + 'mediafiles/detail/',
        edit: baseUrl + 'mediafiles/edit/',
        delete: baseUrl + 'mediafiles/delete/',
        apply: baseUrl + 'mediafiles/apply-watermark',
    },
}