import delay from './delay';
import axios from 'axios';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = "GET,HEAD,OPTIONS,POST,PUT";

axios.defaults.headers.common['Access-Control-Allow-Headers','Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'];


// const authors = [
//   {
//     id: 'cory-house',
//     firstName: 'Cory',
//     lastName: 'House'
//   },
//   {
//     id: 'scott-allen',
//     firstName: 'Scott',
//     lastName: 'Allen'
//   },
//   {
//     id: 'dan-wahlin',
//     firstName: 'Dan',
//     lastName: 'Wahlin'
//   }
// ];
// https://b7ze5k4wld.execute-api.us-east-1.amazonaws.com/dev/authors

const generateId = (author) => {
  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

class AuthorApi {
  static getAllAuthors() {
    return new Promise((resolve) => {
        axios.get('https://b7ze5k4wld.execute-api.us-east-1.amazonaws.com/dev/authors',)
            .then(response => {
                console.log("response",response)
                resolve(Object.assign([], response.data.courses));
            })
            .catch(error => {
                console.log(error);
            });
    });
}


//   static saveAuthor(author) {
// 	author = Object.assign({}, author); 
//     return new Promise((resolve, reject) => {
//       // setTimeout(() => {
//       //   // Simulate server-side validation
//       //   const minAuthorNameLength = 3;
//       //   if (author.firstName.length < minAuthorNameLength) {
//       //     reject(`First Name must be at least ${minAuthorNameLength} characters.`);
//       //   }

//       //   if (author.lastName.length < minAuthorNameLength) {
//       //     reject(`Last Name must be at least ${minAuthorNameLength} characters.`);
//       //   }

//       //   if (author.id) {
//       //     const existingAuthorIndex = authors.findIndex(a => a.id === author.id);
//       //     authors.splice(existingAuthorIndex, 1, author);
//       //   } else {
//       //     //Just simulating creation here.
//       //     //The server would generate ids for new authors in a real app.
//       //     //Cloning so copy returned is passed by value rather than by reference.
//       //     author.id = generateId(author);
//       //     authors.push(author);
//       //   }

//       //   resolve(author);
//       // }, delay);
//       axios.post(`https://b7ze5k4wld.execute-api.us-east-1.amazonaws.com/dev/courses`)
//       .then(response => {
//         console.log("response",response)
//         resolve(Object.assign([], response.data));
//       })
//     });
//   }

//   static deleteAuthor(authorId) {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const indexOfAuthorToDelete = authors.findIndex(author => author.id === authorId);
//         authors.splice(indexOfAuthorToDelete, 1);
//         resolve();
//       }, delay);
//     });
//   }
// }

}

export default AuthorApi;
