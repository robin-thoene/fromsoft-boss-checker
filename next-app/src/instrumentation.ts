// eslint-disable-next-line jsdoc/require-jsdoc
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        await import('./instrumentation.otel.ts');
    }
}
