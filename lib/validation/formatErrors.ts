import type { ZodError } from 'zod';

export function formatZodIssues(error: ZodError): string {
  return error.issues
    .map((issue) => {
      const field = String(issue.path[0] ?? 'form');
      return `${field}: ${issue.message}`;
    })
    .join('. ');
}
