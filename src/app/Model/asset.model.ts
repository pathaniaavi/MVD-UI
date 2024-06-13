// asset.model.ts
export class Asset {
  constructor(
    public id: string,
    public name: string,
    public contentType: string,
    public dataAddress: DataAddress
  ) {}
}

export class DataAddress {
  constructor(
    public proxyPath: boolean,
    public type: string,
    public name: string,
    public baseUrl: string
  ) {}
}
