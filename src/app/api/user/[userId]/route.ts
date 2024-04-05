// Removed "use server" directive

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId;

    // Assuming `id` is of type string, otherwise convert it to the correct type
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Return a JSON response with the correct headers
    return NextResponse.json(user);
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    return new Response(JSON.stringify({ error: 'An error occurred while fetching the user.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}


export async function PUT(request: Request, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId;
    const res = await request.json()
    const fullName = res?.fullName as string;
    const bio = res?.bio as string;

    // Assuming `id` is of type string, otherwise convert it to the correct type
    const user = await prisma.user.update({
      where: { id: userId },
      data: { fullName, bio },
    });

    // Return a JSON response with the correct headers
    return new Response(JSON.stringify({ fullName: user.fullName, bio: user.bio }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    return new Response(JSON.stringify({ error: 'An error occurred while updating the user.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}