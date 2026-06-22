const names = ["Michael", "Hannah", "Jonas"];

//menampilkan data dari data array dan object menggunakan map, foreach
//foreach 
names.forEach(function (name){
    console.log(`Nama : ${name}`);
});
//looping menggunakan map
const formattedName = names.map(function(name){
    return `Mr/Mrs. ${name}`;
});

console.log(formattedName);