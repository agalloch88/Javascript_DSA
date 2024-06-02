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