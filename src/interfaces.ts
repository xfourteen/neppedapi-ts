export interface IImageResponse {
    url: string;
}

export interface ISharpBan {
    userID: string;
    moderatorID: string;
    banData: {
        reason: string | null,
        image: string | null,
        dateTime: number | null
    }
}