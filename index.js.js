// ================== PODIUM ==================
const test = {
	'Emy': [12],      // Emy scored a total of 12 points
	'Sandra': [],     // shall be declared forfeited
	'Sue': [0, 0]     // Sue scored a total of 0 point
}
// podium(test)

function podium(members) {
	const membersScores = summarizeMembersScores(members);
	const winners = defineWinners(membersScores);
	const result = setPodiumStructure(winners);
	console.log(result)
	return result;
};

function defineWinners(members) {
	let rawWinners = defineRawWinners(members);
	let { gold, silver, bronze } = rawWinners;

	if (gold.length == 1 && silver.length == 1 && bronze.length == 1) {
		return rawWinners
	}

	if (gold.length >= 3) {
		rawWinners.gold.length = 3;
		delete rawWinners.silver;
		delete rawWinners.bronze;
		return rawWinners
	}

	if (gold.length == 2 && silver.length >= 1) {
		rawWinners.bronze = [silver[0]];
		delete rawWinners.silver;
		return rawWinners;
	}

	if (gold.length == 1 && silver.length == 1 && bronze.length >= 2) {
		rawWinners.bronze.length = 2;
		return rawWinners
	}

}

function defineRawWinners(members) {
	const goldPlace = members[0]
	const podiumStructure = {
		gold: [goldPlace],
		silver: [],
		bronze: [],
	}
	const { gold, silver, bronze } = podiumStructure;
	let silverPlace;
	let bronzePlace;


	for (let i = 1; i < members.length; i++) {
		// set silver
		if (members[i].scores !== goldPlace.scores && !silverPlace) {
			silverPlace = members[i].scores
		}

		// set bronze
		if ((members[i].scores !== goldPlace.scores) && (members[i].scores !== silverPlace) && !bronzePlace) {
			bronzePlace = members[i].scores
		}

		if (members[i].scores == goldPlace.scores) {
			gold.push(members[i]);
		}

		if (members[i].scores < goldPlace.scores && members[i].scores === silverPlace) {
			silver.push(members[i]);
		}

		if (members[i].scores < silverPlace && members[i].scores === bronzePlace) {
			bronze.push(members[i]);
			bronzePlace = members[i].scores;
		}
	}
	return podiumStructure;
}

function summarizeMembersScores(members) {
	const summaryMemberScores = [];

	for (let name in members) {
		if (members[name].length) {
			const scores = members[name].reduce((curr, next) => (curr + next), 0);
			summaryMemberScores.push({ name, scores: scores })
		}
	}
	summaryMemberScores.sort((a, b) => b.scores - a.scores);

	return summaryMemberScores
}

function setPodiumStructure(winners) {
	const podium = {
		gold: {
			score: null,
			players: []
		},
		silver: {
			score: null,
			players: []
		},
		bronze: {
			score: null,
			players: []
		},
	}

	for (let key in winners) {
		for (let i = 0; i < winners[key].length; i++) {
			podium[key].players.push(winners[key][i].name);
			podium[key].score = winners[key][i].scores;
		}

	}

	for (let key in podium) {
		if (!podium[key].score) {
			delete podium[key]
		}
	}

	return winners
}

// ================== Sum of Digits / Digital Root ==================
// const ttt = digitalRoot(123456)
// console.log(ttt)
function digitalRoot(n) {
	if (n < 10) return n

	let result = concat(n);
	result = digitalRoot(result)
	return result;
}

function concat(n) {
	let convertedN = n.toString().split('').map(el => Number(el));
	const sum = convertedN.reduce((curr, next) => curr + next, 0);
	console.log(sum)
	return sum;
}

// ================== Digit*Digit ==================
// console.log(squareDigits(3212)) //9414;
function squareDigits(num) {
	const result = num.toString().split('').map(el => Math.pow(Number(el), 2)).join('');
	return Number(result)
}

// ================= Digit*Digit ==================
// console.log(dontGiveMeFive(-29, 9))
function dontGiveMeFive(start, end) {
	const initialArray = [];
	// TODO: OPTIMIZE LOOP

	for (let i = start; i <= end; i++) initialArray.push(i.toString());
	const result = initialArray.filter(e => !e.includes('5')).map(Number);
	console.log(result)
	return result.length;
}

// ================= The Hashtag Generator ==================
// const result = generateHashtag('Do We have A Hashtag')
// console.log(result)
function generateHashtag(str) {
	if (!str.trim()) return false;

	let hashtagContent = str.trim().split(' ')
		.map(el => el[0].toUpperCase() + el.slice(1, el.length))
		.join('');

	let hashtag = `#${hashtagContent}`.length <= 140 ? `#${hashtagContent}` : false;

	return hashtag;
}
// ================= Mean Square Error ==================
let solution = function (firstArray, secondArray) {
	if (firstArray.length !== secondArray.length) return false;

	const length = firstArray.length;
	const result = firstArray
		.map((elem, index) => Math.pow((elem - secondArray[index]), 2))
		.reduce((curr, next) => (curr + next), 0)

	return result / length;
}
// console.log(solution([1, 2, 3], [4, 5, 6]))

