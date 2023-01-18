const getDb = require('./database').getDb;
class User {
    constructor(id, email, password, username,tel) {
        this.id = id;
        this.email = email;
        this.username = username
        this.password = password;
        this.tel = tel;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this).then(result => {
            console.log(result)
            }

        ).catch(err => {
            console.log(err)
            }

        )
    }
}

module.exports = User;
