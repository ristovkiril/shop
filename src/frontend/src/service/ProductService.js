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
    getMostViewedProducts: (size) => {
        return HttpClient.get(`/products/mostViewed?size=${size}`);
    },
    addProducts: (product, token) => {
        return HttpClient.post(`/products/create`, product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
    deleteProduct: (id, token) => {
        return HttpClient.delete(`/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
    updateProduct: (id,request, token) => {
        return HttpClient.patch(`/products/edit/${id}`, request,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

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
    deleteImage: (id, token) => {
        return HttpClient.delete(`/products/product/image/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    createProductImages: (id, req, token) => {
        return HttpClient.patch(`/products/product/${id}/images`, req, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
    },
    setMainImage: (productId, imageId, token) => {
        return HttpClient.patch(`/products/product/${productId}/images/main?image=${imageId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
};

export default ProductService;
