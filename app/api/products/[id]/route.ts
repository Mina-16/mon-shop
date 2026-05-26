import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const product = await prisma.product.update({
    where: { id: parseInt(params.id) },
    data: body,
  });
  return Response.json(product);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: parseInt(params.id) } });
  return Response.json({ success: true });
}