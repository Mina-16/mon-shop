import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { items } = await req.json();

    // تحويل items لصيغة Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.imageUrl ? [item.imageUrl] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cart",
      metadata: {
        userId: session?.user?.id ?? "",
      },
    });

    // حفظ الطلب في DB
    await prisma.order.create({
      data: {
        userId: session?.user?.id ?? null,
        items,
        total: items.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0),
        status: "PENDING",
        stripeSessionId: checkoutSession.id,
      },
    });

    return Response.json({ url: checkoutSession.url });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Stripe error" }, { status: 500 });
  }
}