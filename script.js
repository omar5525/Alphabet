// Function to use the browser's SpeechSynthesis API
function speak(letter) {
    const msg = new SpeechSynthesisUtterance(letter);
    msg.lang = 'en-US'; // Set the language to English (US)
    window.speechSynthesis.speak(msg);
}
async function speak(letter) {
    const apiUrl = 'https://texttospeech.googleapis.com/v1/text:synthesize?key=YOUR_API_KEY';
    
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input: { text: letter },
            voice: { languageCode: 'en-US', name: 'en-US-Wavenet-D' }, // Set the language and voice type
            audioConfig: { audioEncoding: 'MP3' }
        })
    });
    
    const data = await response.json();
    const audioBase64 = data.audioContent;
    
    const audio = new Audio('data:audio/mp3;base64,' + audioBase64);
    audio.play();
}
