/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('HTML Feedback Form - Email Domain Validation', () => {
  let emailInput;
  let form;

  beforeEach(() => {
    // Read the HTML file and load it into the DOM
    const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');
    document.documentElement.innerHTML = html.toString();

    emailInput = document.getElementById('email');
    form = document.querySelector('form');
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

    validEmails.forEach((email) => {
      emailInput.value = email;
      
      // If using HTML pattern attribute matching
      const pattern = emailInput.getAttribute('pattern');
      if (pattern) {
        const regex = new RegExp(`^${pattern}$`);
        expect(regex.test(email)).toBe(true);
      }

      // Check native browser validation state in JSDOM
      expect(emailInput.checkValidity()).toBe(true);
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

    invalidEmails.forEach((email) => {
      emailInput.value = email;

      // If using HTML pattern attribute matching
      const pattern = emailInput.getAttribute('pattern');
      if (pattern) {
        const regex = new RegExp(`^${pattern}$`);
        expect(regex.test(email)).toBe(false);
      }

      // Check native browser validation state in JSDOM
      expect(emailInput.checkValidity()).toBe(false);
    });
  });
});