export interface IMusicNameDictionary {
  [key: string]: string;
}

export interface IMusicNamePathDictionary {
  [key: string]: string[];
}

export const MUSIC_NAME_DICTIONARY : IMusicNameDictionary = {
    "snow": "snow",
    "rain": "cloudy",
    "fog": "cloudy",
    "wind": "cloudy",
    "cloudy": "cloudy",
    "partly-cloudy-day": "sunny",
    "partly-cloudy-night": "sunny",
    "clear-day": "sunny",
    "clear-night": "sunny"
};

export const MUSIC_NAME_PATH_DICTIONARY : IMusicNamePathDictionary = {
  "snow": [
    "assets/audio/snow/Frank Sinatra – Let It Snow.mp3",
    "assets/audio/snow/Michael Bublé – It's Beginning To Look A Lot Like Christmas.mp3",
    "assets/audio/snow/Wham! – Last Christmas Single Version.mp3",
  ],
  "cloudy": [
    "assets/audio/cloudy/Imagine Dragons – Demons.mp3",
    "assets/audio/cloudy/Один в каное – Човен.mp3",
    "assets/audio/cloudy/Океан Ельзи – Все буде добре.mp3",
  ],
  "sunny": [
    "assets/audio/sunny/DZIDZIO – Вихідний.mp3",
    "assets/audio/sunny/DZIDZIO – Я і Сара.mp3",
    "assets/audio/sunny/OneRepublic – Good Life.mp3",
  ]
};