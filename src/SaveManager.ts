import Game from "./Game";

const SAVE_GAME_INTERVAL = 10000;
const SAVE_GAME_LOCAL_STORE_KEY = 'a-mazing-idle';

class SaveManager {
  private game: Game;
  private saveInterval: any;

  constructor(game: Game) {
    this.game = game;
  }

  startSaveTimer(): void {
    if (this.saveInterval) {
      clearInterval(this.saveInterval);
    }
    this.saveInterval = setInterval(() => {
      this.saveGameToLocalStorage(); 
    }, SAVE_GAME_INTERVAL);
  }

  saveGameToLocalStorage() {
    const saveJson = this.createSaveJsonObject();
    this.persistSaveToLocalStorage(saveJson);
  }

  loadGameSaveFromLocalStorage() {
    const gameObj = this.getSaveJsonFromLocalStorage();
    this.importSaveJsonObject(gameObj);
  }
  
  createSaveJsonObject = (): object => {
    const gamePropList = this.game.getSerializablePropertyList();
  
    const gameJson = {};
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
    const jsonString = JSON.stringify(jsonObj);
    localStorage.setItem(SAVE_GAME_LOCAL_STORE_KEY, jsonString);
  }

  getSaveJsonFromLocalStorage() {
    const json = localStorage.getItem(SAVE_GAME_LOCAL_STORE_KEY);
    if (json === null || json === "") {
      return null;
    }
    return JSON.parse(json);
  }

  clearLocalStorage() {
    localStorage.removeItem(SAVE_GAME_LOCAL_STORE_KEY);
  }
}

export default SaveManager;
