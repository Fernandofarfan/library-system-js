import betterSqlite3 from 'better-sqlite3';

class Database {
    constructor(path, mode, callback) {
        try {
            this.db = new betterSqlite3(path);
            const cb = typeof mode === 'function' ? mode : callback;
            if (typeof cb === 'function') {
                process.nextTick(() => cb(null));
            }
        } catch (err) {
            const cb = typeof mode === 'function' ? mode : callback;
            if (typeof cb === 'function') {
                process.nextTick(() => cb(err));
            }
        }
    }

    all(sql, params, callback) {
        if (typeof params === 'function') { callback = params; params = []; }
        try {
            const stmt = this.db.prepare(sql);
            if (!stmt.reader) {
                // If it's not a reader (SELECT), use run
                const info = stmt.run(params);
                if (callback) callback.call({ lastID: info.lastInsertRowid, changes: info.changes }, null, []);
                return;
            }
            const rows = stmt.all(params);
            if (callback) callback(null, rows);
        } catch (err) {
            if (err.message && err.message.includes('Use run() instead')) {
                return this.run(sql, params, callback);
            }
            if (callback) callback(err);
        }
    }

    get(sql, params, callback) {
        if (typeof params === 'function') { callback = params; params = []; }
        try {
            const row = this.db.prepare(sql).get(params);
            if (callback) callback(null, row);
        } catch (err) {
            if (callback) callback(err);
        }
    }

    run(sql, params, callback) {
        if (typeof params === 'function') { callback = params; params = []; }
        try {
            const info = this.db.prepare(sql).run(params);
            if (callback) callback.call({ lastID: info.lastInsertRowid, changes: info.changes }, null);
        } catch (err) {
            if (callback) callback(err);
        }
    }

    exec(sql, callback) {
        try {
            this.db.exec(sql);
            if (callback) callback(null);
        } catch (err) {
            if (callback) callback(err);
        }
    }

    close(callback) {
        try {
            this.db.close();
            if (callback) callback(null);
        } catch (err) {
            if (callback) callback(err);
        }
    }

    serialize(callback) {
        if (callback) callback();
    }

    configure() { }
}

const sqlite3 = {
    Database,
    verbose: () => sqlite3
};

export default sqlite3;
