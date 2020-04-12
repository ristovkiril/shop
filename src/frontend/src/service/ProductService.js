import {HttpClient} from '../axios/axios';


const ProductService = {

    getAllProducts: () => {
        return HttpClient.get("/products/all");
    },
    getAllProductsPaged: (page, size) => {
        return HttpClient.get(`/products?page=${page}&size=${size}`);
    },
    getAllProductsSearchEnginePaged: (term, page, size) => {
        return HttpClient.get(`/products/search?term=${term}&page=${page}&size=${size}`);
    },
    getMostViewedProducts: () => {
        return HttpClient.get(`/products/mostViewed`);
    },
    addProducts: (product) => {
        return HttpClient.post(`/products/create`, product, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    getProduct: (id) => {
        return HttpClient.get(`/products/${id}`);
    },
    increaseViews: (id) => {
        return HttpClient.post(`/products/increase/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    deleteProduct: (id) => {
        return HttpClient.delete(`/products/${id}`);
    },
    updateProduct: (id,request) => {
        return HttpClient.patch(`/products/edit/${id}`, request,{
            headers: {
                'Content-Type': 'application/json'
            }});
    },
    getProductsByCategory: (id) => {
        return HttpClient.get(`/products/category/all/${id}`)
    },
    getProductsByCategoryPaged: (id,page,size) =>{
        return HttpClient.get(`/products/category/${id}?page=${page}&size=${size}`);
    },
    getSizesForProduct: (id) => {
        return HttpClient.get(`/products/product/${id}`);
    },
    getAllProductsWithSize: (id) => {
        return HttpClient.get(`/products/size/${id}`);
    },
    getAllProductImages: (id) => {
        return HttpClient.get(`/products/product/${id}/images`)
    },
    getProductFirstImage: (id) => {
        return HttpClient.get(`/products/product/${id}/image`)
    },
    deleteImage: (id) => {
        return HttpClient.delete(`/products/product/image/${id}`)
    },
    createProductImages: (id, req) => {
        return HttpClient.patch(`/products/product/${id}/images`, req, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    setMainImage: (productId, imageId) => {
        return HttpClient.patch(`/products/product/${productId}/images/main?image=${imageId}`)
    }
};

export default ProductService;
