import {HttpClient} from '../axios/axios';


const UserService = {

    getAllUsers: () => {
        return HttpClient.get("/user/all");
    },
    getAllUserssPaged: (page, size) => {
        return HttpClient.get(`/user?page=${page}&size=${size}`);
    },
    addUser: (user) => {
        return HttpClient.post(`/user/create`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    login: (user) => {
        return HttpClient.post(`/user/login`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    getToken: (user) => {
        return HttpClient.post(`/user/token`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    changePassword: (id, user, token) => {
        return HttpClient.post(`/user/edit/${id}/changePassword`, user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    },
    updateUser: (id,user, token) =>{
      return HttpClient.patch(`/user/edit/${id}`, user, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      })
    },
    getUser: (id) => {
        return HttpClient.get(`/user/${id}`);
    },
    deleteUser: (id) => {
        return HttpClient.delete(`/user/${id}`,{
            headers: {
                'Content-Type': 'application/json'
            }});
    },
    getUserByEmail: (email) => {
        return HttpClient.get(`/user/email?email=${email}`);
    },
    getCustomersAndModerator: () => {
        return HttpClient.get(`/user/get/users`);
    },
    changeRole: (req, token) => {
        return HttpClient.post(`/user/edit/role`, req, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            }
        });
    }
};

export default UserService;
