const colours = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#f1c40f',
    '#f39c12',
    '#e74c3c',
];
const randomColor = (name: string) => {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += Number(name.charCodeAt(i));
    }
    return colours[sum % colours.length];
};

export default randomColor;
