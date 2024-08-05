export default function formatWallet(word) {
    if (word.length <= 11) {
        return word;
    } else {
        let firstFour = word.substring(0, 4);
        let lastFour = word.slice(-4);
        let middleDots = "...";

        return `${firstFour}${middleDots}${lastFour}`;
    }
}