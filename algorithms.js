// -- Алгоритм - це набір іструкцій який покроково виконує певні дії щоб виконати якусь задачу.

// -- Найбільш вживані алгоритми на FE:
// - Binary Search Algorithm
// - Quicksort Algorithm
// - Breadth-First Search Algorithm - POSTPONED
// - Depth-First Search Algorithm
// - Dijkstra’s Algorithm

/////// -- GENERAL START;

function generateUserArray(amount) {
	let resultedArray = [];

	for (let i = 0; i <= amount; i++) {
		resultedArray.push({
			id: i,
			name: `Name_${i}`
		})
	}
	return resultedArray;
}
function generateRandomArrOfNumber(quantity) {
	let arrTest = []
	for (let i = 0; i <= quantity; i++) {
		arrTest.push(i)
	}
	return arrTest
}
/////// -- GENERAL END;

// -- Binary Search Algorithm (FIND??) - алгоритм який використовується для знаходження будь якого елементу в сортованому масиві.
// Суть алгоритму в тому що ми завжди відсіюємо половину елементів.

function binarySearch(arr, value) { // O(log N)
	let start = 0;
	let end = arr.length - 1;

	while (start <= end) {
		let middle = Math.floor((start + end) / 2);

		if (arr[middle].id === value) return arr[middle];

		if (arr[middle].id < value) {
			start = middle + 1;
		} else {
			end = middle - 1
		}
	}
	return -1;
}
// console.log(binarySearch(generateUserArray(200), 6))

// -- Quicksort Algorithm (Divide and Conquer sorting)- алгоритм сортування в якому ми визначаємо опорний елемент, і відносно 
// нього сортуємо всі інші елементи масчиву розбиваючи їх на окремі масиви, і рекурсивно проходячись по них.
// ефективність цього алгоритму залежить від того чи посортований масив, чи ні.

function quickSort(arr) { //O(N*logN) - best scenario; O(N2) - коли масив посортований;
	if (arr.length <= 1) return arr;

	const base = arr[0];
	const subArrLeft = [];
	const subArrRight = [];

	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < base) {
			subArrLeft.push(arr[i]);
		} else {
			subArrRight.push(arr[i])
		}
	}

	return [...quickSort(subArrLeft), base, ...quickSort(subArrRight)]
}

