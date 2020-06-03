export interface RollProfile {
  name:string,
  text:string,
  sides:number,
  quantity:number,
  modifier:number,
  times:number
}

export interface RollResult {
  rolls:number[],
  total:number
}

export interface ResultSet {
  request:RollProfile,
  results: RollResult[]
}

