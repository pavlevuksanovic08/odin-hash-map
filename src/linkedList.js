

export class LinkedList {
    constructor() {
        this.list = null;
    }

    append(node) {
        if (this.list == null) {
            this.list = node;
            return;
        }
        const tail = this.tail();
        tail.nextNode = node;
    }

    prepend(node) {
        if (this.list == null) {
            this.list = node;
        }
        const head = this.head();
        this.list = node;
        node.next = head;
    }

    size() {
        let i = 0;
        let temp = this.list
        while (temp != null) {
            temp = temp.next;
            i++;
        }
        return i;
    }

    head() {
        return this.list;
    }

    tail() {
        if (this.list === null) return null;
        let temp = this.list;
        while (temp.next != null) {
            temp = temp.next;
        }     
        return temp;
    }

    at(index) {
        let temp = this.list;
        for (let i = 0; i < index; i++) {
            temp = temp.next;
        }
        return temp;
    }

    pop() {
        if (this.list === null) return null;

        if (this.list.next === null) {
            this.list = null;
        }

        let temp = this.list;

        while (temp.next.next !== null) {
            temp = temp.next;
        }
        
        temp.next = null;
    }

    contains(key) {
        let temp = this.list;
        while (temp) {
            if (temp.key === key) {
                return true;
            }
            temp = temp.next;
        }
        return false;
    }

    find(key) {
        let temp = this.list;
        let i = 0;
        while (temp) {
            if (temp.key === key) {
                return i;
            }
            temp = temp.next;
            i++;
        }
        return null;
    }

    toString() {
        let temp = this.list;
        let str = "";
        while (temp) {
            str += `( ${temp.value} ) -> `;
            temp = temp.next;
        }
        str += "null";
        return str;
    }

    insertAt(node, index) {
        let temp = this.list;
        for (let i = 0; i < index - 1; i++) {
            temp = temp.next;
        }
        let temp2 = temp.next;
        temp.next = node;
        node.next = temp2;
    }

    removeAt(index) {
        let temp = this.list;

        if (this.list == null) return;

        if (index == 0) {
            this.list = this.list.next;
            return;
        }

        for (let i = 0; i < index - 1; i++) {
            temp = temp.next;
        }
        temp.next = temp.next.next;
    }
}

class Node {
    constructor() {
        this.value = null;
        this.nextNode = null;
    }
}