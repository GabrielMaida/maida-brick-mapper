import i18next from "i18next";

const resources = {
  en: {
    translation: {
      app: {
        title: "Maida Brick Mapper",
        settings: "Settings",
        platform_select: "Select Platform"
      },
      settings: {
        language: "Language:"
      },
      games: {
        placeholder: "Game catalog will be loaded here..."
      }
    }
  },
  pt: {
    translation: {
      app: {
        title: "Maida Brick Mapper",
        settings: "Configurações",
        platform_select: "Selecionar Plataforma"
      },
      settings: {
        language: "Idioma:"
      },
      games: {
        placeholder: "O catálogo de jogos será carregado aqui..."
      }
    }
  }
};

export async function initI18n() {
  await i18next.init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });
}

export function updateTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      el.textContent = i18next.t(key);
    }
  });
}