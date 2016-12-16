import ErrorFactory from '../error-factory';
import BaseCacheManager from './base-manager.js';
import RequestPrecacheEntry from '../models/precache-entries/request-entry.js';
import {defaultUnrevisionedCacheName} from '../constants';

class UnrevisionedManger extends BaseCacheManager {
  constructor() {
    super(defaultUnrevisionedCacheName);
  }
  /**
   * This method ensures that the file entry in the maniest is valid and
   * if the entry is a revisioned string path, it is converted to an object
   * with the desired fields.
   * @param {String | object} input Either a URL string or an object
   * with a `url`, `revision` and optional `cacheBust` parameter.
   * @return {object} Returns a parsed version of the file entry with absolute
   * URL, revision and a cacheBust value.
   */
  _parseEntry(input) {
    if (typeof input === 'undefined' || input === null) {
      throw ErrorFactory.createError('invalid-unrevisioned-entry',
        new Error('Invalid file entry: ' + JSON.stringify(input)));
    }

    let precacheEntry;
    if(typeof input === 'string') {
        precacheEntry = new RequestPrecacheEntry(new Request(input, {
          credentials: 'include',
        }));
    } else if (input instanceof Request) {
      precacheEntry = new RequestPrecacheEntry(input);
    } else {
      throw ErrorFactory.createError('invalid-unrevisioned-entry',
        new Error('Invalid file entry: ' +
          JSON.stringify(precacheEntry)));
    }

    return precacheEntry;
  }

  _onDuplicateEntryFound(newEntry, previous) {
    // NOOP. Just ignore duplication entries.
  }

  /**
   * This method confirms with a fileEntry is already in the cache with the
   * appropriate revision.
   * If the revision is known, matching the requested `fileEntry.revision` and
   * the cache entry exists for the `fileEntry.path` this method returns true.
   * False otherwise.
   * @param {Object} fileEntry A file entry with `path` and `revision`
   * parameters.
   * @param {Cache} openCache The cache to look for the asset in.
   * @return {Promise<Boolean>} Returns true is the fileEntry is already
   * cached, false otherwise.
   */
  async _isAlreadyCached(fileEntry, openCache) {
    return false;
  }
}

export default UnrevisionedManger;