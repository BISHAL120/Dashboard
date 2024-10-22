import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API}&q=${process.env.WEATHER_LOACTION}`,
      {
        mode: "no-cors",
      }
    );
    const data = await response.json();

    return NextResponse.json(
      { message: "Weather fetched successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get weather" },
      { status: 500 }
    );
  }
}
