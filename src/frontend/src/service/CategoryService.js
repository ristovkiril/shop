import {HttpClient} from '../axios/axios';


const CategoryService = {

    getAllCategories: () => {
        return HttpClient.get("/category/all");
    },
    getAllCategoriesPaged: (page, size) => {
        return HttpClient.get(`/category?page=${page}&size=${size}`);
    },
    addCategory: (category, token) => {
        return HttpClient.post(`/category/create`, category, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    },
    getCategory: (id) => {
        return HttpClient.get(`/category/${id}`);
    },
    deleteCategory: (id, token) => {
        return HttpClient.delete(`/category/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }});
    },
    updateCategory: (id,request, token) => {
        return HttpClient.patch(`/category/${id}`, request,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
