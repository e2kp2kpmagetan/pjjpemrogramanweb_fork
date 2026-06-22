// const animal1 = "Cat"; //tanpa array 
// const animal2 = "Dog"; 

const animals = ["Cat", "Dog", "Fish", "Bird"]; //deklarasi penulisan data array 
//didalam data array bukan disebut 1 value malainkan disebut urutan index
console.log(animals[0], animals[1]);


//object
const user = {
    nama: "Akhmad Arip", //key = nama , value = "Akhmad Arip"
    age: 22,  //key = age, value = 22
    major: "Informatika"
}

for (const key in user){
    console.log(`${key}: ${user[key]}`);
}

//rest parameter => menggabungkan parameter dengan value yang sama 
function sum(...numbers){
    let hasil = 0;

    for(const number of numbers){
        hasil += number;
    }
    return hasil;
}

console.log(sum(1,2,3,4,5,6));