import http from "../http-common.js";

class TimesheetDataService {
  getAll(id) {
    //console.log(id)
    return http.get(`/timesheets/list/${id}`);
  }
  /*
    getAll() {
      return http.get(`/timesheets/list/`);
    }*/

  get(id) {
    return http.get(`/timesheets/${id}`);
  }

  getUserDetails() {
    return http.get(`/timesheets/users/approved`);
  }

  create(data) {
    console.log(data)
    return http.post("/timesheets", data);

  }

  update(id, data) {
    return http.put(`/timesheets/status/${id}`, data);
  }

  findByDate(title) {
    return http.get(`/timesheets?date=${title}`);
  }

  /* 
    deleteAll() {
      return http.delete(`/projects`);
    }
  
    findByTitle(title) {
      return http.get(`/projects?title=${title}`);
    }
    userProjects(id){
      return http.get(`/projects/user/list/${id}`);
    }*/
  // findPublished(){
  //   return http.get(`/projects?published=`)
  // }
}

export default new TimesheetDataService();