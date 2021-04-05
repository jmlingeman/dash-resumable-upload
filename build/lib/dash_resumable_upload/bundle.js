this["dash_resumable_upload"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Upload = undefined;
	
	var _Upload = __webpack_require__(/*! ./components/Upload.react */ 1);
	
	var Upload = _interopRequireDefault(_Upload).default;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Upload = Upload; /* eslint-disable import/prefer-default-export */

/***/ }),
/* 1 */
/*!************************************!*\
  !*** ./components/Upload.react.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var React = _interopRequireDefault(_react).default;
	
	var Component = _react.Component;
	
	var _propTypes = __webpack_require__(/*! prop-types */ 3);
	
	var PropTypes = _interopRequireDefault(_propTypes).default;
	
	var _resumablejs = __webpack_require__(/*! resumablejs */ 10);
	
	var Resumablejs = _interopRequireDefault(_resumablejs).default;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Upload = function (_Component) {
	  _inherits(Upload, _Component);
	
	  function Upload(props) {
	    _classCallCheck(this, Upload);
	
	    var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));
	
	    _this.state = {
	      progressBar: 0,
	      messageStatus: "",
	      fileList: { files: [] },
	      isPaused: true,
	      isUploading: false,
	      isHovered: false,
	      isComplete: false,
	      destinationDir: "",
	      numFiles: 0,
	      numCompleted: 0
	    };
	    _this.toggleHovered = _this.toggleHovered.bind(_this);
	    _this.cancelUpload = _this.cancelUpload.bind(_this);
	    _this.pauseUpload = _this.pauseUpload.bind(_this);
	    _this.startUpload = _this.startUpload.bind(_this);
	    _this.resumable = null;
	    return _this;
	  }
	
	  _createClass(Upload, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var _this2 = this;
	
	      var ResumableField = new Resumablejs({
	        target: this.props.service,
	        query: {},
	        fileType: this.props.filetypes,
	        maxFiles: this.props.maxFiles,
	        maxFileSize: this.props.maxFileSize,
	        fileTypeErrorCallback: function fileTypeErrorCallback() {
	          _this2.setState({
	            messageStatus: "Invalid file type!"
	          });
	        },
	        testMethod: "post",
	        testChunks: false,
	        headers: {},
	        chunkSize: this.props.chunkSize,
	        simultaneousUploads: this.props.simultaneousUploads,
	        forceChunkSize: false
	      });
	
	      ResumableField.assignBrowse(this.uploader);
	
	      //Enable or Disable DragAnd Drop
	      if (this.props.disableDragAndDrop === false) {
	        ResumableField.assignDrop(this.dropZone);
	      }
	
	      ResumableField.on("fileAdded", function (file) {
	        _this2.resumable.subject = $("#subject-number").text();
	        var numFiles = _this2.state.numFiles;
	        numFiles = numFiles + 1;
	        _this2.setState({ numFiles: numFiles });
	        _this2.props.setProps({ numFiles: numFiles });
	
	        _this2.setState({
	          messageStatus: _this2.props.fileAddedMessage || " Files to upload: " + numFiles,
	          isComplete: false
	        });
	
	        if (typeof _this2.props.onFileAdded === "function") {
	          _this2.props.onFileAdded(file, _this2.resumable);
	        } else if (!_this2.state.isPaused) {
	          ResumableField.upload();
	        }
	      });
	
	      ResumableField.on("fileSuccess", function (file, fileServer) {
	        if (_this2.props.fileNameServer) {
	          var objectServer = JSON.parse(fileServer);
	          file.fileName = objectServer[_this2.props.fileNameServer];
	        } else {
	          file.fileName = fileServer;
	        }
	        var currentFiles = _this2.state.fileList.files;
	        currentFiles.push(file);
	
	        var fileNames = _this2.props.fileNames;
	        fileNames.push(file.fileName);
	
	        var numCompleted = _this2.state.numCompleted;
	        numCompleted = numCompleted + 1;
	        _this2.setState({ numCompleted: numCompleted });
	
	        _this2.props.setProps({
	          fileNames: fileNames,
	          lastUploadedFile: file.fileName,
	          numCompleted: numCompleted
	        });
	        _this2.setState({
	          fileList: { files: currentFiles },
	          messageStatus: _this2.props.completedMessage + file.fileName || fileServer
	        }, function () {
	          if (typeof _this2.props.onFileSuccess === "function") {
	            _this2.props.onFileSuccess(file, fileServer);
	          }
	        });
	      });
	
	      ResumableField.on("fileSuccess", function (file, fileServer) {
	        if (_this2.props.setProps) {
	          _this2.props.setProps({
	            isCompleted: true
	          });
	        }
	        _this2.setState({
	          isComplete: true,
	          showEnabledButtons: false
	        });
	      });
	
	      ResumableField.on("progress", function () {
	        _this2.setState({
	          isUploading: ResumableField.isUploading()
	        });
	
	        if (ResumableField.progress() * 100 < 100) {
	          _this2.setState({
	            messageStatus: parseInt(ResumableField.progress() * 100, 10) + "%",
	            progressBar: ResumableField.progress() * 100
	          });
	        } else {
	          setTimeout(function () {
	            _this2.setState({
	              progressBar: 0
	            });
	          }, 1000);
	        }
	      });
	
	      ResumableField.on("fileError", function (file, errorCount) {
	        _this2.props.onUploadErrorCallback(file, errorCount);
	      });
	
	      this.resumable = ResumableField;
	    }
	  }, {
	    key: "cancelUpload",
	    value: function cancelUpload() {
	      this.resumable.cancel();
	
	      this.setState({
	        fileList: { files: [] }
	      });
	    }
	  }, {
	    key: "pauseUpload",
	    value: function pauseUpload() {
	      if (!this.state.isPaused) {
	        this.resumable.pause();
	        this.setState({
	          isPaused: true,
	          isUploading: false
	        });
	      } else {
	        this.resumable.upload();
	        this.setState({
	          isPaused: false,
	          isUploading: this.resumable.isUploading
	        });
	      }
	    }
	  }, {
	    key: "startUpload",
	    value: function startUpload(e) {
	      e.preventDefault();
	      this.resumable.pause(false);
	      this.resumable.upload();
	      this.setState({
	        isPaused: false,
	        isUploading: true
	      });
	    }
	  }, {
	    key: "toggleHovered",
	    value: function toggleHovered() {
	      this.setState({
	        isHovered: !this.state.isHovered
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this3 = this;
	
	      var fileList = null;
	
	      var textLabel = null;
	      if (this.props.textLabel) {
	        textLabel = this.props.textLabel;
	      }
	
	      var startButton = null;
	      if (this.props.startButton) {
	        if (typeof this.props.startButton === "boolean") startButton = React.createElement(
	          "label",
	          null,
	          React.createElement(
	            "button",
	            {
	              disabled: this.state.isUploading,
	              className: "resumable-btn-start",
	              onClick: this.startUpload
	            },
	            this.props.startButton && "upload"
	          )
	        );else if (typeof this.props.startButton === "string") {
	          var startButtonOther = $("#" + this.props.startButton);
	          startButtonOther.click(this.startUpload);
	        } else startButton = this.props.startButton;
	      }
	
	      var cancelButton = null;
	      if (this.props.cancelButton) {
	        if (typeof this.props.cancelButton === "boolean") cancelButton = React.createElement(
	          "label",
	          null,
	          React.createElement(
	            "button",
	            {
	              disabled: !this.state.isUploading,
	              className: "resumable-btn-cancel",
	              onClick: this.cancelUpload
	            },
	            this.props.cancelButton && "cancel"
	          )
	        );else cancelButton = this.props.cancelButton;
	      }
	
	      var pauseButton = null;
	      if (this.props.pauseButton) {
	        if (typeof this.props.pauseButton === "string" || typeof this.props.pauseButton === "boolean") pauseButton = React.createElement(
	          "label",
	          null,
	          React.createElement(
	            "button",
	            {
	              disabled: !this.state.isUploading,
	              className: "resumable-btn-pause",
	              onClick: this.pauseUpload
	            },
	            this.props.pauseButton && (this.state.isPaused ? "resume" : "pause")
	          )
	        );else pauseButton = this.props.pauseButton;
	      }
	
	      var getStyle = function getStyle() {
	        if (_this3.state.isComplete) {
	          return _this3.props.completeStyle;
	        } else if (_this3.state.isHovered || _this3.state.isUploading) {
	          return _this3.props.activeStyle;
	        } else {
	          return _this3.props.defaultStyle;
	        }
	      };
	
	      var getClass = function getClass() {
	        if (_this3.props.disabledInput) {
	          return _this3.props.disableClass;
	        } else if (_this3.state.isHovered) {
	          return _this3.props.hoveredClass;
	        } else if (_this3.state.isUploading) {
	          return _this3.props.uploadingClass;
	        } else if (_this3.state.isComplete) {
	          return _this3.props.completeClass;
	        } else if (_this3.state.isPaused) {
	          return _this3.props.completeClass;
	        } else {
	          return _this3.props.className;
	        }
	      };
	
	      return React.createElement(
	        "div",
	        {
	          id: this.props.id,
	          className: getClass(),
	          ref: function ref(node) {
	            return _this3.dropZone = node;
	          }
	        },
	        React.createElement(
	          "label",
	          {
	            style: getStyle(),
	            onMouseEnter: this.toggleHovered,
	            onMouseLeave: this.toggleHovered
	          },
	          this.state.messageStatus == "" ? textLabel : this.state.messageStatus,
	          React.createElement("input", {
	            ref: function ref(node) {
	              return _this3.uploader = node;
	            },
	            type: "file",
	            className: "btn",
	            name: this.props.id + "-upload",
	            accept: this.props.fileAccept || "*",
	            disabled: this.props.disableInput || false,
	            style: {
	              opacity: "0",
	              width: "0.1px%",
	              height: "0.1px%",
	              position: "absolute",
	              overflow: "hidden",
	              "z-index": "-1"
	            }
	          })
	        ),
	        React.createElement(
	          "div",
	          {
	            className: "progress",
	            style: {
	              display: this.state.progressBar === 0 ? "none" : "block"
	            }
	          },
	          React.createElement("div", {
	            className: "progress-bar",
	            style: {
	              width: this.state.progressBar + "%",
	              height: "100%"
	            }
	          })
	        ),
	        fileList,
	        startButton,
	        pauseButton,
	        cancelButton
	      );
	    }
	  }]);
	
	  return Upload;
	}(Component);
	
	exports.default = Upload;
	
	
	Upload.propTypes = {
	  /**
	   * Maximum number of files that can be uploaded in one session
	   */
	  maxFiles: PropTypes.number,
	
	  /**
	   * Maximum size per file in bytes.
	   */
	  maxFileSize: PropTypes.number,
	
	  /**
	   * Size of file chunks to send to server.
	   */
	  chunkSize: PropTypes.number,
	
	  /**
	   * Number of simultaneous uploads to select
	   */
	  simultaneousUploads: PropTypes.number,
	
	  /**
	   * The service to send the files to
	   */
	  service: PropTypes.string,
	
	  /**
	   * Class to add to the upload component by default
	   */
	  className: PropTypes.string,
	
	  /**
	   * Class to add to the upload component when it is hovered
	   */
	  hoveredClass: PropTypes.string,
	
	  /**
	   * Class to add to the upload component when it is disabled
	   */
	  disabledClass: PropTypes.string,
	
	  /**
	   * Class to add to the upload component when it is paused
	   */
	  pausedClass: PropTypes.string,
	
	  /**
	   * Class to add to the upload component when it is complete
	   */
	  completeClass: PropTypes.string,
	
	  /**
	   * Class to add to the upload component when it is uploading
	   */
	  uploadingClass: PropTypes.string,
	
	  /**
	   * Style attributes to add to the upload component
	   */
	  defaultStyle: PropTypes.object,
	
	  /**
	   * Style when upload component is hovered over
	   */
	  activeStyle: PropTypes.object,
	
	  /**
	   * Style when upload is completed (upload finished)
	   */
	  completeStyle: PropTypes.object,
	
	  /**
	   * The string to display in the upload component
	   */
	  textLabel: PropTypes.string,
	
	  /**
	   * Message to display when upload completed
	   */
	  completedMessage: PropTypes.string,
	
	  /**
	   * The names of the files uploaded
	   */
	  fileNames: PropTypes.arrayOf(PropTypes.string),
	
	  /**
	   * List of allowed file types, e.g. ['jpg', 'png']
	   */
	  filetypes: PropTypes.arrayOf(PropTypes.string),
	
	  /**
	   * Whether or not to have a start button
	   */
	  startButton: PropTypes.bool,
	
	  /**
	   * Whether or not to have a pause button
	   */
	  pauseButton: PropTypes.bool,
	
	  /**
	   * Whether or not to have a cancel button
	   */
	  cancelButton: PropTypes.bool,
	
	  /**
	   * Whether or not to allow file drag and drop
	   */
	  disableDragAndDrop: PropTypes.bool,
	
	  /**
	   * Dash-supplied function for updating props
	   */
	  setProps: PropTypes.func,
	
	  /**
	   * User supplied id of this component
	   */
	  id: PropTypes.string,
	
	  isPaused: PropTypes.bool,
	
	  numFiles: PropTypes.number,
	
	  numCompleted: PropTypes.number,
	
	  lastUploadedFile: PropTypes.string
	};
	
	Upload.defaultProps = {
	  maxFiles: 1,
	  maxFileSize: 1024 * 1024 * 10,
	  chunkSize: 1024 * 1024,
	  simultaneuosUploads: 1,
	  service: "/upload",
	  className: "resumable-default",
	  hoveredClass: "resumable-hovered",
	  completeClass: "resumable-complete",
	  disabledClass: "resumable-disabled",
	  pausedClass: "resumable-paused",
	  uploadingClass: "resumable-uploading",
	  defaultStyle: {},
	  activeStyle: {},
	  completeStyle: {},
	  textLabel: "Click Here to Select a File",
	  completedMessage: "Complete! ",
	  fileNames: [],
	  filetypes: undefined,
	  startButton: true,
	  pauseButton: true,
	  cancelButton: true,
	  disableDragAndDrop: false,
	  id: "default-uploader-id",
	  isPaused: true,
	  numFiles: 0,
	  numCompleted: 0,
	  lastUploadedFile: ""
	};

