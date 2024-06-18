const moodMap = new Map<string, number>([
    ['laugh-beam', 2],
    ['smile-beam', 1],
    ['smile', 0],
    ['frown', -1],
    ['dizzy', -2],
])

export class Mood {
    private id: string;
    private value: number;

    static excellent = new Mood('laugh-beam');
    static good = new Mood('smile-beam');
    static fine = new Mood('smile');
    static feelDown = new Mood('frown');
    static depressed = new Mood('dizzy');

    private constructor(id: string) {
        if (!moodMap.has(id)) {
            throw new Error(`Invalid mood ID: ${id}.`);
        }

        this.id = id;
        this.value = moodMap.get(id) as number;
    }

    public getId() {
        return this.id;
    }

    public getValue() {
        return this.value;
    }
}