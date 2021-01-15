import { NumberSymbol } from "@angular/common";

export interface AreaList{
    _id?:string,
    name?:string,
    city_id?:string,
    is_active?:boolean,
    pincode?:number[]
}

export interface AreaListResponse{
    data?:AreaList[],
    totalcount?:number
}

export interface CityList{
    _id?:string,
    name?:string,
    is_active?:boolean,
    state_id?:string,
    created_at?:string,
}

export interface CityListResponse{
    data?:CityList[],
    totalcount?:number
}

export interface StateList{
    _id?:string,
    name?:string,
    is_active?:boolean,
    country_id?:string
}

export interface StateListResponse{
    data?:StateList[],
    totalcount?:number
}

export interface CountryList{
    _id?:string,
    name?:string,
    is_active?:boolean,
    created_at?:string,
    country_code?:number
}

export interface CountryListResponse{
    data?:CountryList[],
    totalcount?:number
}