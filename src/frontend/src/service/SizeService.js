import {HttpClient} from '../axios/axios';


const SizeService = {

    getAllSizes: () => {
        return HttpClient.get("/size/all");
    },
    getAllSizesPaged: (page, size) => {
        return HttpClient.get(`/size?page=${page}&size=${size}`);
    },
    addSize: (category) => {
        return HttpClient.post(`/category/create`, category, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    getSize: (id) => {
        return HttpClient.get(`/size/${id}`);
    },
    deleteSize: (id) => {
        return HttpClient.delete(`/size/${id}`,{
            headers: {
                'Content-Type': 'application/json'
            }});
    },
    getAllSizesFromCategory: (id) => {
        return HttpClient.get(`size/category/${id}`)
    },
    getEmptySize: () => {
        return HttpClient.get("/size/empty");
    }
};

export default SizeService;
