// Function to convert seconds to HH:MM:SS.mmm format
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const milliseconds = Math.floor((seconds % 1) * 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

// Function to convert JSON to VTT format
function convertToVTT(jsonData) {
    let vttContent = 'WEBVTT\n\n';

    jsonData.forEach((item, index) => {
        const [startTime, endTime] = item.timestamp;
        const formattedStart = formatTime(startTime);
        const formattedEnd = formatTime(endTime);

        vttContent += `${index + 1}\n`;
        vttContent += `${formattedStart} --> ${formattedEnd}\n`;
        vttContent += `${item.text}\n\n`;
    });

    return vttContent;
}

// Function to download the VTT file
function downloadVTT(vttContent, originalFileName) {
    const blob = new Blob([vttContent], { type: 'text/vtt' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = originalFileName.replace('.json', '.vtt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to show status message
function showStatus(message, isError = false) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = isError ? 'error' : 'success';
}

// Set up file input handler
document.getElementById('fileInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const text = await file.text();
        const jsonData = JSON.parse(text);

        // Validate JSON structure
        if (!Array.isArray(jsonData)) {
            throw new Error('Invalid JSON format: Expected an array');
        }

        if (!jsonData.every(item =>
            item.timestamp &&
            Array.isArray(item.timestamp) &&
            item.timestamp.length === 2 &&
            typeof item.text === 'string'
        )) {
            throw new Error('Invalid JSON format: Each item must have timestamp array and text string');
        }

        const vttContent = convertToVTT(jsonData);
        downloadVTT(vttContent, file.name);
        showStatus('Conversion successful! Your file is downloading.');
    } catch (error) {
        showStatus(`Error: ${error.message}`, true);
    }
}); 