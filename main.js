import HashMap from "./hashmap.js";

const test = new HashMap(0.75);

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

function log(x) {
    console.log(x);
}
// log(test.get("elephant"));
// log(test.has("kite"));
// log(test.remove("dog"));
// log(test.length());
// log(test.keys());
// log(test.values());
// log(test.entries());
// test.clear();
log(test);
test.set("moon", "silver");
log(test);
