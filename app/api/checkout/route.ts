import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: body.items,

      mode: "payment",

      success_url: "http://localhost:3000/success",

      cancel_url: "http://localhost:3000/cart",
    });

    return Response.json({
      url: session.url,
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Stripe error" },
      { status: 500 }
    );
  }
}