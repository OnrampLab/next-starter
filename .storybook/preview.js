import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { DocsPage } from 'storybook-addon-deps/blocks';
import '../src/assets/styles.less';
import '../src/assets/tailwind-extension.css';

addParameters({
  options: {
    showRoots: true,
  },
  docs: { page: DocsPage },
  dependencies: {
    //display only dependencies/dependents that have a story in storybook
    //by default this is false
    withStoriesOnly: true,

    //completely hide a dependency/dependents block if it has no elements
    //by default this is false
    hideEmpty: true,
  }
});

addDecorator(story => (
  <>
    {story()}
  </>
));
