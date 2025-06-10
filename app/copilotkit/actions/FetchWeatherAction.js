import { useCopilotAction } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";

function WeatherSuggestions() {
  useCopilotChatSuggestions(
    {
      instructions: "Suggest weather-related questions a user might ask.",
      minSuggestions: 2,
      maxSuggestions: 4,
    }
    // No state needed for static suggestions
  );
  return null;
}

function WeatherCard({ city, temp, description, icon }) {
    return (
        <div className="bg-blue-50 rounded-lg shadow p-4 flex items-center gap-4 max-w-xs">
            <img src={icon} alt={description} className="w-12 h-12" />
            <div>
                <div className="text-lg font-bold text-blue-700">{city}</div>
                <div className="text-gray-700">{temp}°C, {description}</div>
            </div>
        </div>
    );
}

export default function FetchWeatherAction() {
    <WeatherSuggestions />
    useCopilotAction({
        name: "getWeather",
        description: "Fetches current weather for a city and shows it as a card.",
        parameters: [
            { name: "city", type: "string", description: "City name" }
        ],
        handler: async ({ city }) => {
            const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
            const res = await fetch(url);
            const body = await res.json();
            if (!res.ok) {
                console.log(body);
                throw new Error("City not found or API error");
            }
            return {
                city: body.name,
                temp: body.main.temp,
                description: body.weather[0].description,
                icon: body.weather[0].icon
            };
        },
        render: ({ status, args, result }) => {
            if (status === "inProgress") {
                return <div>Loading weather info for {args.city}...</div>;
            }
            if (status === "error") {
                return <div className="text-red-600">Could not fetch weather info for {args.city}.</div>;
            }
            if (status === "success" && result) {
                return (
                    <WeatherCard
                        city={result.city}
                        temp={result.temp}
                        description={result.description}
                        icon={`https://openweathermap.org/img/wn/${result.icon}@2x.png`}
                    />
                );
            }
        }
    });

    return null;
}
