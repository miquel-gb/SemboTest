export class HotelsRatingPerCountry {
    public country!: string;
    public averageScore!: number;
    public topThreeHotels!: HotelData[];
}

export class HotelData {
    public id!: string;
    public name!: string;
    public isoCountryId!: string;
    public score!: number;
}
