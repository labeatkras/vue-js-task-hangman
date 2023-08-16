// Create a new Vue app
Vue.createApp({
  // Define the app's data
  data() {
    return {
      alphabet: "abcdefghijklmnopqrstuvwxyz".split(""), // An array of all the letters in the alphabet
      fails: 0, // The number of failed attempts
      // An array of words to search for
      searchWords: [
        "array",
        "computer",
        "object",
        "program",
        "grid",
        "javascript",
        "string",
        "number",
        "boolean",
        "function",
        "variable",
        "constant",
        "method",
        "property",
        "class",
        "constructor",
        "instance",
        "inheritance",
        "polymorphism",
        "encapsulation",
        "abstraction",
      ],
      newWord: [], // The word to search for, split into an array of characters
      selectedLetter: null, // The currently selected letter
      hiddenWord: "", // The word to display to the user, with underscores for unguessed letters
      toBeDisabled: {}, // An object to keep track of which letters should be disabled
      gameDurationOptions: [60, 120, 180], // The available game duration options
      gameDuration: 60, // The selected game duration
      time: 60, // The remaining time in seconds
    };
  },
  // Run this code when the app is mounted
  mounted() {
    this.startNewGame();
    setInterval(this.decrementTime, 1000); // Call the decrementTime method every second
  },
  // Define computed properties
  computed: {
    // Check if the user has won
    winner() {
      if (this.hiddenWord.length > 0) {
        return this.newWord.join("") === this.hiddenWord;
      }
    },
    // Get the current game status
    status() {
      if (this.fails === 10) {
        return "LOST";
      } else if (this.winner) {
        return "WON";
      } else {
        return "PLAYING";
      }
    },
  },
  // Define methods
  methods: {
    // Start a new game
    startNewGame() {
      this.fails = 0; // Reset the number of failed attempts
      this.toBeDisabled = {}; // Reset the disabled letters
      this.newWord = this.searchWords[ // Choose a new word to search for
        Math.floor(Math.random() * this.searchWords.length)
      ]

        .toLowerCase()
        .split(""); // Split the word into an array of characters
      this.hiddenWord = new Array(this.newWord.length).fill("_").join(""); // Replace the word with underscores
      this.time = this.gameDuration; // Set the time based on the selected game duration
    },

    // Handle a letter being picked
    pickingLetter(char) {
      this.selectedLetter = char; // Set the selected letter

      this.toBeDisabled[char] = true; // Disable the selected letter
      // Search for the letter in the word and replace it if found
      let found = false;
      let hiddenWordArray = this.hiddenWord.split("");
      for (let i = 0; i < this.newWord.length; i++) {
        if (this.newWord[i] === this.selectedLetter) {
          hiddenWordArray[i] = this.selectedLetter;
          found = true;
        }
      }
      this.hiddenWord = hiddenWordArray.join("");

      if (found === false) {
        this.fails++; // Increment the number of failed attempts
        this.disableAllLetters(); // Disable all letters if the user has failed 10 times
      }
    },
    decrementTime() {
      if (this.time > 0) {
        this.time--;
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;
        this.remainingTime = `${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`;
      } else {
        clearInterval(); // Stop the timer when the time runs out
        this.disableAllLetters(); // Disable all letters when the time runs out
      }
    },

    // Disable all letters if the user has failed 10 times
    disableAllLetters() {
      if (this.fails === 10) {
        this.alphabet.forEach((char) => {
          this.toBeDisabled[char] = true;
        });
      }
    },
  },
}).mount("#app");
