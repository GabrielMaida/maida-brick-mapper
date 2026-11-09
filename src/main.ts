import { initI18n, updateTranslations } from "./i18n";
import i18next from "i18next";
// import { invoke } from "@tauri-apps/api/core"; // Uncomment when integrating Rust

interface GameProfile {
	id: string;
	title: string;
	executable: string;
	icon: string;
	mouse_profile: {
		threshold: number;
		return_speed: number;
	};
	keys: Record<string, string>;
}

interface GamesDefault {
	games: GameProfile[];
}

let isSettingsOpen = false;

async function loadGamesDefault() {
	try {
		const response = await fetch("/games.json");
		if (!response.ok) throw new Error("Failed to load file games.json");

		const data: GamesDefault = await response.json();
		renderGameCatalog(data.games);
	} catch (error) {
		console.error("Error loading games configuration:", error);
	}
}

function renderGameCatalog(games: GameProfile[]) {
	const gameListContainer = document.getElementById("game-list");
	if (!gameListContainer) return;

	// Clear loading placeholder
	gameListContainer.innerHTML = "";

	games.forEach((game) => {
		const gameItem = document.createElement("div");
		gameItem.className = "game-item flex flex-col items-center min-w-[110px] max-w-[130px] cursor-pointer p-2.5 rounded-lg transition-all duration-200";

		// Map to the .ico files listed in the JSON
		const gameIcon = document.createElement("img");
		gameIcon.src = `/assets/icons/${game.icon}`;
		gameIcon.alt = game.title;
		gameIcon.className = "game-icon w-16 h-16 object-contain mb-2 rounded-xl shadow-md";

		// Fallback if specific icon is missing
		gameIcon.onerror = () => {
			gameIcon.src = "/assets/icons/default_lego.ico"; // Fallback
		};

		const gameTitle = document.createElement("span");
		gameTitle.className = "game-title text-sm text-center break-words";
		gameTitle.textContent = game.title;

		gameItem.appendChild(gameIcon);
		gameItem.appendChild(gameTitle);

		// Setup click handler to launch game via Tauri backend
		gameItem.addEventListener("click", () => {
            // Block launch if settings are open
            if (isSettingsOpen) {
                console.log(`Launch blocked for ${game.title}: Settings menu is currently open.`);
                return;
            }

			console.log(`Clicked to launch: ${game.title} (${game.executable})`);
			// invoke('launch_game_script', { executableName: game.executable })
			//   .then((response) => console.log(response))
			//   .catch((e) => console.error(e));
		});

		gameListContainer.appendChild(gameItem);
	});
}

// View Management
function setupViewToggles() {
    const mainView = document.getElementById("main-view");
    const settingsView = document.getElementById("settings-view");
    const btnOpenSettings = document.getElementById("btn-open-settings");
    const btnCloseSettings = document.getElementById("btn-close-settings");

    if (btnOpenSettings && settingsView && mainView) {
        btnOpenSettings.addEventListener("click", () => {
            isSettingsOpen = true;
            settingsView.classList.remove("hidden");
            mainView.classList.add("hidden");
            console.log("Settings opened. Game launches are now blocked.");
        });
    }

    if (btnCloseSettings && settingsView && mainView) {
        btnCloseSettings.addEventListener("click", () => {
            isSettingsOpen = false;
            settingsView.classList.add("hidden");
            mainView.classList.remove("hidden");
            console.log("Settings closed. Game launches are re-enabled.");
        });
    }
}

document.addEventListener("DOMContentLoaded", async () => {
	await initI18n();
	updateTranslations();

	await loadGamesDefault();
    setupViewToggles();

	const langSelector = document.getElementById(
		"language-selector",
	) as HTMLSelectElement;
	if (langSelector) {
		langSelector.addEventListener("change", async (event) => {
			const target = event.target as HTMLSelectElement;
			await i18next.changeLanguage(target.value);
			updateTranslations();
		});
	}
});