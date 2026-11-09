// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
use tauri::{Manager, /*path::BaseDirectory */};

#[tauri::command]
fn launch_game_script(app_handle: tauri::AppHandle, executable_name: &str) -> Result<String, String> {
    // 1. Locate the directory where resources (binaries) were installed using Tauri v2 standards
    let resource_path = app_handle.path().resource_dir().map_err(|e| e.to_string())?;
    
    // 2. Build the exact path for the AHK executable and the script
    let ahk_exe = resource_path.join("bin").join("AutoHotkey64.exe");
    let script_path = resource_path.join("bin").join("AutoHotkey64.ahk");

    // 3. Execute AHK, passing the script and the game name as arguments
    match Command::new(&ahk_exe)
        .arg(&script_path)
        .arg(executable_name)
        .spawn() // Run in the background without blocking the UI
    {
        Ok(_) => Ok(format!("Script launched for game: {}", executable_name)),
        Err(e) => Err(format!("Failed to launch script: {}", e)),
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![launch_game_script])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}