import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        imageUrl: body.imageUrl,
        stock: 10,
        featured: true,
        categoryId: body.categoryId,
      },
    });

    return Response.json(product);

  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
