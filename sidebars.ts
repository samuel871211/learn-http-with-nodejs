import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [
    'index',
    'anatomy-of-an-http-message',
    'keep-alive-and-connection',
    'http-1.1-HOL-blocking',
    'evolution-of-http',
    'origin-and-referer',
    'referrer-policy',
    'content-type-and-mime-type',
    'content-and-accept-encoding',
    'web-rtc',
    'http-caching-1',
    'http-caching-2',
    'http-authentication',
    'http-redirections',
    'http-range-requests',
    'http-content-negotiation',
    'upgrade',
    'content-security-policy-1',
    'content-security-policy-2',
    'x-frame-options',
    'x-xss-protection',
    'cross-origin-resource-sharing',
    'cross-origin-resource-policy',
    'http-request-methods',
    'http-response-status-codes',
    'date',
    'from',
    'refresh',
    'repr-digest',
    'retry-after',
    'user-agent',
    'source-map',
    'http-observatory-report',
    'end',
    // {
    //   type: 'category',
    //   label: 'Tutorial',
    //   items: ['tutorial-basics/create-a-document'],
    // },
  ],
};

export default sidebars;
