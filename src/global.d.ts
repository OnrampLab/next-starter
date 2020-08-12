declare type PromiseResolve<T> = T extends () => Promise<infer G> ? G : never;
