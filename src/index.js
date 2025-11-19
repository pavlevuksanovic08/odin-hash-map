import { LinkedList } from "./linkedList.js";

class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;

        this.buckets = new Array(this.capacity);
    }

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
      
        return hashCode;
    }
    
    set(key, value) {
        const pos = this.hash(key);
        if (pos < 0 || pos >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.buckets[pos] === undefined) {
            this.buckets[pos] = new LinkedList();
            this.buckets[pos].append(new KeyValuePair(key, value));
        } else {
            if (this.buckets[pos].contains(key)) {
                const keyPos = this.buckets[pos].find(key);
                const node = this.buckets[pos].at(keyPos);
                node.value = value;
            } else {
                this.buckets[pos].append(new KeyValuePair(key, value));
            }
        }
    }

    get(key) {
        const pos = this.hash(key);

        if (this.buckets[pos] === undefined) return null;

        const keyPos = this.buckets[pos].find(key);
        if (this.buckets[pos].at(keyPos)) {
            return this.buckets[pos].at(keyPos).value;
        }
        return null;
    }

    has(key) {
        const pos = this.hash(key);

        if (this.buckets[pos] === undefined) return false;

        const keyPos = this.buckets[pos].find(key);
        if (this.buckets[pos].at(keyPos)) {
            return true;
        }
        return false;
    }

    remove(key) {
        const pos = this.hash(key);

        if (this.buckets[pos] === undefined) return false;

        const keyPos = this.buckets[pos].find(key);
        if (this.buckets[pos].at(keyPos)) {
            this.buckets[pos].removeAt(keyPos);
            return true;
        }
        return false;
    }

    length() {
        let size = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                size += this.buckets[i].size();
            }
        }
        return size;
    }

    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                this.buckets[i] = undefined;
            }
        }
    }

    keys() {
        let arr = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                for (let j = 0; j < this.buckets[i].size(); j++) {
                    arr.push(this.buckets[i].at(j).key);
                }
            }
        }
        return arr;
    }

    values() {
        let arr = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                for (let j = 0; j < this.buckets[i].size(); j++) {
                    arr.push(this.buckets[i].at(j).value);
                }
            }
        }
        return arr;
    }
    
    entries() {
        let arr = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                for (let j = 0; j < this.buckets[i].size(); j++) {
                    let tempArr = [];
                    tempArr.push(this.buckets[i].at(j).key);
                    tempArr.push(this.buckets[i].at(j).value);
                    arr.push(tempArr);
                }
            }
        }
        return arr;
    }    

}

class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

console.log("=== HASHMAP TESTING START ===\n");

const map = new HashMap();

// --- TEST SET() ---
console.log("Adding items...");
map.set("apple", "red");
map.set("banana", "yellow");
map.set("kiwi", "green");
map.set("apple", "green");    // overwrite test

console.log("Map length (should be 3):", map.length());

// --- TEST GET() ---
console.log("\nTesting get()");
console.log("apple →", map.get("apple"));   // green
console.log("banana →", map.get("banana")); // yellow
console.log("kiwi →", map.get("kiwi"));     // green
console.log("missing key →", map.get("dog")); // null

// --- TEST HAS() ---
console.log("\nTesting has()");
console.log("has apple:", map.has("apple")); // true
console.log("has dog:", map.has("dog"));     // false

// --- TEST REMOVE() ---
console.log("\nTesting remove()");
console.log("remove banana →", map.remove("banana")); // true
console.log("remove missing →", map.remove("cat"));   // false
console.log("has banana (should be false):", map.has("banana"));

console.log("Length after remove (should be 2):", map.length());

// --- TEST KEYS() ---
console.log("\nTesting keys()");
console.log(map.keys()); // ["apple","kiwi"] (order depends on hashing)

// --- TEST VALUES() ---
console.log("\nTesting values()");
console.log(map.values()); // ["green","green"]

// --- TEST ENTRIES() ---
console.log("\nTesting entries()");
console.log(map.entries());
// [["apple","green"], ["kiwi","green"]]

// --- TEST CLEAR() ---
console.log("\nTesting clear()");
map.clear();
console.log("length after clear (should be 0):", map.length());
console.log("keys after clear:", map.keys());

console.log("\n=== HASHMAP TESTING DONE ===");