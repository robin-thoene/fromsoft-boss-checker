import { NextResponse } from 'next/server';

/**
 * The health endpoint.
 * @returns {Promise<NextResponse>} The response.
 */
export async function GET(): Promise<NextResponse> {
    // If all checks passed, return a 200 response, that indicates that the service is healthy.
    return NextResponse.json({ message: 'healthy' }, { status: 200 });
}
