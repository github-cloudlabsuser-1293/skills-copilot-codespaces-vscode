const data = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 35 }
];

const names = data.map(item => item.name);
console.log(names);
const namesUpperCase = names.map(name => name.toUpperCase());
console.log(namesUpperCase);