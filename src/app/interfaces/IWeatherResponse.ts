export interface IWeatherResponse {
    address: string
    timezone: string
    resolvedAddress: string
    days: IWeatherResponseDay[]
}

export interface IWeatherResponseDay {
    datetime: string
    dayName: string
    parsedDate: string

    tempmax: number
    tempmin: number
    temp: number
    feelslike: number

    humidity: number
    precipcover: number
    windspeed: number
    pressure: number
    icon: string
}