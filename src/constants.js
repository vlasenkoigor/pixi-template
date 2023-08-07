/**
 * Scale modes
 * @const SCALE_MODES
 * @type {{FIT: string, RESIZE: string}}
 */
export const SCALE_MODES = {
    /**
     * @type string
     * @name SCALE_MODES.RESIZE
     */
    RESIZE: 'resize',

    /**
     * @type string
     * @name SCALE_MODES.FIT
     */
    FIT: 'fit',
};

/**
 * Scale modes
 * @const ORIENTATIONS
 * @type {{LANDSCAPE: string, PORTRAIT: string}}
 */
export const ORIENTATIONS = {
    /**
     * @type string
     * @name ORIENTATIONS.LANDSCAPE
     */
    LANDSCAPE: 'landscape',

    /**
     * @type string
     * @name ORIENTATIONS.PORTRAIT
     */
    PORTRAIT: 'portrait',
};



/**
 * @typedef {object} ResizeData - resize data object come from ngt-core | ngt-common to component on each resize event
 * @property {number} canvasWidth - width of entire canvas. Could be equal or more them game width
 * @property {number} canvasHeight - height of entire canvas. Could be equal or more them game width
 * @property {number} gameWidth - game width for current orientation
 * @property {number} gameHeight - game height for current orientation
 * @property {Rect} gameAreaRect - game area rectangle describing game width/height according to current orientation and offsets
 * @property {Orientation} orientation - current orientation
 * @property {boolean} orientationChanged - is orientation changed in current resize event
 * @property {number} clientWidth
 * @property {number} clientHeight
 */

/** @typedef {object} Rect
 * @property {number} x
 * @property {number} y
 * @property {number} [width]
 * @property {number} [height]
 */

/**
 * @typedef {('landscape'|'portrait')} Orientation
 */

/**
 * @typedef {('resize'|'fit')} ScaleModeType
 */
