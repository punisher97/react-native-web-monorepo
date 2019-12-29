/**
 * @format
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitForElement } from '@testing-library/react';
import { App } from 'shared/src/App';
import Root from 'shared/src/Root';

// Note: test renderer must be required after react-native.

test('renders correctly App', () => {
  render(<App />);
});

test('Renders the shared root', async () => {
  const { getByText, baseElement } = render(<Root />);
  const theText = 'App';
  await waitForElement(() => getByText(theText));
  expect(getByText(theText)).toHaveTextContent(theText);
  expect(baseElement).toMatchSnapshot();
});
