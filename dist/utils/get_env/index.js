function getEnv(key) {
    const val = process.env[key];
    if (!val)
        throw new Error(`${key} is not defined`);
    return val;
}
export function getSomeKey() {
    return getEnv("SOME_KEY");
}
