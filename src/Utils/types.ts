export type IChildren  = 
    | React.ReactElement
    | Array<React.ReactElement>
    | React.ReactFragment
    | Array<React.ReactFragment>
    | string
    | boolean
    | null
    | undefined;

export interface IUser {
    avatar: string;
    category_loyalty_id: number|null;
    created_at: string;
    email: string;
    email_verified_at: string|null;
    id: number;
    name: string;
    phone: string;
    role_id: number;
    settings: any;
    temp_password: string|null;
    updated_at: string;
}

export interface ICity {
    id: number,
    name: string,
    city: string,
    owner_id: number,
    created_at: string,
    updated_at: string,
    code: string,
    pivot: {
      user_id: number,
      instance_id: number
    }
}

export interface IRoom {
  id: number, 
  title: string,
  guest_max: number,
  pivot?: {
    game_id: number,
    room_id: number,
  }
}

export interface IGame {
  id: number,
  title: string,
  slug: string,
  time_duration: number,
  price: number,
  game_type_id: number,
  is_active: number,
  deleted_at: string,
  created_at: string,
  updated_at: string
  logo: string,
  guest_min: number,
  guest_max: number,
  description: string,
  age_limit: number,
  images: any,
  video: any,
  descriptio: any,
  genre: string,
  pivot: {
    room_id: number,
    game_id: number
  }
  rooms?: Array<IRoom>
}

export interface IGetGamesResponse {
  id: number, 
  title: string,
  guest_max: number,
  games: Array<IGame>,
}

export interface IBookingCredentials {
  name: string,
  phone: string,
  token?: string,
  licenseAgree: boolean,
  date?: string,
  time?: string,
  comment?: string,
  promo?: string;
  useDiscount?: boolean;
}

export interface IGetWorktimeResponse {
  start_at: string, 
  end_at: string, 
  interval: string,
  glasses: string
}

export interface ISummaryResponse {
  price: number,
  bonus_discount?: number,
  promo_discount?: number,
  total: number,
}

export interface IValidatePromo {
  promo_type: string,
  promo_info: {
    type: string,
    amount: number,
    amount_from: number,
    game: boolean,
    game_type: boolean
  },
  price: number,
  discount: number,
  discount_price: number,
  error?: number;
  error_text?: string;
}

export interface ILoginForm {
  phone?: string;
  email?: string;
  password: string;
}

export interface ILoginResponse {
  error: number|string;
  error_text: string;
  token: string;
  user: IUser;
}

export interface IValidatePromoRequestData {
    token: string,
    promo_code: string,
    price: number,
    game: number
}

export interface IGetSummaryRequestData {
    game_id: number,
    guest_count: number,
    user_id?: number,
    use_bonus?: boolean,
    promocode?: string
}

export interface IBookingFields {
  certificates?: Array<string>,
  date: string,
  phone: string,
  token?: string,
  promo_code: string,
  comment?: string,
  bonus?: number,
  name: string,
  booking: {
    time: string,
    guest_quantity: number,
    room_id: number,
    game_id: number
  }
}

export interface IRegisterForm {
  phone: string,
  password: string,
  'password-repeat': string,
  email: string,
}

export interface IRegisterResponse {
  error: number,
  error_text: string,
  token: string,
};

export interface ILoginByCodeResponse {
  error: number,
  error_text: string,
  token: string;
}

export interface ITokenDTO {
  token: string;
}

export interface IGetBonusesInfoResponse {
  quantity_all: number,
  quantity_real: number,
  quantity_expired: number,
  next_expired_date: string,
  loyalty_category: {
    amount_discount_max: number, 
    amount_min: number,
    cashback: number,
    entry_condition: number,
    id: number,
    title: string
  }
}

export interface IEditProfileForm {
  name: string,
  phone: string,
  email: string,
}

export interface IChangePassForm {
  token: string,
  password: string,
  'password-repeat': string,
  newPassword: string,
}

export interface IOrderHistoryItem {
  id: number,
  user_id: number,
  booking_date: string,
  location_id: string,
  location?: ICity,
  games_id: string,
  games?: Array<IGame>
  price: number,
  guest_quantity: number,
  external_id: number,
  is_manual: number,
  created_at: string,
  updated_at: string
}

export interface IGetUserCityResponse {
  city: string;
}

export interface IEditProfileReq {
  token: string,
  name?: string,
  email?: string,
  phone?: string,
}
