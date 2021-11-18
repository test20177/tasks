import mongoose from 'mongoose'
import { database } from '../config.js'

const connectDb = async() => {
    try {
        await mongoose.connect(database)
        console.log(`Nawiazano polaczenie z baza danych ${database}`)
    } catch (err) {
        console.log('Nie mozna polaczyc sie z baza danych! ', err)
        process.exit()
    }
}

connectDb() 