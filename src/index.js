const ScanUtils = require('./utils/scan')

/**
 * Main class of redis-utilities, contains all methods for redis.
 */
class RedisUtilities {

    /**
     * Constructor for RedisUtilities
     * @param {Object} client Your redis client, created with <i>redis.createClient()</i>
     */
    constructor(client) {
        this.client = client
        this._scanner = new ScanUtils(client)
    }

    /**
     * Returns all keys of the selected database
     * @param {number|string} count Count passed to the SCAN command
     * @returns {Promise<string[]>} All keys in the selected database.
     */
    getAllKeys(count = 1000){
        return this._scanner.getAllMatchingKeys('*', )
    }

    /**
     * Returns all keys in selected database matching match
     * @param {*} match String used to filter keys. Supported wildcards:<br><br>Supported glob-style patterns:
     * <ul>
     * <ol>h?llo matches hello, hallo and hxllo</ol>
     * <ol>h*llo matches hllo and heeeello</ol>
     * <ol>h[ae]llo matches hello and hallo, but not hillo</ol>
     * <ol>h[^e]llo matches hallo, hbllo, ... but not hello</ol>
     * <ol>h[a-b]llo matches hallo and hbllo</ol><br>
     * <a href="https://redis.io/commands/keys" target="_blank">Source</a>
     * @param {string|null} type Type parameter passed to SCAN command. If present, only keys with the matching value will be returned
     * @param {number|null} count Argument passed to SCAN command
     * @returns {Promise<string[]>} All matching keys
     */
    getAllMatchingKeys(match, type = null, count = 1000){
        return this._scanner.getAllMatchingKeys(match, count, type)
    }
}

RedisUtilities.ScanUtils = ScanUtils
module.exports = RedisUtilities