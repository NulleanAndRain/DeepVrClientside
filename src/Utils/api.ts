import axios from "axios"
import { ICity, IGetGamesResponse, IGetWorktimeResponse, IRoom } from "./types"

export interface ErrorResponse {
    error: number,
    error_text: string
}

let instanceUrl : string|undefined = '';
let instanceStorageUrl : string|undefined = '';
const globalUrl = process.env.REACT_APP_API_GLOBAL_URL;

export const Api = {
    get globalUrl() { 
        return globalUrl;
    },
    async getAllCities() {
        return axios.get<Array<ICity>>(
            `${globalUrl}/v2/instances/list`
        );
    },

    setInstanceUrl(url : string | undefined) {
        instanceUrl = url;
        if (url) instanceStorageUrl = url.replace('/api', '/storage');
        else instanceStorageUrl = undefined;
    },

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

    getImageUrl(url: string) {
        return `${instanceStorageUrl}/${url}`;
    }
}