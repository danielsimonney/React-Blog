export default {
  connexion(data) {
    var Mydata = JSON.stringify(data);
    console.log(Mydata);
    return new Promise((resolve, reject) => {
      fetch("http://blog.etherial.fr/auth", {
        method: "POST",

        body: Mydata,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(data => {
        data.json().then(json => {
          if (json.status == 200) {
            resolve(json);
          } else {
            console.log(json.errors[0].msg);
            reject(json.errors[0].msg);
          }
        });
      });
    });
  },
  newUser(data) {
    console.log(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      fetch("http://blog.etherial.fr/users", {
        method: "POST",

        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(data => {
        data.json().then(json => {
          console.log(json);
        }).catch(function (errors) {
          reject(alert("Message non envoye"));
          console.error(errors);
        });
      });
    });
  },

  getArticle() {
    return new Promise((resolve, reject) => {
      fetch("http://blog.etherial.fr/articles", {
        method: "GET"
      }).then(data => {
        data.json().then(json => {
          resolve(json);
        }).catch(function (errors) {
          reject(alert("Message non envoye"));
          console.error(errors);
        });
      });
    });
  },

  Post(data, token) {
    var Mydata = JSON.stringify(data);
    console.log(Mydata);
    return new Promise((resolve, reject) => {
      fetch("http://blog.etherial.fr/articles", {
        method: "POST",

        body: Mydata,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }).then(data => {
        data.json().then(json => {
          if (json.status === 201) {

            resolve(json);
          } else {
            console.log(json);
          }
        });
      });
    });
  },

  GetMyPage(nb) {
    return new Promise((resolve, reject) => {
      fetch("http://blog.etherial.fr/articles/" + nb, {
        method: "GET"
      }).then(data => {
        data.json().then(json => {
          if (json.status === 200) {
            resolve(json);
          } else {
            console.log(json);
          }
        });
      });
    });
  },

  GetUser(token) {
    return new Promise((resolve, reject) => {
      fetch("http://blog.etherial.fr/users/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(data => {
        data.json().then(json => {
          resolve(json);
        }).catch(function (errors) {
          reject(alert("Message non envoye"));
          console.error(errors);
        });
      });
    });
  },

  UpdateUser(data, token) {
    var Mydata = JSON.stringify(data);
    console.log(Mydata);
    return new Promise((resolve, reject) => {
      fetch("http://blog.etherial.fr/users/me", {
        method: "PUT",

        body: Mydata,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }).then(data => {
        data.json().then(json => {
          console.log("err")
          if (json.status === 200) {
            resolve(json);
          } else {
            alert("zut");
          }
        });
      });
    });
  },

  UpdatePassword(data, token) {
    var Mydata = JSON.stringify(data);
    console.log(Mydata);
    return new Promise((resolve, reject) => {
      fetch("http://blog.etherial.fr/users/me/password", {
        method: "PUT",

        body: Mydata,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }).then(data => {
        data.json().then(json => {
          if (json.status === 200) {
            resolve(json);
          } else {
            alert("zut");
          }
        });
      });
    });
  },



  getCat() {
    return new Promise((resolve, reject) => {
      fetch("http://blog.etherial.fr/articles/categories", {
        method: "GET"
      }).then(data => {
        data.json().then(json => {
          resolve(json);
        }).catch(function (errors) {
          reject(alert("Message non envoye"));
          console.error(errors);
        });
      });
    });
  },


  GetWeather(city) {
    return new Promise((resolve, reject) => {
      fetch("https://api.openweathermap.org/data/2.5/weather?APPID=dace8ef6431186c483949f4e0517f52b&q=" + city + "&units=metric", {
        method: "GET"
      }).then(data => {
        data.json().then(json => {
          resolve(json);
        }).catch(function (errors) {
          reject(alert("Message non envoye"));
          console.error(errors);
        });
      });
    });
  },

  getForecast(city) {
    return new Promise((resolve, reject) => {
      fetch("https://api.openweathermap.org/data/2.5/forecast?APPID=dace8ef6431186c483949f4e0517f52b&q=" + city + "&units=metric", {
        method: "GET"
      }).then(data => {
        data.json().then(json => {
          resolve(json);
        }).catch(function (errors) {
          reject(alert("Message non envoye"));
          console.error(errors);
        });
      });
    });
  }
  // GiveIcon(catName){
  //   if(catName==="Développement"){
  //     return()
  //   }
  //   if(catName==="Marketing"){
  //     return()
  //   }
  // }


}