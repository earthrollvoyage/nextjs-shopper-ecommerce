import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


export default async function handler(req: any, res: any) {
  const { items, email } = req.body
  const modifiedItems = items.map((item: any) => ({
    description: item.description,
    quantity: item.quantity,
    price_data: {
      currency: 'usd',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image]
      }
    }
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // shipping_options: [
    //   { shipping_rates: { id: `${process.env.STRIPE_SHIPPING_RATE}`}
    //   }
    // ],
    shipping_address_collection: {
      allowed_countries: ['BD', 'GB', 'US', 'CA', 'TH']
    },
    line_items: modifiedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item: any) => item.image))
    }
  })
  
  // return session.id
  res.status(200).json({
    id: session.id
  })
}