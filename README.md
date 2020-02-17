# scrolltome
Library to manage if an element is in ViewPort

1. Install 

```
npm install scrolltome
```

2. Usage

```
scrolltome.subscribe({
    element: document.getElementById('section1'),
    inViewPortHandler: (data) => console.log(data),
    outOfViewPortHandler: (data) => console.log(data),
    repeat: 'FIRST_OUT',
});
```

3. Development

```
npm run dev
```

This watches files and compiles them

4. Run tests

```
npm run dev
npm start // or node server.js
npm test
```

`npm run dev` should be running to watch and recompile files.
