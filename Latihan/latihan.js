const nama = "Arip"; //type data String
const umur = 29; //type data number
const isMarried = true; //boolean 
// const dateAt; //undifiend

console.log(typeof nama, typeof umur, isMarried);// menampilkan type data
console.log(nama, "String <p> nama", umur, isMarried); //menampilkan data

//kumpulan type data JavaScript
//template literals string bisa difungsikan ke pemprosesan data
const greeting = `Hello, my name ${nama}. Umur Saya ${2022 - umur}`;

console.log(greeting);