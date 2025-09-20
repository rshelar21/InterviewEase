// export async function tryCatch<T>(
//   fn: () => Promise<T>
// ): Promise<{ success: boolean; data?: any; message: string }> {
//   try {
//     const data = await fn();
//     return { success: true, data, message: 'Success' };
//   } catch (error: unknown) {
//     const message =
//       error instanceof Error ? error.message : 'Something went wrong';
//     return { success: false, message };
//   }
// }

type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise: () => Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
