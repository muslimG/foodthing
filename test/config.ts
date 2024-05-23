/* eslint-disable */
import './fetch';

import { faker } from '@faker-js/faker';

// import Modal from 'react-modal';
// Modal.setAppElement('body');

jest.useFakeTimers().setSystemTime(new Date('2020-02-01 09:00'));
faker.seed(123);

jest.mock('next/router', () => require('next-router-mock'));

global.console = {
  ...global.console,
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

const { location } = window;
// @ts-ignore
delete window.location;
window.location = { ...location, assign: jest.fn() };
window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})) as any;

window.matchMedia = () => ({
  matches: false,
  addListener: () => { },
  removeListener: () => { },
  media: '',
  onchange: () => { },
  addEventListener: () => { },
  removeEventListener: () => { },
  dispatchEvent: () => true,
});

window.scrollTo = jest.fn();
