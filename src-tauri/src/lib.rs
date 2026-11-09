#[tauri::command]
fn launch_game_script(game_id: &str, platform: &str) -> Result<String, String> {
    println!("=== RUST BACKEND LOG ===");
    println!("Preparing to launch game: {} via {}", game_id, platform);
    
    // Future logic: Read JSON, locate executable, spawn AutoHotkey process
    
    Ok(format!("Script launched for {}", game_id))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![launch_game_script])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}