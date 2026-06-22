//file untuk menampilkan 
import { index, store } from "../Controller.mjs";
const main = ()=>{
    const user = {name: "Martha", age: 22};

    index();//menampilkan data
    store(user); //menambah data
    index(); //menampilkan kembali
}

main();