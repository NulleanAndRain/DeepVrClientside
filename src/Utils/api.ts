import axios, { AxiosResponse } from "axios"
import { IBookingFields, IChangePassForm, ICity, IEditProfileReq, IGame, IGetBonusesInfoResponse, IGetGamesResponse, IGetSummaryRequestData, IGetUserCityResponse, IGetWorktimeResponse, ILoginByCodeResponse, ILoginForm, ILoginResponse, IOrderHistoryItem, IRegisterForm, IRegisterResponse, IRoom, ISummaryResponse, ITokenDTO, IUser, IValidatePromo, IValidatePromoRequestData } from "./types"

export interface ErrorResponse {
    error: number,
    error_text: string
}

let instanceUrl : string|undefined = '';
let instanceStorageUrl : string|undefined = '';
const globalUrl = process.env.REACT_APP_API_GLOBAL_URL;

export const Api = {
    // utils
    get globalUrl() { 
        return globalUrl;
    },
    get instanceUrl() {
        return instanceUrl;
    },
    async getAllCities() {
        return axios.get<Array<ICity>>(
            `${globalUrl}/v2/instances/list`
        );
    },

    setInstanceUrl(prefix : string | undefined) {
        const url = `https://${prefix}.${Api.globalUrl?.replace("https://", "")}`
        instanceUrl = url;
        if (url) instanceStorageUrl = url.replace('/api', '/storage');
        else instanceStorageUrl = undefined;
    },
    
    getImageUrl(url: string) {
        return url? `${instanceStorageUrl}/${url}` : null;
    },

    checkStatus(response: AxiosResponse<any>) {
        return response.status >= 200 && response.status < 300;
    },

    async getUserByToken(data: ITokenDTO) {
        return axios.post<IUser>(
            `${globalUrl}/v2/auth/loginByRememberedToken`,
            data
        );
    },

    async getGameInfo(instancePrefix: string, id: number) {
        const url = globalUrl?.replace('https://', '');
        return axios.get<IGame>(
            `https://${instancePrefix}${instancePrefix? '.' : ''}${url}/game/${id}`
        );
    },

    // home
    async getAllGames() {
        return axios.get<Array<IGame>>(
            `${instanceUrl}/games`
        );
    },
    
    // booking
    async getAllRooms() {
        return axios.get<Array<IRoom>>(
            `${instanceUrl}/rooms`
        );
    },

    async getGamesOfRoom(roomId: number) {
        return axios.get<IGetGamesResponse>(
            `${instanceUrl}/room/${roomId}`
        );
    },

    async getTimesOfDay(date: Date) {
        return axios.get<IGetWorktimeResponse>(
            `${instanceUrl}/v2/worktime?date=${date.toISOString().substring(0, 10)}`
        );
    },
    
    async getSummary(data : IGetSummaryRequestData){
        return axios.post<ISummaryResponse>(
            `${instanceUrl}/v2/orders/precalculate`,
            data
        );
    },

    async validatePromo(data: IValidatePromoRequestData) {
        return axios.post<IValidatePromo>(
            `${instanceUrl}/v2/promo/accept-discount`,
            data
        );
    },

    async createBooing(data: IBookingFields) {
        return axios.post(
            `${instanceUrl}/v2/booking/user`,
            data
        );
    },
    // end booking

    // account
    async login(data: ILoginForm) {
        return axios.post<ILoginResponse>(
            `${globalUrl}/v2/auth/login`,
            data
        );
    },

    async loginSendCode(data: {phone : string}) {
        return axios.post<ILoginByCodeResponse>(
            `${globalUrl}/v2/auth/send-auth-code`,
            data,
        );
    },

    async register(data: IRegisterForm) {
        return axios.post<IRegisterResponse>(
            `${globalUrl}/v2/auth/registration`,
            data
        );
    },

    async getBonusesInfo(data: ITokenDTO) {
        return axios.get<IGetBonusesInfoResponse>(
            `${globalUrl}/v2/bonus/get`,
            {
                headers: {
                    ...data
                }
            }
            
        );
    },

    async getHistory(userId: number) {
        return axios.get<Array<IOrderHistoryItem>>(
            `${globalUrl}/v2/orders/history/${userId}`
        );
    },

    async logout(data: ITokenDTO) {
        return axios.post<any>(
            `${globalUrl}/v2/auth/logout`, 
            data
        );
    },

    async getUserCity(token: string) {
        return axios.get<IGetUserCityResponse>(
            `${globalUrl}/v2/profile/get-city`,
            {
                headers: {
                    token
                }
            }
        )
    },

    async setUserCity(data : {token: string, city: string}) {
        return axios.post<any>(
            `${globalUrl}/v2/profile/set-city`,
            data
        )
    },

    async editProfile(data: IEditProfileReq) {
        return axios.post<IUser>(
            `${globalUrl}/v2/profile/edit-info`,
            data
        )
    },

    async changePass(data: IChangePassForm) {
        return axios.post<any>(
            `${globalUrl}/v2/profile/edit-password`,
            data
        );
    }
}