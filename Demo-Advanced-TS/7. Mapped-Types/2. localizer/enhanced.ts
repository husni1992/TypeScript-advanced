interface LocalizationKeys {
  welcomeMessage: string;
  farewellMessage: string;
  loginPrompt: string;
}

// Mapped type with template literals for localization
type LocalizedText<Lang extends string> = {
  [Key in keyof LocalizationKeys as `${Key}_${Lang}`]: string;
};

const englishText: LocalizedText<"en"> = {
  welcomeMessage_en: "Welcome!",
  farewellMessage_en: "Goodbye!",
  loginPrompt_en: "Please log in.",
};

const spanishText: LocalizedText<"es"> = {
  welcomeMessage_es: "¡Bienvenido!",
  farewellMessage_es: "¡Adiós!",
  loginPrompt_es: "Por favor, inicie sesión.",
};

// Usage
console.log(englishText.welcomeMessage_en); // "Welcome!"
console.log(spanishText.loginPrompt_es); // "Por favor, inicie sesión."

export {};
