'use server';

import { revalidatePath } from 'next/cache';

export const clientRevalidatePath = (path: string) => {
  revalidatePath(path);
};
