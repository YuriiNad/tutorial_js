// -- Linked list;
class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.size = 0;
	}

	add(element) {
		let node = new Node(element);
		let current;

		if (this.head === null) {
			this.head = node;
		} else {
			current = this.head;

			while (current.next) {
				current = current.next;
			}

			current.next = node;
		}
		this.size++
	}

	insert(element, index) {
		if (index < 0 || index > this.size) console.log('Please provide valid index');

		let node = new Node(element);
		let curr, prev;

		curr = this.head;

		if (index == 0) {

			node.next = this.head;
			this.head = node;

		} else {

			curr = this.head;
			let it = 0;

			while (it < index) {
				it++;
				prev = curr;
				curr = curr.next
			}

			node.next = curr;
			prev.next = node;

		}

		this.size++
	}
}

let ll = new LinkedList();
ll.add(12)
ll.add(13)
ll.add(345)
ll.add(5)
console.log(ll)
ll.insert('2222', 2)