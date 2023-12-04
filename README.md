# Managing Focus for a Collection of Buttons

## Problem Statement

**How can we manage the focus among a collection of buttons or interactive elements so that it behaves intuitively and accessibly for users?**

In many user interfaces, we often encounter scenarios where there is a collection of buttons or interactive elements grouped together. One common challenge is controlling the focus among these elements, ensuring that users can navigate through them using keyboard inputs (e.g., arrow keys) effectively.



## Solution

### Tabindex Values Explained

To address the problem of managing focus within a collection of buttons or interactive elements, we can use the `tabindex` attribute. The `tabindex` attribute determines the order in which elements receive focus when users navigate through them using the keyboard.

Here's how different `tabindex` values work:

- **`tabindex="0"`**: This value indicates that an element should receive keyboard focus in its natural order within the document's flow. In the context of our collection of buttons, setting the first button's `tabindex` to 0 means that it will be the initial element to receive focus when the user navigates to this group. Users can then continue navigating through the elements in the natural order.

- **`tabindex="-1"`**: This value indicates that an element should be focusable via JavaScript but should not be included in the natural tab order. By default, all elements have `tabindex="-1"` unless explicitly set otherwise. In our solution, we set all buttons in the collection to `tabindex="-1"` initially, except for the first button.

- **`tabindex="1"` (and other positive integers)**: This value sets the order in which elements receive focus when the user presses the "Tab" key. Elements with higher positive `tabindex` values will receive focus after elements with lower values. For example, if the first button has a `tabindex` of 0, and the user navigates to it using the "Tab" key, pressing "Tab" again will move focus to the element with `tabindex="1"`, and so on.

### Solution Workflow

To implement this solution for our collection of buttons:

1. **Initial State**: Set the `tabindex` attribute of all buttons in the collection to `tabindex="-1"` by default, making them unfocusable in the natural order.

2. **Initial Focus**: Set the `tabindex` of the first button to `tabindex="0"` to make it the initial focusable element when the user enters the group.

3. **Keyboard Navigation**: Implement event handlers to listen for keyboard inputs, such as arrow keys (e.g., left and right arrows), to control focus within the collection.

4. **Changing Focus**: When the user presses the right or left arrow key, modify the `tabindex` values of the buttons accordingly. For example, if the current focused button has `tabindex="0"`, change it to `tabindex="-1"` and set the next button in the desired direction to `tabindex="0"`.

By following this approach, we can effectively manage the focus among a collection of buttons, ensuring a smooth and accessible user experience. Users can navigate through the buttons using keyboard inputs, and the `tabindex` values help determine the order in which these buttons receive focus.

### Demonstration

<img width="617" alt="Screenshot 2023-12-04 at 12 21 14 PM" src="https://github.com/Maham-Anwaar/Implementing-Focus-Groups/assets/36509445/0054be0b-2ae1-45b4-a9fb-0398dbb8135d">





