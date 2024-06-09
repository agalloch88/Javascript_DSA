// Implement an LRU Cache class for a Least Recently Used (LRU) cache. The class should support:

// - Inserting key-value pairs with the insertKeyValuePair method
// - Retrieving a key's value with the getValueFromKey method
// - Retrieving the most-recently-used (meaning, most recently inserted or retrieved) key with the getMostRecentKey method

// Each of these methods should run in constant time.

// additionally, the LRUCache class should store a maxSize property set to the size of the cache, which is passed in as an argument during instantiation. This size
// represented the maximum number of key-value pairs which the cache can store at once. If a key-value pair is inserted in the cache when it has reached maximum capacity,
// the least-recently-used key-value pair should be evicted from the cache and no longer retrievable; the newly-added key-value pair should effectively replace it.

// Note that inserting a key-value pair with an alreaday existing key should simply replace the key's value in the cache with the new value, and should not evict a
// key-value pair if the cache is full. Lastly, attempting to retrieve a value from a key which is not in the cache should return None/null.

// Sample Usage:

// All operations below are performed sequentially

// LRUcache(3): - (instantiate an LRU cache of size 3)
// insertKeyValuePair("b", 2): -
// insertKeyValuePair("a", 1): -
// insertKeyValuePair("c", 3): -
// getMostRecentKey(): "c" (this was the most-recently-inserted key)
// getValueFromKey("a"): 1
// getMostRecentKey(): "a" (this was the most-recently-retrieved key)
// insertKeyValuePair("d", 4): - (the cache already had 3 entries; the least-recently-used one, in this case "b", is evicted)
// getValueFromKey("b"): null ("b" was evicted in the previous operation)
// insertKeyValuePair("a", 5): - ("a" already existed in the cache, so the value is simply replaced)
// getValueFromKey("a"): 5

// Solution 1:

class LRUCache {
  constructor(maxSize) {
    this.cache = {};
    this.maxSize = maxSize || 1;
    this.currentSize = 0;
    this.listOfMostRecent = new DoublyLinkedList();
  }

  insertKeyValuePair(key, value) {
    if (!(key in this.cache)) {
      if (this.currentSize === this.maxSize) {
        this.evictLeastRecent();
      } else {
        this.currentSize++;
      }
      this.cache[key] = new DoublyLinkedListNode(key, value);
    } else {
      this.replaceKey(key, value);
    }
    this.updateMostRecent(this.cache[key]);
  }

  getValueFromKey(key) {
    if (!(key in this.cache)) {
      return null;
    }
    this.updateMostRecent(this.cache[key]);
    return this.cache[key].value;
  }

  getMostRecentKey() {
    if (!this.listOfMostRecent.head) {
      return;
    }
    return this.listOfMostRecent.head.key;
  }

  evictLeastRecent() {
    let keyToRemove = this.listOfMostRecent.tail.key;
    this.listOfMostRecent.removeTail();
    delete this.cache[keyToRemove];
  }

  updateMostRecent(node) {
    this.listOfMostRecent.setHeadTo(node);
  }

  replaceKey(key, value) {
    if (!(key in this.cache)) {
      throw new Error('The provided key is not in the cache!');
    }
    this.cache[key].value = value;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  setHeadTo(node) {
    if (this.head === node) {
      return;
    } else if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else if (this.head === this.tail) {
      this.tail.prev = node;
      this.head = node;
      this.head.next = this.tail;
    } else {
      if (this.tail === node) {
        this.removeTail();
      }
      node.removeBindings();
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
  }

  removeTail() {
    if (this.tail === null) {
      return;
    }
    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
      return;
    }
    this.tail = this.tail.prev;
    this.tail.next = null;
  }
}

class DoublyLinkedListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  removeBindings() {
    if (this.prev !== null) {
      this.prev.next = this.next;
    }
    if (this.next !== null) {
      this.next.prev = this.prev;
    }
    this.prev = null;
    this.next = null;
  }
}
