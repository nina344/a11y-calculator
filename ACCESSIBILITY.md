# VPAT – Accessible Voice Calculator

**WCAG 2.1 Level A & AA Conformance**

---

## Product Description

Accessible Voice Calculator is a single-page web-based calculator application designed with a strong focus on accessibility.  
The application supports full keyboard operation, screen reader compatibility, audio feedback via speech synthesis, and optional voice input using browser-supported speech recognition APIs.

This document describes the accessibility conformance of the application evaluated against **WCAG 2.1 Level A and Level AA** success criteria.

---

## Scope of Evaluation

- **Platform:** Web (desktop browsers)
- **Technologies:** HTML, CSS, JavaScript
- **Assistive technologies considered:**
  - Keyboard-only navigation
  - Screen readers
  - Speech synthesis (text-to-speech)
  - Speech recognition (voice commands)

---

## Summary Table – WCAG 2.1 Conformance

| Criteria | Conformance Level | Remarks |
|--------|------------------|--------|
| 1.1.1 Non-text Content | Supports | All interactive controls use native HTML buttons with descriptive `aria-label` attributes, including icon-only buttons such as the microphone control. |
| 1.3.1 Info and Relationships | Supports | Semantic HTML and native form controls are used to ensure programmatic determinability of structure and relationships. |
| 2.1.1 Keyboard | Supports | Full functionality is operable using keyboard input, including activation via Enter or Space. Arrow key navigation is implemented within the button grid using a roving tabindex pattern, with minor limitations in standard Tab navigation behavior. |
| 2.1.2 No Keyboard Trap | Supports | Keyboard focus can freely move across all interactive elements without trapping. |
| 2.4.3 Focus Order | Supports | Focus order generally follows a logical sequence aligned with the visual layout of calculator buttons. A roving tabindex strategy is used for arrow key navigation within the grid, which may introduce minor inconsistencies in standard Tab navigation. |
| 2.4.7 Focus Visible | Supports | Keyboard focus is visually visible at all times using browser default focus indicators. |
| 3.3.1 Error Identification | Supports | Calculation errors are clearly communicated both visually and through spoken feedback. |
| 4.1.2 Name, Role, Value | Supports | All interactive elements expose accessible names, roles, and values using native HTML elements and ARIA attributes. |
| 4.1.3 Status Messages | Supports | Dynamic calculation results are announced to assistive technologies using `aria-live="polite"`. |

---

## Additional Accessibility Notes

- Speech synthesis provides audio feedback for button focus, activation, and calculation results.
- Speech recognition enables voice-based input for mathematical expressions.
- Accessibility testing was performed using a combination of manual and automated methods. Manual testing included keyboard-only navigation and assistive technologies such as screen readers. Automated testing was conducted using Axe-core integrated with Playwright, with no accessibility violations detected.

---

## Conformance Disclaimer

This assessment is based on manual evaluation of the application functionality and user interface.

Some advanced keyboard navigation patterns (such as roving tabindex within the button grid) may introduce minor deviations from standard Tab navigation behavior.

No automated certification or third-party audit was performed.

---

## Contact / Reference

Project repository and live version are available for review and demonstration purposes.
