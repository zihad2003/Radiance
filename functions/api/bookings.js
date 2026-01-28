export async function onRequestGet(context) {
    const { DB } = context.env;

    try {
        const { results } = await DB.prepare(
            'SELECT * FROM bookings ORDER BY created_at DESC'
        ).all();

        return new Response(JSON.stringify(results), {
            headers: { 'Content-Type': 'application/json' },
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
            'INSERT INTO bookings (customer_name, customer_phone, service_id, booking_date, booking_time, total_amount) VALUES (?, ?, ?, ?, ?, ?)'
        ).bind(
            data.name,
            data.phone,
            data.serviceId,
            data.date,
            data.time,
            data.amount
        ).run();

        return new Response(JSON.stringify({
            success: true,
            bookingId: result.meta.last_row_id
        }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
