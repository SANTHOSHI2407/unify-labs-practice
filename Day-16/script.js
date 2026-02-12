  <script>
    /* ===============================
       FUNCTION 1: TITLE CASE
    ================================ */
    function titleCase(str) {
      return str
        .trim()
        .toLowerCase()
        .split(" ")
        .filter(word => word !== "")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");
    }

    function convertTitleCase() {
      const input = document.getElementById("textInput").value;
      document.getElementById("result").innerText =
        "Title Case: " + titleCase(input);
    }

    /* ===============================
       FUNCTION 2: VOWEL COUNT
    ================================ */
    function countVowelsFunc(str) {
      const vowels = "aeiouAEIOU";
      let count = 0;

      for (let char of str) {
        if (vowels.includes(char)) {
          count++;
        }
      }
      return count;
    }

    function countVowels() {
      const input = document.getElementById("textInput").value;
      document.getElementById("result").innerText =
        "Vowel Count: " + countVowelsFunc(input);
    }

    /* ===============================
       FUNCTION 3: SECRET MESSAGE
    ================================ */
    function secretMessage(str) {
      const bannedWords = ["secret", "password", "classified"];

      let words = str.split(" ");

      return words
        .map(word =>
          bannedWords.includes(word.toLowerCase()) ? "***" : word
        )
        .join(" ");
    }

    function generateSecret() {
      const input = document.getElementById("textInput").value;
      document.getElementById("result").innerText =
        "Secret Message: " + secretMessage(input);
    }
  </script>