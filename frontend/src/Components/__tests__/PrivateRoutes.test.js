import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import PrivateRoute from '../PrivateRoutes';

const mockStore = configureMockStore();
const store = mockStore({
  AuthReducer: {
    isLoginSuccess: true, // Set your initial state here
  },
});

describe('PrivateRoute component', () => {
  it('renders children when authenticated', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PrivateRoute>
          <div>Children Content</div>
        </PrivateRoute>
      </Provider>
    );

    const childrenElement = getByText('Children Content');
    expect(childrenElement).toBeInTheDocument();
  });
});
