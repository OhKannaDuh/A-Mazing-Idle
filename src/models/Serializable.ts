
class Serializable {
  public serializablePropertyList: string[] = [];

  constructor(serializablePropertyList: string[]) {
    this.serializablePropertyList = serializablePropertyList;
  }

  getSerializablePropertyList(): string[] {
    return this.serializablePropertyList;
  }

  serializeProperty(property: string): any {
    return this[property];
  }

  deserializeProperty(property: string, value: any): void {
    this[property] = value;
  }

  serialize(): object {
    const gamePropList = this.getSerializablePropertyList();

    let jsonObj = {};
    for (let prop of gamePropList) {
      jsonObj[prop] = this.serializeProperty(prop);
    }
    return jsonObj;
  }

  deserialize(jsonObj: object): void {
    for (let prop in jsonObj) {
      this.deserializeProperty(prop, jsonObj[prop]);
    }
  }
}

export default Serializable;
