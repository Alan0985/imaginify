import mongoose, { Mongoose } from 'mongoose'

const MongoURI = process.env.MongoURI

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectToDB = async () => {
    if (cached.conn) return cached.conn;

    if (!MongoURI) throw new Error("Missing MongoURI")

    cached.promise = cached.promise || mongoose.connect(MongoURI, {
        dbName: 'Imaginify', bufferCommands: false
    })

    cached.conn = await cached.promise;

    return cached.conn
}