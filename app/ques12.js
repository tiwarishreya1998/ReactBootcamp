
class Node{
    constructor(data, next = null){
        this.data = data;
        this.next = next;
    }
}
class LinkedList{
    constructor(){
        this.head = null;
        this.size=0;
    }
    addFirst(data){
        let newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
        return this.head;
    }
    addLast(data){
        let newNode = new Node(data);
        if(!this.head){
            this.head = newNode;
            return this.head;
        }
        let tail = this.head;
        while(tail.next !== null){
            tail = tail.next;
        }
        tail.next = newNode;
        this.size++;
        return this.head;
    }
    length(){
        console.log(this.size);
    }
    getFirst(){
        let firstNode = this.head;
        console.log(firstNode.data);
    }
    getLast(){
        let firstNode = new Node();
        firstNode = this.head;
        while(firstNode!=null){
            if(firstNode.next==null)
            {
                console.log(firstNode.data);
            }
            firstNode=firstNode.next;
        }
    }
    removeFirst(){
        if(!this.head){
            return "Underflow";
        }
        let firstNode = new Node();
        firstNode = this.head;
        let value = firstNode.data;
        this.head = firstNode.next;
        return value;
    }
    traverse(){
        let firstNode = new Node();
        firstNode = this.head;
        while(firstNode!=null){
            console.log(firstNode.data);
            firstNode=firstNode.next;
        }
    }

}
console.log('Question 12');
var list = new LinkedList();
list.addFirst(10);
list.addFirst("firstElement");
list.addLast("lastElement");
list.length();
list.getFirst();
list.getLast();
export{list};
export {LinkedList,Node};