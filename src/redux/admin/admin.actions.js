import {
  ADMIN_CHECK_START,
  ADMIN_CHECK_COMPLETE,
  ADMIN_CHECK_ERROR,
  ADMIN_FETCH_START,
  ADMIN_FETCH_COMPLETE,
  ADMIN_FETCH_ERROR,
  ADMIN_UPDATE_START,
  ADMIN_UPDATE_COMPLETE,
  ADMIN_UPDATE_ERROR,
} from "./admin.types";

/**
 * @description admin check start
 * @param {}
 */
export const adminCheckStart = () => {
  return {
    type: ADMIN_CHECK_START,
  };
};

/**
 * @description admin check complete
 * @param {payload}
 */
export const adminCheckComplete = (payload) => {
  return {
    type: ADMIN_CHECK_COMPLETE,
    payload,
  };
};

/**
 * @description admin check failure
 * @param {payload}
 */
export const adminCheckFailure = (payload) => {
  return {
    type: ADMIN_CHECK_ERROR,
    payload,
  };
};

/**
 * @description admin fetch start
 * @param {}
 */
export const adminFetchStart = () => {
  return {
    type: ADMIN_FETCH_START,
  };
};

/**
 * @description admin fetch success
 * @param {payload}
 */
export const adminFetchComplete = (payload) => {
  return {
    type: ADMIN_FETCH_COMPLETE,
    payload,
  };
};

/**
 * @description admin fetch failure
 * @param {payload}
 */
export const adminFetchFailure = (payload) => {
  return {
    type: ADMIN_FETCH_ERROR,
    payload,
  };
};

/**
 * @description admin Update start
 * @param {}
 */
export const adminUpdateStart = () => {
  return {
    type: ADMIN_UPDATE_START,
  };
};

/**
 * @description admin Update complete
 * @param {payload}
 */
export const adminUpdateComplete = (payload) => {
  return {
    type: ADMIN_UPDATE_COMPLETE,
    payload,
  };
};

/**
 * @description admin Update failure
 * @param {payload}
 */
export const adminUpdateFailure = (payload) => {
  return {
    type: ADMIN_UPDATE_ERROR,
    payload,
  };
};
