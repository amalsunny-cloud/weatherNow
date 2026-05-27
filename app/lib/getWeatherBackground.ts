export function getWeatherBackground(condition: string) {
  const text = condition.toLowerCase();

  if (text.includes("sun") || text.includes("clear")) {
    return "/videos/sunnyWeather.mp4";
  }
  if (text.includes("rain") || text.includes("drizzle")){
    return "/videos/rainVideo.mp4";
  }
  if (text.includes("cloud")) {
    return "/videos/cloudyWeather.mp4";
  }
  if (text.includes("snow")) {
    return "/videos/snowVideo.mp4";
  }

  return "/videos/default.mp4";
}