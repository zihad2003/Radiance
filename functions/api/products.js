export async function onRequestGet(context) {
    const { DB } = context.env;

    try {
        const { results } = await DB.prepare(
            'SELECT * FROM products WHERE in_stock = 1'
        ).all();

        return new Response(JSON.stringify(results), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600'
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function onRequestPost(context) {
    const { DB } = context.env;
    const data = await context.request.json();

    try {
        const result = await DB.prepare(
            'INSERT INTO products (id, name, brand, category, price, description, image_main) VALUES (?, ?, ?, ?, ?, ?, ?)'
        ).bind(
            data.id,
            data.name,
            data.brand,
            data.category,
            data.price,
            data.description,
            data.image
        ).run();

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
