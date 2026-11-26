/**
 * scripts/provision_supabase.js — Automatización Zero-Copy-Paste de Supabase (MOCA)
 *
 * Ejecuta automáticamente:
 * 1. Inyección de SUPABASE_URL y SUPABASE_ANON_KEY en js/config.js.
 * 2. Sincronización 1:1 del catálogo inicial en public.catalog_items y public.site_settings vía REST API.
 * 3. Creación/actualización del usuario Administrador en Supabase Auth con app_metadata: { role: 'admin' }.
 */
import fs from 'node:fs';
import path from 'node:path';

const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

async function main() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SERVICE_KEY) {
    throw new Error('Faltan SUPABASE_URL, SUPABASE_ANON_KEY o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno.');
  }

  // 1. Inyectar llaves públicas en js/config.js
  const configPath = path.resolve(process.cwd(), 'js/config.js');
  if (fs.existsSync(configPath)) {
    let configContent = fs.readFileSync(configPath, 'utf8');
    configContent = configContent
      .replace(/SUPABASE_URL:\s*['"][^'"]*['"]/, `SUPABASE_URL: ${JSON.stringify(SUPABASE_URL)}`)
      .replace(/SUPABASE_ANON_KEY:\s*['"][^'"]*['"]/, `SUPABASE_ANON_KEY: ${JSON.stringify(SUPABASE_ANON_KEY)}`);
    fs.writeFileSync(configPath, configContent, 'utf8');
  }

  // 2. Sincronizar catálogo inicial (1:1 con js/data.js)
  const items = [
  {
    "id": "la-clasica-moca",
    "category": "Hamburguesas",
    "name": "La Clásica MOCA",
    "description": "Angus de 120 g sellado a la plancha, cheddar añejo fundido, cebolla caramelizada y la salsa MOCA que no revelamos.",
    "priceUsd": 7.9,
    "stock": 15,
    "badge": "La Original",
    "imageUrl": "assets/products/burger-clasica.webp",
    "rating": 5,
    "featured": true
  },
  {
    "id": "doble-fuego",
    "category": "Hamburguesas",
    "name": "Doble Fuego",
    "description": "Dos smash de 90 g con doble cheddar, pepinillos encurtidos en casa y salsa brasa ahumada. La que más sale de cocina.",
    "priceUsd": 11.5,
    "stock": 15,
    "badge": "Más Pedida",
    "imageUrl": "assets/products/burger-doble-fuego.webp",
    "rating": 5,
    "featured": true
  },
  {
    "id": "bacon-crunch",
    "category": "Hamburguesas",
    "name": "Bacon Crunch",
    "description": "Bacon ahumado crocante, cheddar fundido, cebolla crispy y mayo BBQ de la casa sobre pan brioche tostado con mantequilla.",
    "priceUsd": 10.9,
    "stock": 15,
    "badge": "Ahumada",
    "imageUrl": "assets/products/burger-bacon-crunch.webp",
    "rating": 4.9,
    "featured": true
  },
  {
    "id": "queso-pepinillos",
    "category": "Hamburguesas",
    "name": "Queso & Pepinillos",
    "description": "Doble queso americano, pepinillos crocantes y mostaza antigua. Simple, ácida y adictiva: la favorita de los puristas.",
    "priceUsd": 8.5,
    "stock": 15,
    "imageUrl": "assets/products/burger-queso-pepinillos.webp",
    "rating": 4.9,
    "featured": false
  },
  {
    "id": "la-huerta",
    "category": "Hamburguesas",
    "name": "La Huerta",
    "description": "Lechuga mantecosa, tomate del día, cebolla morada y mayo de lima. Fresca sin renunciar al sabor de la carne a la plancha.",
    "priceUsd": 8.9,
    "stock": 15,
    "badge": "Fresca",
    "imageUrl": "assets/products/burger-huerta.webp",
    "rating": 4.8,
    "featured": false
  },
  {
    "id": "cordero-menta",
    "category": "Hamburguesas",
    "name": "Cordero & Menta",
    "description": "Cordero de 150 g con labneh, menta fresca y cebolla morada. Un guiño mediterráneo que funciona mejor de lo que suena.",
    "priceUsd": 13.5,
    "stock": 15,
    "imageUrl": "assets/products/burger-cordero.webp",
    "rating": 4.8,
    "featured": false
  },
  {
    "id": "blue-cheese-pera",
    "category": "Hamburguesas",
    "name": "Blue Cheese & Pera",
    "description": "Queso azul cremoso, pera caramelizada y nuez tostada. Dulce, salado y con carácter: no es para todos, es para los que saben.",
    "priceUsd": 12.5,
    "stock": 15,
    "imageUrl": "assets/products/burger-blue-cheese.webp",
    "rating": 4.7,
    "featured": false
  },
  {
    "id": "combo-doble",
    "category": "Combos",
    "name": "Combo Doble",
    "description": "Doble Fuego + papas con cheddar y bacon + bebida de 12 oz. Para quien no viene a jugar: viene a comer.",
    "priceUsd": 16.5,
    "stock": 15,
    "badge": "Para Dos",
    "imageUrl": "assets/products/combo-doble.webp",
    "rating": 5,
    "featured": true
  },
  {
    "id": "papas-rusticas",
    "category": "Acompañamientos",
    "name": "Papas Rústicas",
    "description": "Corte grueso con piel, sal de mar y romero. Fritas dos veces para que aguanten hasta el último bocado.",
    "priceUsd": 3.9,
    "stock": 15,
    "imageUrl": "assets/products/papas-rusticas.webp",
    "rating": 4.8,
    "featured": false
  },
  {
    "id": "papas-corte-fino",
    "category": "Acompañamientos",
    "name": "Papas de Corte Fino",
    "description": "Finitas, doradas y saladas al momento. La guarnición perfecta para no compartir nada.",
    "priceUsd": 3.4,
    "stock": 15,
    "imageUrl": "assets/products/papas-corte-fino.webp",
    "rating": 4.7,
    "featured": false
  },
  {
    "id": "malteada-fresa",
    "category": "Bebidas",
    "name": "Malteada de Fresa",
    "description": "Helado artesanal, leche entera y fresa natural. Espesa de verdad: el pitillo se sostiene solo.",
    "priceUsd": 5.9,
    "stock": 15,
    "imageUrl": "assets/products/bebida-malteada-fresa.webp",
    "rating": 4.9,
    "featured": true
  },
  {
    "id": "te-durazno",
    "category": "Bebidas",
    "name": "Té Helado de Durazno",
    "description": "Infusión en frío durante 12 horas con durazno en almíbar y limón. Hielo cristalino, nada de polvo.",
    "priceUsd": 3.2,
    "stock": 15,
    "imageUrl": "assets/products/bebida-te-durazno.webp",
    "rating": 4.7,
    "featured": false
  },
  {
    "id": "limonada-coco",
    "category": "Bebidas",
    "name": "Limonada de Coco",
    "description": "Coco cremoso, limón y hielo frappé. Dulce, ácida y helada: la que se pide cuando hace 32 °C en Caracas.",
    "priceUsd": 3.5,
    "stock": 15,
    "badge": "Helada",
    "imageUrl": "assets/products/bebida-limonada-coco.webp",
    "rating": 4.9,
    "featured": true
  }
];
  const rows = items.map((item) => ({
    id: item.id,
    category: item.category,
    brand: item.brand || "MOCA",
    name: item.name,
    description: item.description,
    price_usd: item.priceUsd,
    stock: typeof item.stock === 'number' ? item.stock : 15,
    badge: item.badge || null,
    image_url: item.imageUrl || null,
    featured: Boolean(item.featured),
    disponible: true,
  }));

  const upsertRes = await fetch(`${SUPABASE_URL}/rest/v1/catalog_items?on_conflict=id`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify(rows),
  });

  if (!upsertRes.ok) {
    const errText = await upsertRes.text();
    throw new Error(`Error al sincronizar catalog_items (${upsertRes.status}): ${errText}`);
  }

  // 2b. Sincronizar configuración inicial del comercio (1:1 con DEFAULT_SITE_SETTINGS)
  const defaultSettings = {
  "businessHours": "Lunes a domingo, 11:00 – 22:00",
  "contactPhones": [
    "+584125550142"
  ],
  "paymentMethods": [
    "Pago Móvil",
    "Efectivo",
    "Zelle",
    "Tarjeta al recibir"
  ],
  "announcementText": "✦ Cocina en vivo · Delivery propio en 25 min · Pedidos directos por WhatsApp",
  "promoHeadline": "Smash burgers a la plancha, pan brioche horneado cada mañana y salsas de la casa. Pide por WhatsApp y come en 25 minutos.",
  "deliveryEta": "25 min"
};
  const settingsRes = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?on_conflict=id`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify({
      id: 'default',
      business_hours: defaultSettings.businessHours,
      contact_phones: defaultSettings.contactPhones,
      payment_methods: defaultSettings.paymentMethods,
      announcement_text: defaultSettings.announcementText,
      promo_headline: defaultSettings.promoHeadline,
      delivery_eta: defaultSettings.deliveryEta,
    }),
  });

  if (!settingsRes.ok) {
    const settingsErr = await settingsRes.text();
    throw new Error(`Error al sincronizar site_settings (${settingsRes.status}): ${settingsErr}`);
  }

  // 3. Crear usuario Admin con app_metadata.role = "admin" en Supabase Auth
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    const authRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
        app_metadata: { role: 'admin' },
      }),
    });

    if (!authRes.ok && authRes.status !== 422) {
      const authErr = await authRes.text();
      throw new Error(`Error creando usuario Admin en Supabase Auth (${authRes.status}): ${authErr}`);
    }
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
