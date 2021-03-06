/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* eslint-env browser, serviceworker */

import RouterWrapper from './router-wrapper.js';
import ErrorFactory from './error-factory.js';
import {RevisionedCacheManager}
  from '../../../sw-precaching/src/index.js';

/**
 * This is a high level library to help with using service worker
 * precaching and run time caching.
 */
class SWLib {
  /**
   * Initialises the classes router wrapper.
   */
  constructor() {
    this._router = new RouterWrapper();
    this._revisionedCacheManager = new RevisionedCacheManager();
  }

  /**
   * Can be used to define debug logging, default cache name etc.
   * @param {Object} options The options to set.
   */
  setOptions(options) {

  }

  /**
   * If there are assets that are revisioned, they can be cached intelligently
   * during the install (i.e. old files are cleared from the cache, new files
   * are added tot he cache and unchanged files are left as is).
   * @param {Array<String>} revisionedFiles A set of urls to cache when the
   * service worker is installed.
   */
  cacheRevisionedAssets(revisionedFiles) {
    // Add a more helpful error message than assertion error.
    if (!Array.isArray(revisionedFiles)) {
      throw ErrorFactory.createError('bad-revisioned-cache-list');
    }

    this._revisionedCacheManager.cache({
      revisionedFiles,
    });
  }

  /**
   * If there are assets that should be cached on the install step but
   * aren't revisioned, you can cache them here.
   * @param {Array<String>} unrevisionedUrls A set of urls to cache when the
   * service worker is installed.
   * @return {Promise} Promise resolves if the install could be configured.
   */
  warmRuntimeCache(unrevisionedUrls) {
    return Promise.resolve();
  }

  /**
   * A getter for the Router Wrapper.
   * @return {RouterWrapper} Returns the Router Wrapper
   */
  get router() {
    return this._router;
  }
}

export default SWLib;
