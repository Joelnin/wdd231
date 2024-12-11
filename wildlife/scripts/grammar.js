export function capitalize(phrase) {
    let words = phrase.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }

    return words.join(" ");
}

export function decodeSpecialChars(encodedString) {

    try {
        return decodeURIComponent(encodedString);
    } catch (error) {
        console.error("Error decoding string:", error);
        return encodedString; // Return original string if there's an error
    }
}