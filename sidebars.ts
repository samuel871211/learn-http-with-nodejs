import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

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
  tutorialSidebar: [
    {
      type: "doc",
      label: "昱昇の技術部落格",
      id: "index",
    },
    {
      type: "category",
      label: "http",
      items: [
        "http/index",
        "http/anatomy-of-an-http-message",
        "http/keep-alive-and-connection",
        "http/http-1.1-HOL-blocking",
        "http/origin-and-referer",
        "http/referrer-policy",
        "http/content-type-and-mime-type",
        "http/server-sent-events",
        "http/transfer-encoding",
        "http/content-and-accept-encoding",
        "http/sec-fetch",
        "http/iframe-security",
        "http/http-caching-1",
        "http/http-caching-2",
        "http/http-authentication",
        "http/http-redirections",
        "http/http-range-requests",
        "http/http-content-negotiation",
        "http/upgrade",
        "http/content-security-policy-1",
        "http/content-security-policy-2",
        "http/cross-origin-resource-sharing",
        "http/cross-origin-resource-policy",
        "http/http-request-methods",
        "http/http-response-status-codes",
        "http/from",
        "http/refresh",
        "http/repr-digest",
        "http/retry-after-and-date",
        "http/user-agent",
        "http/source-map",
        "http/http-observatory-report",
        "http/evolution-of-http",
        "http/accept-patch-and-accept-post",
        "http/nmap-http-scripts",
        "http/end",
      ],
    },
    {
      type: "category",
      label: "web-security",
      items: ["web-security/dot-git", "web-security/nmap-mysql-scripts"],
    },
    {
      type: "category",
      label: "web-tech",
      items: ["web-tech/web-rtc", "web-tech/binary-data-in-javascript"],
    },
    {
      type: "category",
      label: "tcp",
      items: ["tcp/nagle-algorithm", "tcp/tcp-finite-state-machine"],
    },
    {
      type: "category",
      label: "data-formats",
      items: ["data-formats/rss", "data-formats/geojson"],
    },
    {
      type: "category",
      label: "protocols",
      items: ["protocols/mqtt"],
    },
    // 'web-security': [
    //   "web-security/dot-git",
    //   "web-security/nmap-mysql-scripts",
    // ],
    // 'web-tech': [
    //   "web-tech/web-rtc",
    //   "web-tech/binary-data-in-javascript",
    // ],
    // 'tcp': [
    //   "tcp/nagle-algorithm",
    //   "tcp/tcp-finite-state-machine",
    // ],
    // 'data-formats': [
    //   "data-formats/rss",
    //   "data-formats/geojson",
    // ],
    // 'protocols': [
    //   "protocols/mqtt",
    // ]
  ],

  // But you can create a sidebar manually
  // tutorialSidebar: [
  //   "index",
  //   "http/anatomy-of-an-http-message",
  //   "http/keep-alive-and-connection",
  //   "http/http-1.1-HOL-blocking",
  //   "http/origin-and-referer",
  //   "http/referrer-policy",
  //   "http/content-type-and-mime-type",
  //   "http/server-sent-events",
  //   "http/transfer-encoding",
  //   "http/content-and-accept-encoding",
  //   "http/sec-fetch",
  //   "http/x-frame-options-and-csp-frame-ancestors",
  //   "http/http-caching-1",
  //   "http/http-caching-2",
  //   "http/http-authentication",
  //   "http/http-redirections",
  //   "http/http-range-requests",
  //   "http/http-content-negotiation",
  //   "http/upgrade",
  //   "http/content-security-policy-1",
  //   "http/content-security-policy-2",
  //   "http/cross-origin-resource-sharing",
  //   "http/cross-origin-resource-policy",
  //   "http/http-request-methods",
  //   "http/http-response-status-codes",
  //   "http/from",
  //   "http/refresh",
  //   "http/repr-digest",
  //   "http/retry-after-and-date",
  //   "http/user-agent",
  //   "http/source-map",
  //   "http/http-observatory-report",
  //   "http/evolution-of-http",
  //   "http/accept-patch-and-accept-post",
  //   "http/nmap-http-scripts",
  //   "data-formats/rss",
  //   "data-formats/geojson",
  //   "web-security/dot-git",
  //   "web-security/nmap-mysql-scripts",
  //   "web-tech/web-rtc",
  //   "web-tech/binary-data-in-javascript",
  //   "protocols/mqtt",
  //   "tcp/nagle-algorithm",
  //   "tcp/tcp-finite-state-machine",
  //   "end",
  //   // {
  //   //   type: 'category',
  //   //   label: 'Tutorial',
  //   //   items: ['tutorial-basics/create-a-document'],
  //   // },
  // ],
};

export default sidebars;
