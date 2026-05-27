export async function GET(req: Request) {

    // Get City from URL
    const { searchParams } = new URL(req.url)
    const city = searchParams.get("city");

    // API Call
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=3`)

    const data = await res.json();
    
    return Response.json(data);
}