"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeActions = exports.storeActionsMiddleware = undefined;

var _every = require("lodash/every");

var _every2 = _interopRequireDefault(_every);

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isMatch = require("lodash/isMatch");

var _isMatch2 = _interopRequireDefault(_isMatch);

var _isObject = require("lodash/isObject");

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _actions = [];
var isEql = _isEqual2.default;

var storeActionsMiddleware = function storeActionsMiddleware(store) {
  return function (next) {
    return function (action) {
      if (typeof action !== "function") {
        _actions.push(action);
      }

      return next(action);
    };
  };
};

var compare = function compare() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _every2.default)(args, function (arg) {
    var result = void 0;

    if ((0, _isObject2.default)(arg)) {
      var _matches = (0, _filter2.default)(_actions, function (action) {
        return action.type == arg.type;
      });

      result = (0, _find2.default)(_matches, function (match) {
        return isEql(match, arg);
      });
    } else {
      result = (0, _find2.default)(_actions, function (action) {
        return action.type == arg;
      });
    }

    return !!result;
  });
};

var matches = function matches() {
  isEql = _isMatch2.default;
  return compare.apply(undefined, arguments);
};

var has = function has() {
  isEql = _isEqual2.default;
  return compare.apply(undefined, arguments);
};

var storeActions = {
  has: has,
  matches: matches,
  clear: function clear() {
    return _actions = [];
  },
  actions: function actions() {
    return _actions;
  }
};

exports.storeActionsMiddleware = storeActionsMiddleware;
exports.storeActions = storeActions;