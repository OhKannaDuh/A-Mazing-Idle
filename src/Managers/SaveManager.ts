import Game from "managers/Game";

const SAVE_GAME_INTERVAL = 20000;
const SAVE_GAME_LOCAL_STORE_KEY = 'a-mazing-idle';
const SAVE_TOAST_VISIBILITY_DURATION = 3000;

export class SaveManager {
  private game: Game;
  private saveInterval: any;

  constructor(game: Game) {
    this.game = game;
    this.saveInterval = null;
  }

  public enableSaveTimer(): void {
    this.disableSaveTimer();
    this.saveInterval = setInterval(() => {
      this.saveGameToLocalStorage(); 
    }, SAVE_GAME_INTERVAL);
  }

  public disableSaveTimer(): void {
    clearInterval(this.saveInterval);
    this.saveInterval = null;
  }

  public saveGameToLocalStorage(): void {
    this.game.ui.showSaveModalForDuration(SAVE_TOAST_VISIBILITY_DURATION);
    let saveJson = this.createSaveJsonObject();
    this.persistSaveToLocalStorage(saveJson);
  }

  public loadGameSaveFromLocalStorage(): void {
    let gameObj = this.getSaveJsonFromLocalStorage();
    if (!gameObj) return;
    this.importSaveJsonObject(gameObj);
    this.game.offline.processOfflinePoints();
  }

  public importGameSaveFromString(saveJsonString: string): boolean {
    // Disable save timer to prevent overrides
    this.game.save.disableSaveTimer();
    
    // Attempt to parse and save new string
    if (this.tryParseSaveJson(saveJsonString) == null) {
      this.game.save.enableSaveTimer();
      return false;
    }
    this.persistSaveToLocalStorage(saveJsonString);
    this.game.reloadFromLocalStorage();
    return true;
  }
  
  private createSaveJsonObject = (): string => {
    let gamePropList = this.game.getSerializablePropertyList();
  
    let gameJson = {};
    for (let gameProp of gamePropList) {
      gameJson[gameProp] = this.game[gameProp].serialize();
    }
    return JSON.stringify(gameJson);
  }
  
  private importSaveJsonObject = (jsonObj: any): void => {
    for (let gameProp in jsonObj) {
      this.game[gameProp].deserialize(jsonObj[gameProp]);
    }
  }

  private persistSaveToLocalStorage(jsonString: string): void {
    localStorage.setItem(SAVE_GAME_LOCAL_STORE_KEY, jsonString);
  }

  private getSaveJsonFromLocalStorage(): any {
    let json = localStorage.getItem(SAVE_GAME_LOCAL_STORE_KEY);
    if (json === null || json === "") {
      return null;
    }
    return this.tryParseSaveJson(json);
  }

  private tryParseSaveJson(json: string) {
    try {
      return JSON.parse(json);
    } catch (e) {
      console.error(`Failed to parse local game save.  Error: ${e.message}.  \n\nLocal Save Json: ${json}`);
      return null;
    }
  }

  public clearLocalStorage(): void {
    localStorage.clear();
  }

  public copySaveToClipboard(): void {
    const saveJson = this.getSaveJsonFromLocalStorage();
    if (!saveJson) return;

    const el = document.createElement('textarea');
    el.value = JSON.stringify(saveJson);
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
