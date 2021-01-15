export interface userListResponse{
    message?:string,
    userList?: any[],
    totalCount?: number
}

export interface userList{
    _id?:string;
    name?: string;
    avatar?: string;
    email?: string;
    token?: string;
    last_login?: number;
    is_active?: boolean;
    account_verified?: boolean;
    first_name?: string;
    last_name?: string;
    contact_2?: string;
    contact?: string;
    current_address?: string;
    permanent_address?: string;
    gender?: string;
    dob?: string;
    family_details?: string;
    previous_occupation?: string;
    bank_details?: string;
    vehicle?: any;
    profile_pic?: boolean;
    role_id?: {
        _id?: string;
        type?: string;
    }   
}

export interface userEntity{
    _id?:string
    first_name?: string,
    last_name?: string,
    contact?: string,
    contact_2?: string,
    role_id?: string,
    gender?: string,
    email?: string,
    current_address?: string,
    sameAddress?:boolean,
    permanent_address?: string,
    dob?: string,
    uid?: string,
    family_details?: string,
    previous_occupation?: string,
    bank_details?: string,
    firm_name?: string,
    firm_gst?: string,
    supplier_of_what?: string,
    reference?: string,
    country_id?: string,
    state_id?: string,
    city_id?: string,
    area_id?: string,
    vehicle_id?: string,
    location?: string,
    parent_id?: string,
    is_active?: boolean
}

export interface userDetailsResponse{
    message?:string,
    data?:userDetails
}

export interface userDetails{
    _id?:string
    first_name?: string,
    last_name?: string,
    contact?: string,
    contact_2?: string,
    role_id?: {
        _id?:string,
        type?:string
    },
    gender?: string,
    email?: string,
    current_address?: string,
    sameAddress?:boolean,
    permanent_address?: string,
    dob?: string,
    uid?: string,
    family_details?: string,
    previous_occupation?: string,
    bank_details?: string,
    firm_name?: string,
    firm_gst?: string,
    supplier_of_what?: string,
    reference?: string,
    country_id?: string,
    state_id?: string,
    city_id?: string,
    area_id?: string,
    vehicle_id?: string,
    is_active?: boolean,
    location?:{
        type?:string,
        coordinates:number[]}
}