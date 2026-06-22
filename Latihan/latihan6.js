//data object didalam object atau mirip dengan data json
const users = [
    {
        name: "Jonas",
        age: 22
    },
    {
        name: "Michael",
        age: 40
    },
    {
        name: "Hannah",
        age: 25
    },

];

//find atau mencari data => find ini fungsi bawaan array method
const  foundUser = users.find(function (user){
    return user.age > 22;
});
//filter
const filteredUSer = users.filter(function (user){
    return user.age > 22;
});

console.log(filteredUSer);
console.log(foundUser);