const data = [
[
   { name: 'John', age: 25 },
   { name: 'Jane', age: 30 }
],
[
   { name: 'Bob', age: 40 }
]
];
const names = data.flatMap(group => group.map(person => person.name));
console.log(names); // ['John', 'Jane', 'Bob']
