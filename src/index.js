class RedisUtilities {
    constructor(client) {
        this.client = client
    }

    getAllKeys(match, count = 1000) {
        return new Promise(async (resolve, reject) => {
            let cursor = 0
            let keys = []
            try {
                let data = await scanAsync(cursor, 'MATCH', match, 'COUNT', count)
                cursor = parseInt(data[0])
                keys = keys.concat(data[1])
            } catch (e) {
                cursor = 0
            }


            while (cursor != 0) {
                try {
                    let data = await scanAsync(cursor, 'MATCH', match, 'COUNT', count)
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

module.exports = RedisUtilities