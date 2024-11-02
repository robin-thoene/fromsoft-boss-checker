import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { UndiciInstrumentation } from '@opentelemetry/instrumentation-undici';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const otelEndpoint = process.env.OTEL_ENDPOINT;
const environment = process.env.NODE_ENV;

if (otelEndpoint) {
    const sdk = new NodeSDK({
        resource: new Resource({
            [ATTR_SERVICE_NAME]: 'fromsoft-boss-checker',
            ['deployment.environment.name']: environment,
        }),
        spanProcessor: new SimpleSpanProcessor(
            new OTLPTraceExporter({
                url: otelEndpoint,
            }),
        ),
        instrumentations: [new UndiciInstrumentation()],
    });
    sdk.start();
}
