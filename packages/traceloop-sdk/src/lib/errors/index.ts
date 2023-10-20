/**
 * The severity of an error.
 */
export const SEVERITY = {
  Warning: "Warning",
  Error: "Error",
  Critical: "Critical",
} as const;

export type Severity = (typeof SEVERITY)[keyof typeof SEVERITY];

/**
 * Base class for all Traceloop errors.
 */
export class TraceloopError extends Error {
  /**
   * The severity of the error.
   */
  severity: Severity;
  /**
   * The underlying cause of the error.
   */
  cause?: Error;

  constructor(message: string, severity: Severity) {
    super(message);
    this.severity = severity;
  }
}

export class NotInitializedError extends TraceloopError {
  constructor() {
    super(
      `The Traceloop SDK must be initialized by calling the "initialize" function prior to use.`,
      SEVERITY.Critical,
    );
  }
}

export class InitializationError extends TraceloopError {
  constructor(message?: string, cause?: Error) {
    super(message ?? "Failed to initialize Enrolla SDK", SEVERITY.Critical);
    this.cause = cause;
  }
}

export class ArgumentNotProvidedError extends TraceloopError {
  constructor(argumentName: string) {
    super(
      `The "${argumentName}" argument is required and must be a string.`,
      SEVERITY.Error,
    );
  }
}
