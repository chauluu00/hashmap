export default class HashMap {
    capacity = 16;
    constructor(loadFactor) {
        this.loadFactor = loadFactor;
        this._buckets = [];
    }
    _hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;             
    }
    _resize() {
        this.capacity *= 2; // double the capacity of hash map
        const oldBuckets = this._buckets; // hold reference to old buckets for rehashing
        const newBuckets = []; //create new empty bucket array
        this._buckets = newBuckets; //reassign hash map's _buckets property to point to newBuckets array 

        //rehash all key-value pairs and add to new buckets
        for (const bucket of oldBuckets) {
            if (bucket) { // if bucket is not null or undefined
                for (const [key, value] of bucket) {
                    this.set(key, value); //rehash using new bucket size, then insert into new buckets
                }
            }
        }
    }
    set(key, value) {
        const index = this._hash(key);
        if(!this._buckets[index]) {
            this._buckets[index] = [];
        }
        const bucket = this._buckets[index];
        for (let i=0; i<bucket.length;i++){
            if(bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        
        bucket.push([key,value]);

        if (this.length() > this.capacity * this.loadFactor) {
            this._resize();
        }
    }
    get(key){
        //hash the key and calculate its bucket number
        const index = this._hash(key);
        //go to that bucket
        const bucket = this._buckets[index];
        if (!bucket) {
            return null;
        }
        //iterate through bucket to find key and return value if found
        for (let i=0; i<bucket.length; i++){
            if (bucket[i][0] === key){
                return bucket[i][1];
            }
        }
        return null;
    }
    has(key){
        const index = this._hash(key);
        const bucket = this._buckets[index];
        if (!bucket) {
            return false;
        }
        //iterate through bucket to find key and return true if found
        for (let i=0; i<bucket.length; i++){
            if (bucket[i][0] === key){
                return true;
            }
        }
        return false;
    }
    remove(key){
        const index = this._hash(key);
        const bucket = this._buckets[index];
        if (!bucket) {
            return false;
        }
        //iterate through bucket to find key and remove if found
        for (let i=0; i<bucket.length; i++){
            if (bucket[i][0] === key){
                bucket.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    length(){
        let count = 0;
        this._buckets.forEach(bucket => {
            for (let i = 0; i<bucket.length; i++){
                count += 1;
            }
        })
        return count;
    }
    clear(){
        this._buckets = [];
    }
    keys(){
        const result = [];
        this._buckets.forEach(bucket => {
            for (let i = 0; i<bucket.length; i++){
                result.push(bucket[i][0]);
            }
        })
        return result;
    }
    values(){
        const result = [];
        this._buckets.forEach(bucket => {
            for (let i = 0; i<bucket.length; i++){
                result.push(bucket[i][1]);
            }
        })
        return result;
    }
    entries(){
        const result = [];
        this._buckets.forEach(bucket => {
            for (let i = 0; i<bucket.length; i++){
                result.push(bucket[i]);
            }
        })
        return result;
    }
}