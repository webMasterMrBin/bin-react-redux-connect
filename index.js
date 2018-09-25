"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// used e.g. connect(component, [state], action1, action2 ...);

exports.default = function (component, reducers) {
  for (var _len = arguments.length, actions = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    actions[_key - 2] = arguments[_key];
  }

  if (actions.length === 0) {
    throw new Error("actions is Empty");
  }

  var mapDispatchProps = function mapDispatchProps(dispatch) {
    var result = actions.reduce(function (accumulator, currentValue) {
      return _extends({}, accumulator, currentValue);
    }, {});
    return (0, _redux.bindActionCreators)(result, dispatch);
  };

  if (Array.isArray(reducers)) {
    var mapStateProps = function mapStateProps(state) {
      var states = {};
      if (reducers.length !== 0) {
        reducers.forEach(function (o) {
          states[o] = state[o];
        });
        return states;
      }

      return state;
    };

    return (0, _reactRedux.connect)(mapStateProps, mapDispatchProps)(component);
  } else {
    throw new Error("reducers is Array");
  }
};

require("babel-polyfill");

var _reactRedux = require("react-redux");

var _redux = require("redux");
