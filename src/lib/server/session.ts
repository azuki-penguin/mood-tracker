import { database } from "$lib/server/mongodb";
import { ObjectId } from "mongodb";

const expiresIn = 7 * 24 * 60 * 60 * 1000;

type CreateSessionInput = {
    accessToken: string;
    idToken: string;
    scope: string;
    expires_in: number;
    tokenType: string;
    userId: string;
    email: string;
};

export type Session = CreateSessionInput & {
    _id: ObjectId
    expiresAt: number;
}

export const createSession = async (data: CreateSessionInput) => {
    const sessionId = new ObjectId();
    const session: Session = {
        _id: sessionId,
        expiresAt: Date.now() + expiresIn,
        ...data,
    };
    await database.collection('sessions').insertOne(session);
    return sessionId.toString();
};

export const findSession = async (sessionId: string) => {
    const session = await database.collection('sessions')
        .findOne<Session>({ _id: new ObjectId(sessionId) });
    if (!session) {
        return null;
    }

    if (session.expiresAt < Date.now()) {
        await deleteSession(sessionId);
        return null;
    }

    return session;
};

export const deleteSession = async (sessionId: string) => {
    await database.collection('sessions')
        .deleteOne({ _id: new ObjectId(sessionId) });
};