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
    settings: Array<object>;
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
  token: string,
  licenseAgree: boolean,
  date: string,
  time: string,
  comment?: string,
  promo?: string;
  useDiscount: boolean;
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
  discount_price: number
}