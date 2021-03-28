
const MAP_TYPE_PREFIX = "~~";

export class Serializable {
  public serializablePropertyList: string[] = [];

  constructor(basicPropertyList: string[] = []) {
    this.serializablePropertyList = basicPropertyList;
  }

  private stringifyMap(value: Map<any, any>) {
    return JSON.stringify([...value.entries()]);
  }

  private destringifyMap(value: string): Map<any, any> {
    // Trim prefix
    const str = value.substr(MAP_TYPE_PREFIX.length);
    return JSON.parse(str).reduce((m, [key, val])=> m.set(key, val) , new Map());
  }

  public serializeProperty(property: string): any {
    if (typeof this[property] === 'object') {
      return MAP_TYPE_PREFIX + this.stringifyMap(this[property]);
    }
    return this[property];
  }

  public deserializeProperty(property: string, value: any): void {
    if (value && typeof value === 'string' && value.startsWith(MAP_TYPE_PREFIX)) {
      this[property] = this.destringifyMap(value);
    } else {
      this[property] = value;
    }
  }
  
  public getSerializablePropertyList(): string[] {
    return this.serializablePropertyList;
  }

  public serialize(): object {
    const gamePropList = this.getSerializablePropertyList();

    let jsonObj = {};
    for (let prop of gamePropList) {
      jsonObj[prop] = this.serializeProperty(prop);
    }

    return jsonObj;
  }

  public deserialize(jsonObj: object): void {
    for (let prop in jsonObj) {
      this.deserializeProperty(prop, jsonObj[prop]);
    }
  }
}
