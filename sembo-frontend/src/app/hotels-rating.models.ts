/**
 * Country object with its data
 */
export class HotelsRatingPerCountry {
    public country!: string;
    public averageScore!: number;
    public topThreeHotels!: HotelData[];
}
/**
 * Hotel info used for the top three hotels per country
 */
export class HotelData {
    public id!: string;
    public name!: string;
    public isoCountryId!: string;
    public score!: number;
}
