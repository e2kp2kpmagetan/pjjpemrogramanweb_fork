//file untuk kebutuhan fungsi 
import users from "./Data.mjs";

const index = () =>{
    console.log("Index - Get All Users");
    users.forEach(function (user){
        console.log(user);
    });
};

const store = (user) => {
    users.push(user);
};



export {index, store};