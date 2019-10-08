import { configure } from '@storybook/react';
import '../src/assets/styles.less';
import '../src/assets/tailwind-extension.css';

configure(require.context('../src', true, /\.stories\.tsx?$/), module);
