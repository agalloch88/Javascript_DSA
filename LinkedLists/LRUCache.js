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

// O(1) time for all methods in the class, per problem requirements
// O(n) space complexity, as it is linear in relation to the max size of the LRU cache, and both the cache and doubly linked list store up to maxSize items

class LRUCache {
  constructor(maxSize) {
    // Initialize the cache object to store key-value pairs
    this.cache = {};
    // Set the maximum size of the cache
    this.maxSize = maxSize || 1;
    // Track the current size of the cache
    this.currentSize = 0;
    // Initialize the doubly linked list to maintain the order of most recently used items
    this.listOfMostRecent = new DoublyLinkedList();
  }

  // Insert a key-value pair into the cache
  insertKeyValuePair(key, value) {
    // If the key is not in the cache
    if (!(key in this.cache)) {
      // If the cache is full, evict the least recently used item
      if (this.currentSize === this.maxSize) {
        this.evictLeastRecent();
      } else {
        // Otherwise, increment the current size of the cache
        this.currentSize++;
      }
      // Add the new key-value pair to the cache
      this.cache[key] = new DoublyLinkedListNode(key, value);
    } else {
      // If the key is already in the cache, replace its value
      this.replaceKey(key, value);
    }
    // Update the most recently used list
    this.updateMostRecent(this.cache[key]);
  }

  // Retrieve the value associated with a key
  getValueFromKey(key) {
    // If the key is not in the cache, return null
    if (!(key in this.cache)) {
      return null;
    }
    // Update the most recently used list
    this.updateMostRecent(this.cache[key]);
    // Return the value associated with the key
    return this.cache[key].value;
  }

  // Get the most recent key
  getMostRecentKey() {
    // If the list is empty, return undefined
    if (!this.listOfMostRecent.head) {
      return;
    }
    // Return the key of the most recent node
    return this.listOfMostRecent.head.key;
  }

  // Evict the least recently used item from the cache
  evictLeastRecent() {
    // Get the key of the tail node (least recent)
    let keyToRemove = this.listOfMostRecent.tail.key;
    // Remove the tail node from the list
    this.listOfMostRecent.removeTail();
    // Delete the key-value pair from the cache
    delete this.cache[keyToRemove];
  }

  // Update the most recent node
  updateMostRecent(node) {
    // Set the node as the head of the list (most recent)
    this.listOfMostRecent.setHeadTo(node);
  }

  // Replace the value of an existing key
  replaceKey(key, value) {
    // Ensure the key is in the cache
    if (!(key in this.cache)) {
      throw new Error('The provided key is not in the cache!');
    }
    // Update the value associated with the key
    this.cache[key].value = value;
  }
}

class DoublyLinkedList {
  constructor() {
    // Initialize the head and tail of the list
    this.head = null;
    this.tail = null;
  }

  // Set a node as the head of the list
  setHeadTo(node) {
    // If the node is already the head, do nothing
    if (this.head === node) {
      return;
    } else if (this.head === null) {
      // If the list is empty, set the node as both head and tail
      this.head = node;
      this.tail = node;
    } else if (this.head === this.tail) {
      // If there is only one node, update the head and tail pointers
      this.tail.prev = node;
      this.head = node;
      this.head.next = this.tail;
    } else {
      // If the node is the tail, remove the tail
      if (this.tail === node) {
        this.removeTail();
      }
      // Remove existing bindings and set the node as the head
      node.removeBindings();
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
  }

  // Remove the tail node from the list
  removeTail() {
    // If the list is empty, do nothing
    if (this.tail === null) {
      return;
    }
    // If there is only one node, clear the list
    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
      return;
    }
    // Update the tail pointer
    this.tail = this.tail.prev;
    this.tail.next = null;
  }
}

class DoublyLinkedListNode {
  constructor(key, value) {
    // Initialize the node with a key and value
    this.key = key;
    this.value = value;
    // Initialize the previous and next pointers
    this.prev = null;
    this.next = null;
  }

  // Remove the bindings of the node
  removeBindings() {
    // Update the previous node's next pointer
    if (this.prev !== null) {
      this.prev.next = this.next;
    }
    // Update the next node's previous pointer
    if (this.next !== null) {
      this.next.prev = this.prev;
    }
    // Clear the node's previous and next pointers
    this.prev = null;
    this.next = null;
  }
}
