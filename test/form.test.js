/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('HTML Feedback Form Validation', () => {
  let container;

  beforeEach(() => {
    // Read the HTML file and load it into the DOM
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html.toString();
  });

  test('Form elements should exist in the DOM', () => {
    const fullNameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const submitBtn = document.querySelector('input[type="submit"]');

    expect(fullNameInput).not.toBeNull();
    expect(emailInput).not.toBeNull();
    expect(submitBtn).not.toBeNull();
  });

  test('Full name field should be required', () => {
    const fullNameInput = document.getElementById('fullname');
    expect(fullNameInput.hasAttribute('required')).toBe(true);
  });

  test('Email field should have correct type and required attribute', () => {
    const emailInput = document.getElementById('email');
    expect(emailInput.getAttribute('type')).toBe('email');
    expect(emailInput.hasAttribute('required')).toBe(true);
  });

  test('Radio buttons for experience rating should share the same name attribute', () => {
    const rate1 = document.getElementById('rate1');
    const rate2 = document.getElementById('rate2');
    
    expect(rate1.getAttribute('name')).toBe('rating');
    expect(rate2.getAttribute('name')).toBe('rating');
  });
});