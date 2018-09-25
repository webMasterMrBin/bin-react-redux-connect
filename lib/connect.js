import "babel-polyfill";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// used e.g. connect(component, [state], action1, action2 ...);

export default function(component, reducers, ...actions) {
  if (actions.length === 0) {
    throw new Error(`actions is Empty`);
  }

  const mapDispatchProps = dispatch => {
    const result = actions.reduce((accumulator, currentValue) => {
      return { ...accumulator, ...currentValue };
    }, {});
    return bindActionCreators(result, dispatch);
  }

  if (Array.isArray(reducers)) {
    const mapStateProps = state => {
      const states  = {}
      if (reducers.length !== 0) {
        reducers.forEach(o => {
          states[o] = state[o];
        });
        return states;
      }

      return state;
    };

    return connect(mapStateProps, mapDispatchProps)(component);
  } else {
    throw new Error(`reducers is Array`);
  }
}
