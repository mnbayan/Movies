import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {};

    for (const key in actions) {
      if (actions[key]) {
        boundActions[key] = actions[key](dispatch);
      }
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  Provider.propTypes = {
    children: PropTypes.element.isRequired
  };

  return { Context, Provider };
};
