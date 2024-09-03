export function generateTimerId(googleId: string) {
    const timestamp = new Date().getTime();
    return `${googleId}-${timestamp}`;
}
