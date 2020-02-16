const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const section4 = document.getElementById('section4');
const section5 = document.getElementById('section5');
const section6 = document.getElementById('section6');

const inLogger = (id, data) => console.log(`${id} is in`, data);

const outLogger = (id, data) => console.log(`${id} is out`, data);

scrolltome.subscribe({
    element: section1,
    inViewPortHandler: (data) => inLogger('1', data),
    outOfViewPortHandler: (data) => outLogger('1', data),
});

scrolltome.subscribe({
    element: section2,
    inViewPortHandler: (data) => inLogger('2', data),
});

scrolltome.subscribe({
    element: section3,
    inViewPortHandler: (data) => inLogger('3', data),
});

scrolltome.subscribe({
    element: section4,
    inViewPortHandler: (data) => inLogger('4', data),
});

scrolltome.subscribe({
    element: section5,
    inViewPortHandler: (data) => inLogger('5', data),
});

scrolltome.subscribe({
    element: section6,
    inViewPortHandler: (data) => inLogger('6', data),
});
