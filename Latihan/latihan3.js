///function deklarasi
function getAge(bod){ //bod adalah paramater yang nilainya akan diisi dimoment berikutnya 
    //atau paramater ini juga bisa diisi langsung nilainya 
    const year = 2022;
    const age = 2022 - bod;

    return age; //return value
}

console.log(getAge(1997)); //pemanggilan function
console.log(getAge(2000));
//function expressi 
//mengubah variable menjadi sebuah fungsi 
const getUmur = function (body){
    const tahun = 2022;
    const umur = tahun - body;

    return umur;
};
console.log(getUmur(2002));
console.log(getUmur(2003));

//arrow function
const getUmurAge = (ageUmur) => {
    const yearAge = 2023;
    const ageYear = yearAge - ageUmur;

    return ageYear;

}
console.log(getUmurAge(2000));
console.log(getUmurAge(2000));