// ================= Persistent Bugger. ==================
// console.log('RESULT: ', persistence(4));
function persistence(num, counter = 0) {
	let result = [...(num + '')].reduce((prev, curr) => prev * curr, 1);
	if (num > 9) counter++

	return result <= 9 ? counter : persistence(result, counter);
}

// ================= Most frequently used words in a text ==================
let testString = "e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e";
// console.log(topThreeWords(testString))
function topThreeWords(text) {
	if (!text.length) return;
	const array = sortWordsWithMap(text);
	return array;
}

function sortWordsWithMap(text) {
	const noSignPattern = /[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]+/;
	const isWordPattern = /.*[a-zA-Z].*/;
	let wordsArr = text
		.trim()
		.toLowerCase()
		.split(' ')
		.map(e => {
			const cleanedWord = e.replace(noSignPattern, '');
			return cleanedWord;
		})
		.filter(e => Boolean(e) && isWordPattern.test(e))

	const map = new Map();

	wordsArr.forEach(word => {
		let value = (map.get(word) || []);

		value.push(word);
		map.set(word, value);
	})

	const sortedByLength = Array.from(map)
		.sort((a, b) => b[1].length - a[1].length)
		.filter((el, i) => i <= 2)
		.map(([el, arr]) => el);

	return sortedByLength
}

// ================= Human readable duration format ==================

// const testTile = 40_000_000; // "1 minute and 2 seconds"
// console.log(formatDuration(testTile))

function formatDuration(seconds) {
	let timeUnits = Object.freeze({
		minute: 60,
		hour: 3_600,
		day: 86_400,
		year: 31_536_000,
	})

	if (!seconds) return 'now';
	if (seconds < timeUnits.minute) return buildTimeUnitResult(seconds, 'second');

	const timeMap = {
		year: 0,
		day: 0,
		hour: 0,
		minute: 0,
		second: 0,
	}


	while (seconds > timeUnits.minute - 1) {

		if (seconds >= timeUnits.year) {
			seconds = seconds - timeUnits.year;
			timeMap.year++
		}

		if (seconds >= timeUnits.day && seconds < timeUnits.year) {
			seconds = seconds - timeUnits.day;
			timeMap.day++;
		}

		if (seconds >= timeUnits.hour && seconds < timeUnits.day) {
			seconds = seconds - timeUnits.hour;
			timeMap.hour++
		}

		if (seconds >= timeUnits.minute && seconds < timeUnits.hour) {
			seconds = seconds - timeUnits.minute;
			timeMap.minute++
		}

		if (seconds < timeUnits.minute) {
			timeMap.second = seconds;
		}
	}
	const result = createReadableDurationFormat(timeMap);
	console.log(result.join(''))
	return result;
}


function createReadableDurationFormat(timeMap) {
	let filteredTimeMap = Object.entries(timeMap).filter(([key, val]) => val);
	let result = [];

	for (let i = 0; i < filteredTimeMap.length; i++) {
		const key = filteredTimeMap[i][0];
		const val = filteredTimeMap[i][1];
		result.push(buildTimeUnitResult(val, key));
	};

	if (result.length >= 2) result[result.length - 1] = ` and ${result[result.length - 1]}`;
	result.map((e, i) => {
		if (!!result[i + 2]) result[i] = `${result[i]}, `;
	})

	return result;
}

function buildTimeUnitResult(value, key) {
	const label = (value > 1) ? `${key}s` : key;
	return value ? `${value} ${label}` : '';
}

// ================= First non-repeating character ==================
// console.log(firstNonRepeatingLetter('sTreSS'));

function firstNonRepeatingLetter(string) {
	if (!string) return '';

	for (let i = 0; i < string.length; i++) {
		let currentLetter = string.charAt(i)
		if (string.indexOf(currentLetter) == i && string.indexOf(currentLetter, i + 1) == -1) return currentLetter;
	}
	return '';
}

// ================= String incrementer ==================

// console.log("result:", incrementString('foobar999'))//BUG
// function incrementString(string) {
// 	const endNumberOfString = /\d+$/;
// 	const matchedNumber = string.match(endNumberOfString);
// 	const pad = new Array(matchedNumber[0].length).fill('0').join('');
// 	const increasedNumber = (Number(matchedNumber[0]) + 1).toString();
// 	const concatPadAndNumber = (pad + increasedNumber).slice(-pad.length);
// 	const result = string.replace(endNumberOfString, concatPadAndNumber);

// 	return result;
// }

// const x = 2;
// const y = x * 2;
// const result = (y - x) * y;
// console.log(result)


const objs_2 = {
	name: '2222',
	age: 222
}
console.log(Object.hasOwn(objs_2, 'name'))
console.log(objs_2)
delete objs_2.name

console.log(objs_2)
console.log(Object.hasOwn(objs_2, 'name'))
