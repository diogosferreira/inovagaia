export default async function handler(req, res) {
    const ALLOWED_ORIGIN = "https://scaleup.inovagaia.pt"; // sem barra final

    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        return res.status(200).end();
    }

    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    try {
        const { email, first_name, cellphone } = req.body || {};
        if (!email) return res.status(400).json({ error: "Email é obrigatório" });

        const API_KEY = process.env.EGOI_API_KEY; // d31cfe3b...
        const LIST_ID = process.env.EGOI_LIST_ID; // 7745

        // Criar contacto
        const create = await fetch(`https://api.egoiapp.com/lists/${LIST_ID}/contacts`, {
            method: "POST",
            headers: { "content-type": "application/json", "accept": "application/json", "Apikey": API_KEY },
            body: JSON.stringify({ email, first_name, cellphone })
        });

        // Se já existe, atualizar por email
        if (create.status === 409 || create.status === 422) {
            const upd = await fetch(`https://api.egoiapp.com/lists/${LIST_ID}/contacts/by-field`, {
                method: "POST",
                headers: { "content-type": "application/json", "accept": "application/json", "Apikey": API_KEY },
                body: JSON.stringify({ field_id: "email", field_value: email, update: { first_name, cellphone } })
            });
            const t2 = await upd.text();
            return res.status(upd.ok ? 200 : upd.status).send(t2 || (upd.ok ? "Atualizado" : "Erro ao atualizar"));
        }

        const text = await create.text();
        return res.status(create.ok ? 200 : create.status).send(text || (create.ok ? "Criado" : "Erro ao criar"));
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Erro interno" });
    }
}