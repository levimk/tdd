import { z } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

const ConfigSchema = z.object({
    EXAMPLE: z.string().min(1).max(64)
})


ConfigSchema.parse(process.env)


export type Config = z.infer<typeof ConfigSchema>;