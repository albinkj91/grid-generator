
const content = document.getElementById('content');
const columnInput = document.getElementById('column');
const rowInput = document.getElementById('row');
const generateButton = document.getElementById('generate-button');
const saveButton = document.getElementById('save-button');

let columns = 10;
let rows = 10;
columnInput.value = columns;
rowInput.value = rows;


let generateGrid = (col, row) => {
	let grid = [];
	for(let i = 0; i < row; i++){
		grid [i] = [];
		for(let j = 0; j < col; j++){
			grid[i][j] = '';
		}
	}
	return grid;
};

let createCell = () => {
	let cell = document.createElement('input');
	cell.className = 'cell';
	return cell;
};

let renderGrid = (grid) => {
	content.style.gridTemplateColumns = `repeat(${columns}, 25px)`;
	content.style.gridTemplateRows = `repeat(${rows}, 25px)`;
	for(let i = 0; i < grid.length; i++){
		for(let j = 0; j < grid[i].length; j++){
			let cell = createCell();
			content.appendChild(cell);
		}
	}
};

generateButton.addEventListener('click', () => {
	columns = parseInt(columnInput.value);
	rows = parseInt(rowInput.value);

	let grid = generateGrid(columns, rows);
	content.innerHTML = '';
	renderGrid(grid);
});

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
  
	element.style.display = 'none';
	document.body.appendChild(element);
  
	element.click();
  
	document.body.removeChild(element);
}

let save = () => {
	let filename = prompt('Filename: ', 'grid.json');
	let grid = [];
	let elementIndex = 0;

	for(let i = 0; i < rows; i++){
		grid[i] = [];
		for(let j = 0; j < columns; j++){
			grid[i][j] = parseInt(content.childNodes[elementIndex++].value);
		}
	}

	let json = JSON.stringify(grid);
	download(filename, json);
}

saveButton.addEventListener('click', () => save());

let grid = generateGrid(columns, rows);
renderGrid(grid);