/***/ }),
/* 2 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module, exports) {

	(function() { module.exports = this["React"]; }());

/***/ }),
/* 3 */
/*!********************************!*\
  !*** ../~/prop-types/index.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	if (true) {
	  var ReactIs = __webpack_require__(/*! react-is */ 4);
	
	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ 6)(ReactIs.isElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = require('./factoryWithThrowingShims')();
	}


/***/ }),
/* 4 */
/*!******************************!*\
  !*** ../~/react-is/index.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	if (false) {
	  module.exports = require('./cjs/react-is.production.min.js');
	} else {
	  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ 5);
	}


/***/ }),
/* 5 */
/*!*************************************************!*\
  !*** ../~/react-is/cjs/react-is.development.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

	/** @license React v16.8.6
	 * react-is.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	
	
	if (true) {
	  (function() {
	'use strict';
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;
	
	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
	
	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' ||
	  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
	}
	
	/**
	 * Forked from fbjs/warning:
	 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
	 *
	 * Only change is we use console.warn instead of console.error,
	 * and do nothing when 'console' is not supported.
	 * This really simplifies the code.
	 * ---
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var lowPriorityWarning = function () {};
	
	{
	  var printWarning = function (format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.warn(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	
	  lowPriorityWarning = function (condition, format) {
	    if (format === undefined) {
	      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }
	
	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}
	
	var lowPriorityWarning$1 = lowPriorityWarning;
	
	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;
	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;
	
	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;
	          default:
	            var $$typeofType = type && type.$$typeof;
	
	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;
	              default:
	                return $$typeof;
	            }
	        }
	      case REACT_LAZY_TYPE:
	      case REACT_MEMO_TYPE:
	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }
	
	  return undefined;
	}
	
	// AsyncMode is deprecated along with isAsyncMode
	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;
	
	var hasWarnedAboutDeprecatedIsAsyncMode = false;
	
	// AsyncMode should be deprecated
	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true;
	      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }
	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}
	
	exports.typeOf = typeOf;
	exports.AsyncMode = AsyncMode;
	exports.ConcurrentMode = ConcurrentMode;
	exports.ContextConsumer = ContextConsumer;
	exports.ContextProvider = ContextProvider;
	exports.Element = Element;
	exports.ForwardRef = ForwardRef;
	exports.Fragment = Fragment;
	exports.Lazy = Lazy;
	exports.Memo = Memo;
	exports.Portal = Portal;
	exports.Profiler = Profiler;
	exports.StrictMode = StrictMode;
	exports.Suspense = Suspense;
	exports.isValidElementType = isValidElementType;
	exports.isAsyncMode = isAsyncMode;
	exports.isConcurrentMode = isConcurrentMode;
	exports.isContextConsumer = isContextConsumer;
	exports.isContextProvider = isContextProvider;
	exports.isElement = isElement;
	exports.isForwardRef = isForwardRef;
	exports.isFragment = isFragment;
	exports.isLazy = isLazy;
	exports.isMemo = isMemo;
	exports.isPortal = isPortal;
	exports.isProfiler = isProfiler;
	exports.isStrictMode = isStrictMode;
	exports.isSuspense = isSuspense;
	  })();
	}


/***/ }),
/* 6 */
/*!**************************************************!*\
  !*** ../~/prop-types/factoryWithTypeCheckers.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var ReactIs = __webpack_require__(/*! react-is */ 4);
	var assign = __webpack_require__(/*! object-assign */ 7);
	
	var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ 8);
	var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ 9);
	
	var has = Function.call.bind(Object.prototype.hasOwnProperty);
	var printWarning = function() {};
	
	if (true) {
	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}
	
	function emptyFunctionThatReturnsNull() {
	  return null;
	}
	
	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
	
	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }
	
	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */
	
	  var ANONYMOUS = '<<anonymous>>';
	
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),
	
	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    elementType: createElementTypeTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };
	
	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/
	
	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;
	
	  function createChainableTypeChecker(validate) {
	    if (true) {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;
	
	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error(
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if (("development") !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            printWarning(
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }
	
	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);
	
	    return chainedCheckType;
	  }
	
	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);
	
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }
	
	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!ReactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      if (true) {
	        if (arguments.length > 1) {
	          printWarning(
	            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
	            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
	          );
	        } else {
	          printWarning('Invalid argument supplied to oneOf, expected an array.');
	        }
	      }
	      return emptyFunctionThatReturnsNull;
	    }
	
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }
	
	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);
	        if (type === 'symbol') {
	          return String(value);
	        }
	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (has(propValue, key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }
	
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning(
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
	        );
	        return emptyFunctionThatReturnsNull;
	      }
	    }
	
	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }
	
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	
	    return createChainableTypeChecker(validate);
	  }
	
	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }
	
	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }
	
	        return true;
	      default:
	        return false;
	    }
	  }
	
	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }
	
	    // falsy value can't be a Symbol
	    if (!propValue) {
	      return false;
	    }
	
	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }
	
	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }
	
	    return false;
	  }
	
	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }
	
	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }
	
	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }
	
	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }
	
	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;
	
	  return ReactPropTypes;
	};


