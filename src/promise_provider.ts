import { MongoInvalidArgumentError } from './error';

/** @internal */
const kPromise = Symbol('promise');

interface PromiseStore {
  [kPromise]?: PromiseConstructor;
}

const store: PromiseStore = {
  [kPromise]: undefined
};

/**
 * Global promise store allowing user-provided promises
 * @deprecated Setting a custom promise library is deprecated the next major version will use the global Promise constructor only.
 * @public
 */
export class PromiseProvider {
  /**
   * Validates the passed in promise library
   * @deprecated Setting a custom promise library is deprecated the next major version will use the global Promise constructor only.
   */
  static validate(lib: unknown): lib is PromiseConstructor {
    if (typeof lib !== 'function')
      throw new MongoInvalidArgumentError(`Promise must be a function, got ${lib}`);
    return !!lib;
  }

  /**
   * Sets the promise library
   * @deprecated Setting a custom promise library is deprecated the next major version will use the global Promise constructor only.
   */
  static set(lib: PromiseConstructor): void {
    if (!PromiseProvider.validate(lib)) {
      // validate
      return;
    }
    store[kPromise] = lib;
  }

  /**
   * Get the stored promise library, or resolves passed in
   * @deprecated Setting a custom promise library is deprecated the next major version will use the global Promise constructor only.
   */
  static get(): PromiseConstructor {
    return store[kPromise] as PromiseConstructor;
  }
}

PromiseProvider.set(global.Promise);
