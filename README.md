
# APY Alert Library
# Author : Yordi Alcántara Paico
# Copyright 2024

A lightweight and customizable JavaScript alert library that supports both modal and floating notifications.

## Installation

Include the CSS and JavaScript files in your HTML:

```html
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>
 ```


## Basic Usage
```javascript  Simple success alert

## Basic modal notification 

apy({
    title: 'Success!',
    text: 'Operation completed successfully',
    type: 'success'
});

// Confirmation dialog
apy({
    title: 'Are you sure?',
    text: 'This action cannot be undone',
    type: 'confirmation',
    onConfirm: () => {
        // Do something after confirmation
    }
});


## Alert Types
- confirmation - Confirmation dialog with OK/Cancel buttons
- question - Question dialog with OK/Cancel buttons
- success - Success notification
- danger - Error/Danger notification
- warning - Warning notification
## Configuration Options

const defaults = {
    title: 'Notification',        // Alert title
    text: '',                     // Alert message
    type: 'confirmation',         // Alert type
    float: false,                 // Use floating notification instead of modal
    color: false,                 // Enable colored alerts
    position: 'top-right',        // Position for floating alerts
    time: 5000,                   // Auto-close time for floating alerts (ms)
    showCancelButton: true,       // Show cancel button
    cancelButtonText: 'Cancel',   // Cancel button text
    cancelButtonColor: '#6c757d0',// Cancel button background color
    cancelButtonTextColor: '#000',// Cancel button text color
    confirmButtonText: 'OK',      // Confirm button text
    confirmButtonColor: '#eeeeee',// Confirm button background color
    confirmButtonTextColor: '#000',// Confirm button text color
    onConfirm: () => {}          // Confirmation callback function
}


## Floating Notifications

// Basic floating notification
apy({
    title: 'New Message',
    text: 'You have a new message',
    type: 'success',
    float: true
});

// Positioned floating notification with custom duration
apy({
    title: 'Warning',
    text: 'Your session will expire soon',
    type: 'warning',
    float: true,
    position: 'top-right',
    time: 10000, // 10 seconds
    color: true  // Enable colored alert
});
 ```

## Position Options for Floating Alerts
- top-right (default)
- top-left
- top-center
- bottom-right
- bottom-left
## Advanced Usage
### Confirmation with Loading State
```javascript
apy({
    title: 'Delete Record',
    text: 'Are you sure you want to delete this record?',
    type: 'confirmation',
    onConfirm: () => {
        // Loader will show automatically
        setTimeout(() => {
            apy({
                title: 'Deleted',
                text: 'Record has been deleted',
                type: 'success',
                float: true
            });
        }, 2000);
    }
});
 ```

### Manually Closing Alerts
```javascript
// Close all alerts
apyclose();

### Chaining Alerts 
```javascript ```
apy({
    title: 'Confirm Action',
    text: 'Do you want to proceed?',
    type: 'confirmation',
    onConfirm: () => {
        setTimeout(() => {
            apyclose(); // Close confirmation
            apy({
                title: 'Success',
                text: 'Action completed',
                type: 'success',
                float: true
            });
        }, 1000);
    }
});


## Styling
The library includes default styles but can be customized through CSS variables:

```css
:root {
    --shadow-1: rgba(221, 221, 221, 0.1) 0px 0px 16px;
    --z-index: 9999;
    --brop: #1c1b1b87;
    --alert: #fff;
    --cl-btn: #000;
}
 ```

## Browser Support
Works in all modern browsers that support ES6+ features.

## License
MIT License
