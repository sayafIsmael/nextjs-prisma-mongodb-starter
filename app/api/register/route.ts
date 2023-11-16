import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import { userRoles } from "@/prisma/enum";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Check if the user collection is empty
    const isUserCollectionEmpty = (await prisma.user.count()) === 0;

    // Determine the role to assign to the user
    const roleName = isUserCollectionEmpty ? userRoles.ADMIN : userRoles.USER;

    // Create the user with the determined role
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword, // Replace with a hashed password in a real-world scenario
        role: {
          connect: {
            name: roleName,
          },
        },
      },
      include: {
        role: true,
      },
    });

    console.log('Created User');
    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Intenal Error", { status: 400 });
  }
}
