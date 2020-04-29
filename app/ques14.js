import {LinkedList,Node} from "./ques12";
class Stack {
    constructor() {
        this.list = new LinkedList();
    }

    push(item) {
        this.list.addFirst(item);
    }

    pop() {

        if (!this.list.length) {
            return;
        }


      return  this.list.removeFirst();
    }

    get length() {
        return this.list.size;
    }

}
let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log('Question 14');
console.log('Size of Stack', stack.length);
console.log('Popped Item:', stack.pop());
console.log('Popped Item:', stack.pop());

export{stack};