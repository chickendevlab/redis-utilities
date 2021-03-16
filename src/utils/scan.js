const { promisify } = require('util')

/**
 * Utils for the SCAN command, get class by doing <i>require('redis-utilities').ScanUtils</i>
 */
class ScanUtils {

    /**
     * Constructor for ScanUtils
     * @param {Object} client Your redis client
     */
    constructor(client) {
        this.scanAsync = promisify(client.scan).bind(client)
    }

    /**
     * Returns all keys, who matches match, using the SCAN command
     * @param {string} match String used to filter keys. Supported wildcards:<br><br>Supported glob-style patterns:
     * <ul>
     * <ol>h?llo matches hello, hallo and hxllo</ol>
     * <ol>h*llo matches hllo and heeeello</ol>
     * <ol>h[ae]llo matches hello and hallo, but not hillo</ol>
     * <ol>h[^e]llo matches hallo, hbllo, ... but not hello</ol>
     * <ol>h[a-b]llo matches hallo and hbllo</ol><br>
     * <a href="https://redis.io/commands/keys" target="_blank">Source</a>
     * @param {number|string} count Count parameter passed to SCAN command
     * @param {string|null} type Type parameter passed to SCAN command. If present, only keys with the matching value will be returned
     * @returns {Promise<string[]>} Promise containing all matching keys
     */
    getAllMatchingKeys(match, count, type = null) {
        if (type) {
            return new Promise(async (resolve, reject) => {
                let cursor = 0
                let keys = []
                try {
                    let data = await this.scanAsync(cursor, 'MATCH', match, 'COUNT', count, 'TYPE', type)
                    cursor = parseInt(data[0])
                    keys = keys.concat(data[1])
                } catch (e) {
                    cursor = 0
                }


                while (cursor != 0) {
                    try {
                        let data = await this.scanAsync(cursor, 'MATCH', match, 'COUNT', count, 'TYPE', type)
                        cursor = parseInt(data[0])
                        keys = keys.concat(data[1])
                    } catch (e) {
                        cursor = 0
                    }
                }
                resolve(keys)
            })
        } else {
            return new Promise(async (resolve, reject) => {
                let cursor = 0
                let keys = []
                try {
                    let data = await this.scanAsync(cursor, 'MATCH', match, 'COUNT', count)
                    cursor = parseInt(data[0])
                    keys = keys.concat(data[1])
                } catch (e) {
                    cursor = 0
                }


                while (cursor != 0) {
                    try {
                        let data = await this.scanAsync(cursor, 'MATCH', match, 'COUNT', count)
                        cursor = parseInt(data[0])
                        keys = keys.concat(data[1])
                    } catch (e) {
                        cursor = 0
                    }
                }
                resolve(keys)
            })
        }
    }
}

module.exports = ScanUtils