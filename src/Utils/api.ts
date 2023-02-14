import axios, { AxiosResponse } from "axios"
import { IBookingFields, ICity, IGame, IGetBonusesInfoResponse, IGetGamesResponse, IGetSummaryRequestData, IGetWorktimeResponse, ILoginByCodeResponse, ILoginForm, ILoginResponse, IRegisterForm, IRegisterResponse, IRoom, ISummaryResponse, ITokenDTO, IValidatePromo, IValidatePromoRequestData } from "./types"

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
            `${globalUrl}/v2/client/send-auth-code`,
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
        return axios.post<IGetBonusesInfoResponse>(
            `${globalUrl}/v2/bonus/get`,
            data
        );
    },

    async getHistory(data: ITokenDTO) {
        return axios.post<any>(
            `${globalUrl}/v2/booking/history`, 
            data
        );
    },

    async logout(data: ITokenDTO) {
        return axios.post<any>(
            `${globalUrl}/v2/auth/logout`, 
            data
        );
    },
}