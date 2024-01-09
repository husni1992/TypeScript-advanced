enum Language {
  ENGLISH = "en",
  SPANISH = "es",
}

interface LocalizationKeys {
  welcomeMessage: string;
  farewellMessage: string;
  loginPrompt: string;
}

type LocalizedText<Lang extends Language> = {
  [Key in keyof LocalizationKeys as `${Key}_${Lang}`]: LocalizationKeys[Key];
};

// strong type support to accept only keys like welcomeMessage_{Lang}
const englishText: LocalizedText<Language.SPANISH> = {
  farewellMessage_en: ""
};

const spanishText = {
  welcomeMessage_es: "¡Bienvenido!",
};

export {};
