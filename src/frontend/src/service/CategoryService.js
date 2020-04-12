import {HttpClient} from '../axios/axios';


const CategoryService = {

    getAllCategories: () => {
        return HttpClient.get("/category/all");
    },
    getAllCategoriesPaged: (page, size) => {
        return HttpClient.get(`/category?page=${page}&size=${size}`);
    },
    addCategory: (category) => {
        return HttpClient.post(`/category/create`, category, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    getCategory: (id) => {
        return HttpClient.get(`/category/${id}`);
    },
    deleteCategory: (id) => {
        return HttpClient.delete(`/category/${id}`,{
            headers: {
                'Content-Type': 'application/json'
            }});
    },
    updateCategory: (id,request) => {
        return HttpClient.patch(`/category/${id}`, request,{
            headers: {
                'Content-Type': 'application/json'
            }});
    },
    getMainCategories: () => {
        return HttpClient.get(`/category/main`);
    },
    getSubcategoriesFromCategory: (id) => {
        return HttpClient.get(`/category/subcategories/${id}`);
    }
};

export default CategoryService;
