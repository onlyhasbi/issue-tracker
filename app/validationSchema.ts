import { z } from 'zod';

const status = z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED'])

export const issueSchema = z.object({
  title: z.string().min(1, 'title is required').max(255),
  description: z.string().min(1, 'description is required').max(65535),
  status: status.optional(),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'title is required').max(255).optional(),
  description: z
    .string()
    .min(1, 'description is required')
    .max(65535)
    .optional(),
  status: status.optional(),
  assignedToUserId: z
    .string()
    .min(1, 'assigned to user id required')
    .max(65535)
    .optional()
    .nullable(),
});
