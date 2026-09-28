/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('HTML Feedback Form - Email Domain Validation', () => {
  let emailInput;

  beforeEach(() => {
    // Read the HTML file and load it into the DOM
    const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');
    document.documentElement.innerHTML = html.toString();

    emailInput = document.getElementById('email');
  });

  test('Email field should exist and be required', () => {
    expect(emailInput).not.toBeNull();
    expect(emailInput.hasAttribute('required')).toBe(true);
  });

  test('Should accept emails ending with @niet.co.in domain', () => {
    const validEmails = [
      'student@niet.co.in',
      'john.doe@niet.co.in',
      'user123@niet.co.in'
    ];

    const domainRegex = /^[a-zA-Z0-9._%+-]+@niet\.co\.in$/;

    validEmails.forEach((email) => {
      emailInput.value = email;
      expect(domainRegex.test(emailInput.value)).toBe(true);
    });
  });

  test('Should reject emails from any domain other than niet.co.in', () => {
    const invalidEmails = [
      'user@gmail.com',
      'test@yahoo.com',
      'student@niet.co.com',
      'fake@sub.niet.co.in.org',
      'invalid-email'
    ];

    const domainRegex = /^[a-zA-Z0-9._%+-]+@niet\.co\.in$/;

    invalidEmails.forEach((email) => {
      emailInput.value = email;
      expect(domainRegex.test(emailInput.value)).toBe(false);
    });
  });
});