import delay from './delay';
import axios from 'axios';


axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = "GET,HEAD,OPTIONS,POST,PUT";

axios.defaults.headers.common['Access-Control-Allow-Headers','Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'];




const courses = [
   
];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}


const generateId = (course) => {
    return replaceAll(course.title, ' ', '-');
};

class CourseApi {

    static getAllCourses() {
        return new Promise((resolve) => {
            axios.get('https://b7ze5k4wld.execute-api.us-east-1.amazonaws.com/dev/courses',)
                .then(response => {
                    console.log("response",response)
                    resolve(Object.assign([], response.data.courses));
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    static saveCourse(course) {
        console.log(course,"api")
        return new Promise((resolve, reject) => {
       
            
            axios.post(`https://b7ze5k4wld.execute-api.us-east-1.amazonaws.com/dev/courses`,{ course })
          
            .then(response => {
              console.log("response",response)
              resolve(Object.assign([], response.data));
            })
            .catch(error => {
                console.log(error);
            });
                        
        })
    };

    static deleteCourse(courseId) {
        return new Promise((resolve) => {

            axios.delete(`https://b7ze5k4wld.execute-api.us-east-1.amazonaws.com/dev/courses/${courseId}`,)
            .then(response => {
                console.log("response",response)
                resolve(Object.assign([], response.data));

            })
            .catch(error => {
                console.log(error);
            });
        });
    }


    static getCourse(courseId) {
        return new Promise((resolve) => {

            axios.get(`https://b7ze5k4wld.execute-api.us-east-1.amazonaws.com/dev/courses/${courseId}`,)
            .then(response => {
                console.log("response",response)
                resolve(Object.assign([], response.data.course));
            })
            .catch(error => {
                console.log(error);
            });
        });
    }

}

export default CourseApi;
