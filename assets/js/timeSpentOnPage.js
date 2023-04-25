var hidden, state, visibilityChange,
  _this = this;

if (document.hidden != null) {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
  state = "visibilityState";
} else if (document.mozHidden != null) {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
  state = "mozVisibilityState";
} else if (document.msHidden != null) {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
  state = "msVisibilityState";
} else if (document.webkitHidden != null) {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
  state = "webkitVisibilityState";
}

this.d = new Date();
this.new_d = new Date();

document.addEventListener(visibilityChange, (function(e) {
  if (document[state] === 'visible') {
    _this.d = new Date();
  } else if (document[hidden]) {
    _this.new_d = new Date();
    var time_spent = Math.round((_this.new_d - _this.d) / 1000);
    doSomething("Changed Tab", time_spent);
  }
  
}), false);

// Function that does something
let user=JSON.parse(localStorage.getItem("profile_details"));
let urls=window.location.search;
let url=new URLSearchParams(urls);
let id=url.get("cert_id");
let cour;
let courses=[{
  "cert_id":"3",
  "course_name":"html"
}]

courses.find((e)=>{
  if(e["cert_id"]==id){
  return cour=e;
  }
})

let doSomething = function(message, time_spent) {
  if (time_spent >=1) {
    // var text = "["+message+"] "+time_spent+" seconds"
    console.log(time_spent +"seconds");

    // let cert_course={
    //    "user":user.username,
    //    "tab_warning_time":time_spent,
    //    "course":"html"
    // }
    let arr = localStorage.getItem("Cert_details") ? JSON.parse(localStorage.getItem("Cert_details")) : [];
    console.log(arr);
    if(JSON.parse(localStorage.getItem("Cert_details"))){

      arr.find(e=>{
        if(e["user"]==user.username){
          e["tab_warning_time"]=time_spent;
          localStorage.setItem("Cert_details",JSON.stringify(arr))
        }
        else{
          let cert_course={
            "user":user.username,
            "tab_warning_time":time_spent,
            "course":cour["course_name"]
         }
        arr.push(cert_course)
    localStorage.setItem("Cert_details",JSON.stringify(arr))
          
        }
      })
     
    }else{
      let cert_course={
        "user":user.username,
        "tab_warning_time":time_spent,
        "course":"html"
     }
    arr.push(cert_course)
    localStorage.setItem("Cert_details",JSON.stringify(arr))

    }
    
    
    return mal_practice=time_spent
  }
}
// console.log(mal_practice)