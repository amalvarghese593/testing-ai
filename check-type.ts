enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

// Static access (hardcoded) — always works
let c = Color.Red; // "RED"

// Dynamic access (variable key) — needs runtime object
const key = "Green";
let c2 = Color[key]; // "GREEN"
