function formatDate(date) {
    const dateString = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    return `${dateString} at ${timeString}`;
}
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
function convertBufferToBase64(buffer, format) {
    let base64string = '';
    // Use node-based buffer if available
    // fall back on browser if not
    if (typeof Buffer !== 'undefined') {
        base64string = Buffer.from(new Uint8Array(buffer)).toString('base64');
    }
    else {
        base64string = arrayBufferToBase64(buffer);
    }
    return `data:image/${format};base64,${base64string}`;
}

export { convertBufferToBase64, formatDate };