/***/ }),
/* 7 */
/*!***********************************!*\
  !*** ../~/object-assign/index.js ***!
  \***********************************/
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	
	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ }),
/* 8 */
/*!***************************************************!*\
  !*** ../~/prop-types/lib/ReactPropTypesSecret.js ***!
  \***************************************************/
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	
	module.exports = ReactPropTypesSecret;


/***/ }),
/* 9 */
/*!*****************************************!*\
  !*** ../~/prop-types/checkPropTypes.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var printWarning = function() {};
	
	if (true) {
	  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ 8);
	  var loggedTypeFailures = {};
	  var has = Function.call.bind(Object.prototype.hasOwnProperty);
	
	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}
	
	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (true) {
	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error(
	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
	            );
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning(
	            (componentName || 'React class') + ': type specification of ' +
	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
	            'You may have forgotten to pass an argument to the type checker ' +
	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
	            'shape all require an argument).'
	          );
	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;
	
	          var stack = getStack ? getStack() : '';
	
	          printWarning(
	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
	          );
	        }
	      }
	    }
	  }
	}
	
	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */
	checkPropTypes.resetWarningCache = function() {
	  if (true) {
	    loggedTypeFailures = {};
	  }
	}
	
	module.exports = checkPropTypes;


/***/ }),
/* 10 */
/*!*************************************!*\
  !*** ../~/resumablejs/resumable.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * MIT Licensed
	 * http://www.23developer.com/opensource
	 * http://github.com/23/resumable.js
	 * Steffen Tiedemann Christensen, steffen@23company.com
	 */
	
	(function () {
	  "use strict";
	
	  var Resumable = function (opts) {
	    if (!(this instanceof Resumable)) {
	      return new Resumable(opts);
	    }
	    this.version = 1.0;
	    // SUPPORTED BY BROWSER?
	    // Check if these features are support by the browser:
	    // - File object type
	    // - Blob object type
	    // - FileList object type
	    // - slicing files
	    this.support =
	      typeof File !== "undefined" &&
	      typeof Blob !== "undefined" &&
	      typeof FileList !== "undefined" &&
	      (!!Blob.prototype.webkitSlice ||
	        !!Blob.prototype.mozSlice ||
	        !!Blob.prototype.slice ||
	        false);
	    if (!this.support) return false;
	
	    // PROPERTIES
	    var $ = this;
	    $.files = [];
	    $.subject = "";
	    $.defaults = {
	      chunkSize: 1 * 1024 * 1024,
	      forceChunkSize: false,
	      simultaneousUploads: 3,
	      fileParameterName: "file",
	      chunkNumberParameterName: "resumableChunkNumber",
	      chunkSizeParameterName: "resumableChunkSize",
	      currentChunkSizeParameterName: "resumableCurrentChunkSize",
	      totalSizeParameterName: "resumableTotalSize",
	      typeParameterName: "resumableType",
	      identifierParameterName: "resumableIdentifier",
	      fileNameParameterName: "resumableFilename",
	      relativePathParameterName: "resumableRelativePath",
	      totalChunksParameterName: "resumableTotalChunks",
	      subjectParameterName: "subject",
	      throttleProgressCallbacks: 0.5,
	      query: {},
	      headers: {},
	      preprocess: null,
	      method: "multipart",
	      uploadMethod: "POST",
	      testMethod: "GET",
	      prioritizeFirstAndLastChunk: false,
	      target: "/",
	      testTarget: null,
	      parameterNamespace: "",
	      testChunks: true,
	      generateUniqueIdentifier: null,
	      getTarget: null,
	      maxChunkRetries: 100,
	      chunkRetryInterval: undefined,
	      permanentErrors: [400, 404, 415, 500, 501],
	      maxFiles: undefined,
	      withCredentials: false,
	      xhrTimeout: 0,
	      clearInput: true,
	      chunkFormat: "blob",
	      setChunkTypeFromFile: false,
	      maxFilesErrorCallback: function (files, errorCount) {
	        var maxFiles = $.getOpt("maxFiles");
	        alert(
	          "Please upload no more than " +
	            maxFiles +
	            " file" +
	            (maxFiles === 1 ? "" : "s") +
	            " at a time."
	        );
	      },
	      minFileSize: 1,
	      minFileSizeErrorCallback: function (file, errorCount) {
	        alert(
	          file.fileName ||
	            file.name +
	              " is too small, please upload files larger than " +
	              $h.formatSize($.getOpt("minFileSize")) +
	              "."
	        );
	      },
	      maxFileSize: undefined,
	      maxFileSizeErrorCallback: function (file, errorCount) {
	        alert(
	          file.fileName ||
	            file.name +
	              " is too large, please upload files less than " +
	              $h.formatSize($.getOpt("maxFileSize")) +
	              "."
	        );
	      },
	      fileType: [],
	      fileTypeErrorCallback: function (file, errorCount) {
	        alert(
	          file.fileName ||
	            file.name +
	              " has type not allowed, please upload files of type " +
	              $.getOpt("fileType") +
	              "."
	        );
	      },
	    };
	    $.opts = opts || {};
	    $.getOpt = function (o) {
	      var $opt = this;
	      // Get multiple option if passed an array
	      if (o instanceof Array) {
	        var options = {};
	        $h.each(o, function (option) {
	          options[option] = $opt.getOpt(option);
	        });
	        return options;
	      }
	      // Otherwise, just return a simple option
	      if ($opt instanceof ResumableChunk) {
	        if (typeof $opt.opts[o] !== "undefined") {
	          return $opt.opts[o];
	        } else {
	          $opt = $opt.fileObj;
	        }
	      }
	      if ($opt instanceof ResumableFile) {
	        if (typeof $opt.opts[o] !== "undefined") {
	          return $opt.opts[o];
	        } else {
	          $opt = $opt.resumableObj;
	        }
	      }
	      if ($opt instanceof Resumable) {
	        if (typeof $opt.opts[o] !== "undefined") {
	          return $opt.opts[o];
	        } else {
	          return $opt.defaults[o];
	        }
	      }
	    };
	
	    // EVENTS
	    // catchAll(event, ...)
	    // fileSuccess(file), fileProgress(file), fileAdded(file, event), filesAdded(files, filesSkipped), fileRetry(file),
	    // fileError(file, message), complete(), progress(), error(message, file), pause()
	    $.events = [];
	    $.on = function (event, callback) {
	      $.events.push(event.toLowerCase(), callback);
	    };
	    $.fire = function () {
	      // `arguments` is an object, not array, in FF, so:
	      var args = [];
	      for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
	      // Find event listeners, and support pseudo-event `catchAll`
	      var event = args[0].toLowerCase();
	      for (var i = 0; i <= $.events.length; i += 2) {
	        if ($.events[i] == event) $.events[i + 1].apply($, args.slice(1));
	        if ($.events[i] == "catchall") $.events[i + 1].apply(null, args);
	      }
	      if (event == "fileerror") $.fire("error", args[2], args[1]);
	      if (event == "fileprogress") $.fire("progress");
	    };
	
	    // INTERNAL HELPER METHODS (handy, but ultimately not part of uploading)
	    var $h = {
	      stopEvent: function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	      },
	      each: function (o, callback) {
	        if (typeof o.length !== "undefined") {
	          for (var i = 0; i < o.length; i++) {
	            // Array or FileList
	            if (callback(o[i]) === false) return;
	          }
	        } else {
	          for (i in o) {
	            // Object
	            if (callback(i, o[i]) === false) return;
	          }
	        }
	      },
	      generateUniqueIdentifier: function (file, event) {
	        var custom = $.getOpt("generateUniqueIdentifier");
	        if (typeof custom === "function") {
	          return custom(file, event);
	        }
	        var relativePath =
	          file.webkitRelativePath || file.fileName || file.name; // Some confusion in different versions of Firefox
	        var size = file.size;
	        return size + "-" + relativePath.replace(/[^0-9a-zA-Z_-]/gim, "");
	      },
	      contains: function (array, test) {
	        var result = false;
	
	        $h.each(array, function (value) {
	          if (value == test) {
	            result = true;
	            return false;
	          }
	          return true;
	        });
	
	        return result;
	      },
	      formatSize: function (size) {
	        if (size < 1024) {
	          return size + " bytes";
	        } else if (size < 1024 * 1024) {
	          return (size / 1024.0).toFixed(0) + " KB";
	        } else if (size < 1024 * 1024 * 1024) {
	          return (size / 1024.0 / 1024.0).toFixed(1) + " MB";
	        } else {
	          return (size / 1024.0 / 1024.0 / 1024.0).toFixed(1) + " GB";
	        }
	      },
	      getTarget: function (request, params) {
	        var target = $.getOpt("target");
	
	        if (request === "test" && $.getOpt("testTarget")) {
	          target =
	            $.getOpt("testTarget") === "/"
	              ? $.getOpt("target")
	              : $.getOpt("testTarget");
	        }
	
	        if (typeof target === "function") {
	          return target(params);
	        }
	
	        var separator = target.indexOf("?") < 0 ? "?" : "&";
	        var joinedParams = params.join("&");
	
	        return target + separator + joinedParams;
	      },
	    };
	
	    var onDrop = function (event) {
	      $h.stopEvent(event);
	
	      //handle dropped things as items if we can (this lets us deal with folders nicer in some cases)
	      if (event.dataTransfer && event.dataTransfer.items) {
	        loadFiles(event.dataTransfer.items, event);
	      }
	      //else handle them as files
	      else if (event.dataTransfer && event.dataTransfer.files) {
	        loadFiles(event.dataTransfer.files, event);
	      }
	    };
	    var preventDefault = function (e) {
	      e.preventDefault();
	    };
	
	    /**
	     * processes a single upload item (file or directory)
	     * @param {Object} item item to upload, may be file or directory entry
	     * @param {string} path current file path
	     * @param {File[]} items list of files to append new items to
	     * @param {Function} cb callback invoked when item is processed
	     */
	    function processItem(item, path, items, cb) {
	      var entry;
	      if (item.isFile) {
	        // file provided
	        return item.file(function (file) {
	          file.relativePath = path + file.name;
	          items.push(file);
	          cb();
	        });
	      } else if (item.isDirectory) {
	        // item is already a directory entry, just assign
	        entry = item;
	      } else if (item instanceof File) {
	        items.push(item);
	      }
	      if ("function" === typeof item.webkitGetAsEntry) {
	        // get entry from file object
	        entry = item.webkitGetAsEntry();
	      }
	      if (entry && entry.isDirectory) {
	        // directory provided, process it
	        return processDirectory(entry, path + entry.name + "/", items, cb);
	      }
	      if ("function" === typeof item.getAsFile) {
	        // item represents a File object, convert it
	        item = item.getAsFile();
	        if (item instanceof File) {
	          item.relativePath = path + item.name;
	          items.push(item);
	        }
	      }
	      cb(); // indicate processing is done
	    }
	
	    /**
	     * cps-style list iteration.
	     * invokes all functions in list and waits for their callback to be
	     * triggered.
	     * @param  {Function[]}   items list of functions expecting callback parameter
	     * @param  {Function} cb    callback to trigger after the last callback has been invoked
	     */
	    function processCallbacks(items, cb) {
	      if (!items || items.length === 0) {
	        // empty or no list, invoke callback
	        return cb();
	      }
	      // invoke current function, pass the next part as continuation
	      items[0](function () {
	        processCallbacks(items.slice(1), cb);
	      });
	    }
	
	    /**
	     * recursively traverse directory and collect files to upload
	     * @param  {Object}   directory directory to process
	     * @param  {string}   path      current path
	     * @param  {File[]}   items     target list of items
	     * @param  {Function} cb        callback invoked after traversing directory
	     */
	    function processDirectory(directory, path, items, cb) {
	      var dirReader = directory.createReader();
	      dirReader.readEntries(function (entries) {
	        if (!entries.length) {
	          // empty directory, skip
	          return cb();
	        }
	        // process all conversion callbacks, finally invoke own one
	        processCallbacks(
	          entries.map(function (entry) {
	            // bind all properties except for callback
	            return processItem.bind(null, entry, path, items);
	          }),
	          cb
	        );
	      });
	    }
	
	    /**
	     * process items to extract files to be uploaded
	     * @param  {File[]} items items to process
	     * @param  {Event} event event that led to upload
	     */
	    function loadFiles(items, event) {
	      if (!items.length) {
	        return; // nothing to do
	      }
	      $.fire("beforeAdd");
	      var files = [];
	      processCallbacks(
	        Array.prototype.map.call(items, function (item) {
	          // bind all properties except for callback
	          return processItem.bind(null, item, "", files);
	        }),
	        function () {
	          if (files.length) {
	            // at least one file found
	            appendFilesFromFileList(files, event);
	          }
	        }
	      );
	    }
	
	    var appendFilesFromFileList = function (fileList, event) {
	      // check for uploading too many files
	      var errorCount = 0;
	      var o = $.getOpt([
	        "maxFiles",
	        "minFileSize",
	        "maxFileSize",
	        "maxFilesErrorCallback",
	        "minFileSizeErrorCallback",
	        "maxFileSizeErrorCallback",
	        "fileType",
	        "fileTypeErrorCallback",
	      ]);
	      if (
	        typeof o.maxFiles !== "undefined" &&
	        o.maxFiles < fileList.length + $.files.length
	      ) {
	        // if single-file upload, file is already added, and trying to add 1 new file, simply replace the already-added file
	        if (o.maxFiles === 1 && $.files.length === 1 && fileList.length === 1) {
	          $.removeFile($.files[0]);
	        } else {
	          o.maxFilesErrorCallback(fileList, errorCount++);
	          return false;
	        }
	      }
	      var files = [],
	        filesSkipped = [],
	        remaining = fileList.length;
	      var decreaseReamining = function () {
	        if (!--remaining) {
	          // all files processed, trigger event
	          if (!files.length && !filesSkipped.length) {
	            // no succeeded files, just skip
	            return;
	          }
	          window.setTimeout(function () {
	            $.fire("filesAdded", files, filesSkipped);
	          }, 0);
	        }
	      };
	      $h.each(fileList, function (file) {
	        var fileName = file.name;
	        if (o.fileType.length > 0) {
	          var fileTypeFound = false;
	          for (var index in o.fileType) {
	            var extension = "." + o.fileType[index];
	            if (
	              fileName
	                .toLowerCase()
	                .indexOf(
	                  extension.toLowerCase(),
	                  fileName.length - extension.length
	                ) !== -1
	            ) {
	              fileTypeFound = true;
	              break;
	            }
	          }
	          if (!fileTypeFound) {
	            o.fileTypeErrorCallback(file, errorCount++);
	            return false;
	          }
	        }
	
	        if (typeof o.minFileSize !== "undefined" && file.size < o.minFileSize) {
	          o.minFileSizeErrorCallback(file, errorCount++);
	          return false;
	        }
	        if (typeof o.maxFileSize !== "undefined" && file.size > o.maxFileSize) {
	          o.maxFileSizeErrorCallback(file, errorCount++);
	          return false;
	        }
	
	        function addFile(uniqueIdentifier) {
	          if (!$.getFromUniqueIdentifier(uniqueIdentifier)) {
	            (function () {
	              file.uniqueIdentifier = uniqueIdentifier;
	              var f = new ResumableFile($, file, uniqueIdentifier);
	              $.files.push(f);
	              files.push(f);
	              f.container =
	                typeof event != "undefined" ? event.srcElement : null;
	              window.setTimeout(function () {
	                $.fire("fileAdded", f, event);
	              }, 0);
	            })();
	          } else {
	            filesSkipped.push(file);
	          }
	          decreaseReamining();
	        }
	        // directories have size == 0
	        var uniqueIdentifier = $h.generateUniqueIdentifier(file, event);
	        if (uniqueIdentifier && typeof uniqueIdentifier.then === "function") {
	          // Promise or Promise-like object provided as unique identifier
	          uniqueIdentifier.then(
	            function (uniqueIdentifier) {
	              // unique identifier generation succeeded
	              addFile(uniqueIdentifier);
	            },
	            function () {
	              // unique identifier generation failed
	              // skip further processing, only decrease file count
	              decreaseReamining();
	            }
	          );
	        } else {
	          // non-Promise provided as unique identifier, process synchronously
	          addFile(uniqueIdentifier);
	        }
	      });
	    };
	
	    // INTERNAL OBJECT TYPES
	    function ResumableFile(resumableObj, file, uniqueIdentifier) {
	      var $ = this;
	      $.opts = {};
	      $.getOpt = resumableObj.getOpt;
	      $.subject = resumableObj.subject;
	      $._prevProgress = 0;
	      $.resumableObj = resumableObj;
	      $.file = file;
	      $.fileName = file.fileName || file.name; // Some confusion in different versions of Firefox
	      $.size = file.size;
	      $.relativePath =
	        file.relativePath || file.webkitRelativePath || $.fileName;
	      $.uniqueIdentifier = uniqueIdentifier;
	      $._pause = false;
	      $.container = "";
	      var _error = uniqueIdentifier !== undefined;
	
	      // Callback when something happens within the chunk
	      var chunkEvent = function (event, message) {
	        // event can be 'progress', 'success', 'error' or 'retry'
	        switch (event) {
	          case "progress":
	            $.resumableObj.fire("fileProgress", $, message);
	            break;
	          case "error":
	            $.abort();
	            _error = true;
	            $.chunks = [];
	            $.resumableObj.fire("fileError", $, message);
	            break;
	          case "success":
	            if (_error) return;
	            $.resumableObj.fire("fileProgress", $); // it's at least progress
	            if ($.isComplete()) {
	              $.resumableObj.fire("fileSuccess", $, message);
	            }
	            break;
	          case "retry":
	            $.resumableObj.fire("fileRetry", $);
	            break;
	        }
	      };
	
	      // Main code to set up a file object with chunks,
	      // packaged to be able to handle retries if needed.
	      $.chunks = [];
	      $.abort = function () {
	        // Stop current uploads
	        var abortCount = 0;
	        $h.each($.chunks, function (c) {
	          if (c.status() == "uploading") {
	            c.abort();
	            abortCount++;
	          }
	        });
	        if (abortCount > 0) $.resumableObj.fire("fileProgress", $);
	      };
	      $.cancel = function () {
	        // Reset this file to be void
	        var _chunks = $.chunks;
	        $.chunks = [];
	        // Stop current uploads
	        $h.each(_chunks, function (c) {
	          if (c.status() == "uploading") {
	            c.abort();
	            $.resumableObj.uploadNextChunk();
	          }
	        });
	        $.resumableObj.removeFile($);
	        $.resumableObj.fire("fileProgress", $);
	      };
	      $.retry = function () {
	        $.bootstrap();
	        var firedRetry = false;
	        $.resumableObj.on("chunkingComplete", function () {
	          if (!firedRetry) $.resumableObj.upload();
	          firedRetry = true;
	        });
	      };
	      $.bootstrap = function () {
	        $.abort();
	        _error = false;
	        // Rebuild stack of chunks from file
	        $.chunks = [];
	        $._prevProgress = 0;
	        var round = $.getOpt("forceChunkSize") ? Math.ceil : Math.floor;
	        var maxOffset = Math.max(round($.file.size / $.getOpt("chunkSize")), 1);
	        for (var offset = 0; offset < maxOffset; offset++) {
	          (function (offset) {
	            window.setTimeout(function () {
	              $.chunks.push(
	                new ResumableChunk($.resumableObj, $, offset, chunkEvent)
	              );
	              $.resumableObj.fire("chunkingProgress", $, offset / maxOffset);
	            }, 0);
	          })(offset);
	        }
	        window.setTimeout(function () {
	          $.resumableObj.fire("chunkingComplete", $);
	        }, 0);
	      };
	      $.progress = function () {
	        if (_error) return 1;
	        // Sum up progress across everything
	        var ret = 0;
	        var error = false;
	        $h.each($.chunks, function (c) {
	          if (c.status() == "error") error = true;
	          ret += c.progress(true); // get chunk progress relative to entire file
	        });
	        ret = error ? 1 : ret > 0.99999 ? 1 : ret;
	        ret = Math.max($._prevProgress, ret); // We don't want to lose percentages when an upload is paused
	        $._prevProgress = ret;
	        return ret;
	      };
	      $.isUploading = function () {
	        var uploading = false;
	        $h.each($.chunks, function (chunk) {
	          if (chunk.status() == "uploading") {
	            uploading = true;
	            return false;
	          }
	        });
	        return uploading;
	      };
	      $.isComplete = function () {
	        var outstanding = false;
	        $h.each($.chunks, function (chunk) {
	          var status = chunk.status();
	          if (
	            status == "pending" ||
	            status == "uploading" ||
	            chunk.preprocessState === 1
	          ) {
	            outstanding = true;
	            return false;
	          }
	        });
	        return !outstanding;
	      };
	      $.pause = function (pause) {
	        if (typeof pause === "undefined") {
	          $._pause = $._pause ? false : true;
	        } else {
	          $._pause = pause;
	        }
	      };
	      $.isPaused = function () {
	        return $._pause;
	      };
	
	      // Bootstrap and return
	      $.resumableObj.fire("chunkingStart", $);
	      $.bootstrap();
	      return this;
	    }
	
	    function ResumableChunk(resumableObj, fileObj, offset, callback) {
	      var $ = this;
	      $.opts = {};
	      $.getOpt = resumableObj.getOpt;
	      $.subject = resumableObj.subject;
	      $.resumableObj = resumableObj;
	      $.fileObj = fileObj;
	      $.fileObjSize = fileObj.size;
	      $.fileObjType = fileObj.file.type;
	      $.offset = offset;
	      $.callback = callback;
	      $.lastProgressCallback = new Date();
	      $.tested = false;
	      $.retries = 0;
	      $.pendingRetry = false;
	      $.preprocessState = 0; // 0 = unprocessed, 1 = processing, 2 = finished
	
	      // Computed properties
	      var chunkSize = $.getOpt("chunkSize");
	      $.loaded = 0;
	      $.startByte = $.offset * chunkSize;
	      $.endByte = Math.min($.fileObjSize, ($.offset + 1) * chunkSize);
	      if (
	        $.fileObjSize - $.endByte < chunkSize &&
	        !$.getOpt("forceChunkSize")
	      ) {
	        // The last chunk will be bigger than the chunk size, but less than 2*chunkSize
	        $.endByte = $.fileObjSize;
	      }
	      $.xhr = null;
	
	      // test() makes a GET request without any data to see if the chunk has already been uploaded in a previous session
	      $.test = function () {
	        // Set up request and listen for event
	        $.xhr = new XMLHttpRequest();
	
	        var testHandler = function (e) {
	          $.tested = true;
	          var status = $.status();
	          if (status == "success") {
	            $.callback(status, $.message());
	            $.resumableObj.uploadNextChunk();
	          } else {
	            $.send();
	          }
	        };
	        $.xhr.addEventListener("load", testHandler, false);
	        $.xhr.addEventListener("error", testHandler, false);
	        $.xhr.addEventListener("timeout", testHandler, false);
	
	        // Add data from the query options
	        var params = [];
	        var parameterNamespace = $.getOpt("parameterNamespace");
	        var customQuery = $.getOpt("query");
	        if (typeof customQuery == "function")
	          customQuery = customQuery($.fileObj, $);
	        $h.each(customQuery, function (k, v) {
	          params.push(
	            [
	              encodeURIComponent(parameterNamespace + k),
	              encodeURIComponent(v),
	            ].join("=")
	          );
	        });
	        // Add extra data to identify chunk
	        params = params.concat(
	          [
	            // define key/value pairs for additional parameters
	            ["chunkNumberParameterName", $.offset + 1],
	            ["chunkSizeParameterName", $.getOpt("chunkSize")],
	            ["currentChunkSizeParameterName", $.endByte - $.startByte],
	            ["totalSizeParameterName", $.fileObjSize],
	            ["typeParameterName", $.fileObjType],
	            ["identifierParameterName", $.fileObj.uniqueIdentifier],
	            ["fileNameParameterName", $.fileObj.fileName],
	            ["relativePathParameterName", $.fileObj.relativePath],
	            ["totalChunksParameterName", $.fileObj.chunks.length],
	            ["subjectParameterName", $.subject],
	          ]
	            .filter(function (pair) {
	              // include items that resolve to truthy values
	              // i.e. exclude false, null, undefined and empty strings
	              return $.getOpt(pair[0]);
	            })
	            .map(function (pair) {
	              // map each key/value pair to its final form
	              return [
	                parameterNamespace + $.getOpt(pair[0]),
	                encodeURIComponent(pair[1]),
	              ].join("=");
	            })
	        );
	        // Append the relevant chunk and send it
	        $.xhr.open($.getOpt("testMethod"), $h.getTarget("test", params));
	        $.xhr.timeout = $.getOpt("xhrTimeout");
	        $.xhr.withCredentials = $.getOpt("withCredentials");
	        // Add data from header options
	        var customHeaders = $.getOpt("headers");
	        if (typeof customHeaders === "function") {
	          customHeaders = customHeaders($.fileObj, $);
	        }
	        $h.each(customHeaders, function (k, v) {
	          $.xhr.setRequestHeader(k, v);
	        });
	        $.xhr.send(null);
	      };
	
	      $.preprocessFinished = function () {
	        $.preprocessState = 2;
	        $.send();
	      };
	
	      // send() uploads the actual data in a POST call
	      $.send = function () {
	        var preprocess = $.getOpt("preprocess");
	        if (typeof preprocess === "function") {
	          switch ($.preprocessState) {
	            case 0:
	              $.preprocessState = 1;
	              preprocess($);
	              return;
	            case 1:
	              return;
	            case 2:
	              break;
	          }
	        }
	        if ($.getOpt("testChunks") && !$.tested) {
	          $.test();
	          return;
	        }
	
	        // Set up request and listen for event
	        $.xhr = new XMLHttpRequest();
	
	        // Progress
	        $.xhr.upload.addEventListener(
	          "progress",
	          function (e) {
	            if (
	              new Date() - $.lastProgressCallback >
	              $.getOpt("throttleProgressCallbacks") * 1000
	            ) {
	              $.callback("progress");
	              $.lastProgressCallback = new Date();
	            }
	            $.loaded = e.loaded || 0;
	          },
	          false
	        );
	        $.loaded = 0;
	        $.pendingRetry = false;
	        $.callback("progress");
	
	        // Done (either done, failed or retry)
	        var doneHandler = function (e) {
	          var status = $.status();
	          if (status == "success" || status == "error") {
	            $.callback(status, $.message());
	            $.resumableObj.uploadNextChunk();
	          } else {
	            $.callback("retry", $.message());
	            $.abort();
	            $.retries++;
	            var retryInterval = $.getOpt("chunkRetryInterval");
	            if (retryInterval !== undefined) {
	              $.pendingRetry = true;
	              setTimeout($.send, retryInterval);
	            } else {
	              $.send();
	            }
	          }
	        };
	        $.xhr.addEventListener("load", doneHandler, false);
	        $.xhr.addEventListener("error", doneHandler, false);
	        $.xhr.addEventListener("timeout", doneHandler, false);
	
	        // Set up the basic query data from Resumable
	        var query = [
	          ["chunkNumberParameterName", $.offset + 1],
	          ["chunkSizeParameterName", $.getOpt("chunkSize")],
	          ["currentChunkSizeParameterName", $.endByte - $.startByte],
	          ["totalSizeParameterName", $.fileObjSize],
	          ["typeParameterName", $.fileObjType],
	          ["identifierParameterName", $.fileObj.uniqueIdentifier],
	          ["fileNameParameterName", $.fileObj.fileName],
	          ["relativePathParameterName", $.fileObj.relativePath],
	          ["totalChunksParameterName", $.fileObj.chunks.length],
	          ["subjectParameterName", $.subject],
	        ]
	          .filter(function (pair) {
	            // include items that resolve to truthy values
	            // i.e. exclude false, null, undefined and empty strings
	            return $.getOpt(pair[0]);
	          })
	          .reduce(function (query, pair) {
	            // assign query key/value
	            query[$.getOpt(pair[0])] = pair[1];
	            return query;
	          }, {});
	        // Mix in custom data
	        var customQuery = $.getOpt("query");
	        if (typeof customQuery == "function")
	          customQuery = customQuery($.fileObj, $);
	        $h.each(customQuery, function (k, v) {
	          query[k] = v;
	        });
	
	        var func = $.fileObj.file.slice
	          ? "slice"
	          : $.fileObj.file.mozSlice
	          ? "mozSlice"
	          : $.fileObj.file.webkitSlice
	          ? "webkitSlice"
	          : "slice";
	        var bytes = $.fileObj.file[func](
	          $.startByte,
	          $.endByte,
	          $.getOpt("setChunkTypeFromFile") ? $.fileObj.file.type : ""
	        );
	        var data = null;
	        var params = [];
	
	        var parameterNamespace = $.getOpt("parameterNamespace");
	        if ($.getOpt("method") === "octet") {
	          // Add data from the query options
	          data = bytes;
	          $h.each(query, function (k, v) {
	            params.push(
	              [
	                encodeURIComponent(parameterNamespace + k),
	                encodeURIComponent(v),
	              ].join("=")
	            );
	          });
	        } else {
	          // Add data from the query options
	          data = new FormData();
	          $h.each(query, function (k, v) {
	            data.append(parameterNamespace + k, v);
	            params.push(
	              [
	                encodeURIComponent(parameterNamespace + k),
	                encodeURIComponent(v),
	              ].join("=")
	            );
	          });
	          if ($.getOpt("chunkFormat") == "blob") {
	            data.append(
	              parameterNamespace + $.getOpt("fileParameterName"),
	              bytes,
	              $.fileObj.fileName
	            );
	          } else if ($.getOpt("chunkFormat") == "base64") {
	            var fr = new FileReader();
	            fr.onload = function (e) {
	              data.append(
	                parameterNamespace + $.getOpt("fileParameterName"),
	                fr.result
	              );
	              $.xhr.send(data);
	            };
	            fr.readAsDataURL(bytes);
	          }
	        }
	
	        var target = $h.getTarget("upload", params);
	        var method = $.getOpt("uploadMethod");
	
	        $.xhr.open(method, target);
	        if ($.getOpt("method") === "octet") {
	          $.xhr.setRequestHeader("Content-Type", "application/octet-stream");
	        }
	        $.xhr.timeout = $.getOpt("xhrTimeout");
	        $.xhr.withCredentials = $.getOpt("withCredentials");
	        // Add data from header options
	        var customHeaders = $.getOpt("headers");
	        if (typeof customHeaders === "function") {
	          customHeaders = customHeaders($.fileObj, $);
	        }
	
	        $h.each(customHeaders, function (k, v) {
	          $.xhr.setRequestHeader(k, v);
	        });
	
	        if ($.getOpt("chunkFormat") == "blob") {
	          $.xhr.send(data);
	        }
	      };
	      $.abort = function () {
	        // Abort and reset
	        if ($.xhr) $.xhr.abort();
	        $.xhr = null;
	      };
	      $.status = function () {
	        // Returns: 'pending', 'uploading', 'success', 'error'
	        if ($.pendingRetry) {
	          // if pending retry then that's effectively the same as actively uploading,
	          // there might just be a slight delay before the retry starts
	          return "uploading";
	        } else if (!$.xhr) {
	          return "pending";
	        } else if ($.xhr.readyState < 4) {
	          // Status is really 'OPENED', 'HEADERS_RECEIVED' or 'LOADING' - meaning that stuff is happening
	          return "uploading";
	        } else {
	          if ($.xhr.status == 200 || $.xhr.status == 201) {
	            // HTTP 200, 201 (created)
	            return "success";
	          } else if (
	            $h.contains($.getOpt("permanentErrors"), $.xhr.status) ||
	            $.retries >= $.getOpt("maxChunkRetries")
	          ) {
	            // HTTP 415/500/501, permanent error
	            return "error";
	          } else {
	            // this should never happen, but we'll reset and queue a retry
	            // a likely case for this would be 503 service unavailable
	            $.abort();
	            return "pending";
	          }
	        }
	      };
	      $.message = function () {
	        return $.xhr ? $.xhr.responseText : "";
	      };
	      $.progress = function (relative) {
	        if (typeof relative === "undefined") relative = false;
	        var factor = relative ? ($.endByte - $.startByte) / $.fileObjSize : 1;
	        if ($.pendingRetry) return 0;
	        if (!$.xhr || !$.xhr.status) factor *= 0.95;
	        var s = $.status();
	        switch (s) {
	          case "success":
	          case "error":
	            return 1 * factor;
	          case "pending":
	            return 0 * factor;
	          default:
	            return ($.loaded / ($.endByte - $.startByte)) * factor;
	        }
	      };
	      return this;
	    }
	
	    // QUEUE
	    $.uploadNextChunk = function () {
	      var found = false;
	
	      // In some cases (such as videos) it's really handy to upload the first
	      // and last chunk of a file quickly; this let's the server check the file's
	      // metadata and determine if there's even a point in continuing.
	      if ($.getOpt("prioritizeFirstAndLastChunk")) {
	        $h.each($.files, function (file) {
	          if (
	            file.chunks.length &&
	            file.chunks[0].status() == "pending" &&
	            file.chunks[0].preprocessState === 0
	          ) {
	            file.chunks[0].send();
	            found = true;
	            return false;
	          }
	          if (
	            file.chunks.length > 1 &&
	            file.chunks[file.chunks.length - 1].status() == "pending" &&
	            file.chunks[file.chunks.length - 1].preprocessState === 0
	          ) {
	            file.chunks[file.chunks.length - 1].send();
	            found = true;
	            return false;
	          }
	        });
	        if (found) return true;
	      }
	
	      // Now, simply look for the next, best thing to upload
	      $h.each($.files, function (file) {
	        if (file.isPaused() === false) {
	          $h.each(file.chunks, function (chunk) {
	            if (chunk.status() == "pending" && chunk.preprocessState === 0) {
	              chunk.send();
	              found = true;
	              return false;
	            }
	          });
	        }
	        if (found) return false;
	      });
	      if (found) return true;
	
	      // The are no more outstanding chunks to upload, check is everything is done
	      var outstanding = false;
	      $h.each($.files, function (file) {
	        if (!file.isComplete()) {
	          outstanding = true;
	          return false;
	        }
	      });
	      if (!outstanding) {
	        // All chunks have been uploaded, complete
	        $.fire("complete");
	      }
	      return false;
	    };
	
	    // PUBLIC METHODS FOR RESUMABLE.JS
	    $.assignBrowse = function (domNodes, isDirectory) {
	      if (typeof domNodes.length == "undefined") domNodes = [domNodes];
	
	      $h.each(domNodes, function (domNode) {
	        var input;
	        if (domNode.tagName === "INPUT" && domNode.type === "file") {
	          input = domNode;
	        } else {
	          input = document.createElement("input");
	          input.setAttribute("type", "file");
	          input.style.display = "none";
	          domNode.addEventListener(
	            "click",
	            function () {
	              input.style.opacity = 0;
	              input.style.display = "block";
	              input.focus();
	              input.click();
	              input.style.display = "none";
	            },
	            false
	          );
	          domNode.appendChild(input);
	        }
	        var maxFiles = $.getOpt("maxFiles");
	        if (typeof maxFiles === "undefined" || maxFiles != 1) {
	          input.setAttribute("multiple", "multiple");
	        } else {
	          input.removeAttribute("multiple");
	        }
	        if (isDirectory) {
	          input.setAttribute("webkitdirectory", "webkitdirectory");
	        } else {
	          input.removeAttribute("webkitdirectory");
	        }
	        var fileTypes = $.getOpt("fileType");
	        if (typeof fileTypes !== "undefined" && fileTypes.length >= 1) {
	          input.setAttribute(
	            "accept",
	            fileTypes
	              .map(function (e) {
	                return "." + e;
	              })
	              .join(",")
	          );
	        } else {
	          input.removeAttribute("accept");
	        }
	        // When new files are added, simply append them to the overall list
	        input.addEventListener(
	          "change",
	          function (e) {
	            appendFilesFromFileList(e.target.files, e);
	            var clearInput = $.getOpt("clearInput");
	            if (clearInput) {
	              e.target.value = "";
	            }
	          },
	          false
	        );
	      });
	    };
	    $.assignDrop = function (domNodes) {
	      if (typeof domNodes.length == "undefined") domNodes = [domNodes];
	
	      $h.each(domNodes, function (domNode) {
	        domNode.addEventListener("dragover", preventDefault, false);
	        domNode.addEventListener("dragenter", preventDefault, false);
	        domNode.addEventListener("drop", onDrop, false);
	      });
	    };
	    $.unAssignDrop = function (domNodes) {
	      if (typeof domNodes.length == "undefined") domNodes = [domNodes];
	
	      $h.each(domNodes, function (domNode) {
	        domNode.removeEventListener("dragover", preventDefault);
	        domNode.removeEventListener("dragenter", preventDefault);
	        domNode.removeEventListener("drop", onDrop);
	      });
	    };
	    $.isUploading = function () {
	      var uploading = false;
	      $h.each($.files, function (file) {
	        if (file.isUploading()) {
	          uploading = true;
	          return false;
	        }
	      });
	      return uploading;
	    };
	    $.upload = function () {
	      // Make sure we don't start too many uploads at once
	      if ($.isUploading()) return;
	      // Kick off the queue
	      $.fire("uploadStart");
	      for (var num = 1; num <= $.getOpt("simultaneousUploads"); num++) {
	        $.uploadNextChunk();
	      }
	    };
	    $.pause = function () {
	      // Resume all chunks currently being uploaded
	      $h.each($.files, function (file) {
	        file.abort();
	      });
	      $.fire("pause");
	    };
	    $.cancel = function () {
	      $.fire("beforeCancel");
	      for (var i = $.files.length - 1; i >= 0; i--) {
	        $.files[i].cancel();
	      }
	      $.fire("cancel");
	    };
	    $.progress = function () {
	      var totalDone = 0;
	      var totalSize = 0;
	      // Resume all chunks currently being uploaded
	      $h.each($.files, function (file) {
	        totalDone += file.progress() * file.size;
	        totalSize += file.size;
	      });
	      return totalSize > 0 ? totalDone / totalSize : 0;
	    };
	    $.addFile = function (file, event) {
	      appendFilesFromFileList([file], event);
	    };
	    $.addFiles = function (files, event) {
	      appendFilesFromFileList(files, event);
	    };
	    $.removeFile = function (file) {
	      for (var i = $.files.length - 1; i >= 0; i--) {
	        if ($.files[i] === file) {
	          $.files.splice(i, 1);
	        }
	      }
	    };
	    $.getFromUniqueIdentifier = function (uniqueIdentifier) {
	      var ret = false;
	      $h.each($.files, function (f) {
	        if (f.uniqueIdentifier == uniqueIdentifier) ret = f;
	      });
	      return ret;
	    };
	    $.getSize = function () {
	      var totalSize = 0;
	      $h.each($.files, function (file) {
	        totalSize += file.size;
	      });
	      return totalSize;
	    };
	    $.handleDropEvent = function (e) {
	      onDrop(e);
	    };
	    $.handleChangeEvent = function (e) {
	      appendFilesFromFileList(e.target.files, e);
	      e.target.value = "";
	    };
	    $.updateQuery = function (query) {
	      $.opts.query = query;
	    };
	
	    return this;
	  };
	
	  // Node.js-style export for Node and Component
	  if (true) {
	    module.exports = Resumable;
	  } else if (typeof define === "function" && define.amd) {
	    // AMD/requirejs: Define the module
	    define(function () {
	      return Resumable;
	    });
	  } else {
	    // Browser: Expose to window
	    window.Resumable = Resumable;
	  }
	})();


/***/ })
/******/ ]);
//# sourceMappingURL=http://127.0.0.1:8080/build/bundle.js.map