const Datastore = require('nedb-promises')
import path from 'path'
import { app } from 'electron'

export default Datastore.create({
    autoload: true,
    timestampData: true,
    filename: path.join(app.getPath('userData'), '/database.db')
})
