class MyEventTarget extends EventTarget {
	constructor(mySecret) {
		super();
		this._secret = mySecret;
	}

	get secret() {
		return this._secret;
	}
}

let myEventTarget = new MyEventTarget(5);

myEventTarget.addEventListener("foo", (e) => {
	myEventTarget._secret = e.detail;
});

const customEvent = new CustomEvent('foo', { detail: 'im foo event' });

myEventTarget.dispatchEvent(customEvent)

///

const custom = new CustomEvent('check', { detail: { name: 'volodia' } })
const btn1 = document.querySelector('#btn1');
btn1.addEventListener('click', (event) => {
	console.log(custom instanceof Event)
	console.log(custom instanceof CustomEvent)
})

//// bubbling
const form = document.querySelector('form');
const area = document.querySelector('textarea');

form.addEventListener('form-event', (event) => {
	console.log(event.detail?.text())
})


area.addEventListener('input', function () {
	this.dispatchEvent(
		new CustomEvent("form-event", {
			bubbles: true,
			detail: { text: () => area.value }
		})
	)
})

///// Event Cycle:

const grand = document.querySelector('.grand');
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

grand.addEventListener('click', (e) => {
	e.stopPropagation()
	console.log('1_GRAND')
})

parent.addEventListener('click', (e) => {
	e.stopPropagation()
	console.log('2_PARENT')
})

child.addEventListener('click', (e) => {
	e.stopPropagation()
	console.log('3_CHILD')
}, { once: true })