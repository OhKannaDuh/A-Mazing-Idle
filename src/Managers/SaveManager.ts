import Game from "../Game";

const SAVE_GAME_INTERVAL = 10000;
const SAVE_GAME_LOCAL_STORE_KEY = 'a-mazing-idle';

class SaveManager {
  private game: Game;
  private saveInterval: any;

  constructor(game: Game) {
    this.game = game;
    this.saveInterval = null;
  }

  startSaveTimer(): void {
    this.disableSaveTimer();
    this.saveInterval = setInterval(() => {
      this.saveGameToLocalStorage(); 
    }, SAVE_GAME_INTERVAL);
  }

  disableSaveTimer(): void {
    clearInterval(this.saveInterval);
    this.saveInterval = null;
  }

  saveGameToLocalStorage() {
    let saveJson = this.createSaveJsonObject();
    console.log('saving!');
    console.log(saveJson);
    this.persistSaveToLocalStorage(saveJson);
  }

  loadGameSaveFromLocalStorage() {
    let gameObj = this.getSaveJsonFromLocalStorage();
    if (!gameObj) return;
    this.importSaveJsonObject(gameObj);
  }
  
  createSaveJsonObject = (): object => {
    let gamePropList = this.game.getSerializablePropertyList();
  
    let gameJson = {};
    for (let gameProp of gamePropList) {
      gameJson[gameProp] = this.game[gameProp].serialize();
    }
    return gameJson;
  }
  
  importSaveJsonObject = (jsonObj: any): void => {
    for (let gameProp in jsonObj) {
      this.game[gameProp].deserialize(jsonObj[gameProp]);
    }
  }

  persistSaveToLocalStorage(jsonObj) {
    let jsonString = JSON.stringify(jsonObj);
    localStorage.setItem(SAVE_GAME_LOCAL_STORE_KEY, jsonString);
  }

  getSaveJsonFromLocalStorage() {
    let json = localStorage.getItem(SAVE_GAME_LOCAL_STORE_KEY);
    if (json === null || json === "") {
      return null;
    }
    try {
      return JSON.parse(json);
    } catch (e) {
      console.log('Failed to parse local game save.  Error: ' + e.message + '.  \n\nLocal Save Json: json');
      return null;
    }
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}

export default SaveManager;
