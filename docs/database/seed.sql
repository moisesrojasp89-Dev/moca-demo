-- Datos Semilla en Paridad 1:1 con js/data.js y js/config.js (BACKEND.md)
INSERT INTO public.catalog_items (id, category, brand, name, description, price_usd, stock, image_url, featured, disponible)
VALUES
  ('la-clasica-moca', 'Hamburguesas', 'MOCA', 'La Clásica MOCA', 'Angus de 120 g sellado a la plancha, cheddar añejo fundido, cebolla caramelizada y la salsa MOCA que no revelamos.', 7.90, 15, 'assets/products/burger-clasica.webp', true, TRUE),
  ('doble-fuego', 'Hamburguesas', 'MOCA', 'Doble Fuego', 'Dos smash de 90 g con doble cheddar, pepinillos encurtidos en casa y salsa brasa ahumada. La que más sale de cocina.', 11.50, 15, 'assets/products/burger-doble-fuego.webp', true, TRUE),
  ('bacon-crunch', 'Hamburguesas', 'MOCA', 'Bacon Crunch', 'Bacon ahumado crocante, cheddar fundido, cebolla crispy y mayo BBQ de la casa sobre pan brioche tostado con mantequilla.', 10.90, 15, 'assets/products/burger-bacon-crunch.webp', true, TRUE),
  ('queso-pepinillos', 'Hamburguesas', 'MOCA', 'Queso & Pepinillos', 'Doble queso americano, pepinillos crocantes y mostaza antigua. Simple, ácida y adictiva: la favorita de los puristas.', 8.50, 15, 'assets/products/burger-queso-pepinillos.webp', false, TRUE),
  ('la-huerta', 'Hamburguesas', 'MOCA', 'La Huerta', 'Lechuga mantecosa, tomate del día, cebolla morada y mayo de lima. Fresca sin renunciar al sabor de la carne a la plancha.', 8.90, 15, 'assets/products/burger-huerta.webp', false, TRUE),
  ('cordero-menta', 'Hamburguesas', 'MOCA', 'Cordero & Menta', 'Cordero de 150 g con labneh, menta fresca y cebolla morada. Un guiño mediterráneo que funciona mejor de lo que suena.', 13.50, 15, 'assets/products/burger-cordero.webp', false, TRUE),
  ('blue-cheese-pera', 'Hamburguesas', 'MOCA', 'Blue Cheese & Pera', 'Queso azul cremoso, pera caramelizada y nuez tostada. Dulce, salado y con carácter: no es para todos, es para los que saben.', 12.50, 15, 'assets/products/burger-blue-cheese.webp', false, TRUE),
  ('combo-doble', 'Combos', 'MOCA', 'Combo Doble', 'Doble Fuego + papas con cheddar y bacon + bebida de 12 oz. Para quien no viene a jugar: viene a comer.', 16.50, 15, 'assets/products/combo-doble.webp', true, TRUE),
  ('papas-rusticas', 'Acompañamientos', 'MOCA', 'Papas Rústicas', 'Corte grueso con piel, sal de mar y romero. Fritas dos veces para que aguanten hasta el último bocado.', 3.90, 15, 'assets/products/papas-rusticas.webp', false, TRUE),
  ('papas-corte-fino', 'Acompañamientos', 'MOCA', 'Papas de Corte Fino', 'Finitas, doradas y saladas al momento. La guarnición perfecta para no compartir nada.', 3.40, 15, 'assets/products/papas-corte-fino.webp', false, TRUE),
  ('malteada-fresa', 'Bebidas', 'MOCA', 'Malteada de Fresa', 'Helado artesanal, leche entera y fresa natural. Espesa de verdad: el pitillo se sostiene solo.', 5.90, 15, 'assets/products/bebida-malteada-fresa.webp', true, TRUE),
  ('te-durazno', 'Bebidas', 'MOCA', 'Té Helado de Durazno', 'Infusión en frío durante 12 horas con durazno en almíbar y limón. Hielo cristalino, nada de polvo.', 3.20, 15, 'assets/products/bebida-te-durazno.webp', false, TRUE),
  ('limonada-coco', 'Bebidas', 'MOCA', 'Limonada de Coco', 'Coco cremoso, limón y hielo frappé. Dulce, ácida y helada: la que se pide cuando hace 32 °C en Caracas.', 3.50, 15, 'assets/products/bebida-limonada-coco.webp', true, TRUE)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  brand = EXCLUDED.brand,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_usd = EXCLUDED.price_usd,
  stock = EXCLUDED.stock,
  image_url = EXCLUDED.image_url,
  featured = EXCLUDED.featured,
  disponible = EXCLUDED.disponible;

INSERT INTO public.site_settings (id, business_hours, contact_phones, payment_methods, announcement_text, promo_headline, delivery_eta)
VALUES (
  'default',
  'Lunes a domingo, 11:00 – 22:00',
  '["+584125550142"]'::jsonb,
  '["Pago Móvil","Efectivo","Zelle","Tarjeta al recibir"]'::jsonb,
  '✦ Cocina en vivo · Delivery propio en 25 min · Pedidos directos por WhatsApp',
  'Smash burgers a la plancha, pan brioche horneado cada mañana y salsas de la casa. Pide por WhatsApp y come en 25 minutos.',
  '25 min'
)
ON CONFLICT (id) DO UPDATE SET
  business_hours = EXCLUDED.business_hours,
  contact_phones = EXCLUDED.contact_phones,
  payment_methods = EXCLUDED.payment_methods,
  announcement_text = EXCLUDED.announcement_text,
  promo_headline = EXCLUDED.promo_headline,
  delivery_eta = EXCLUDED.delivery_eta,
  updated_at = NOW();
