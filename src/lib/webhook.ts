import { LogEntry } from "@/types";

export async function sendToWebhook(logData: LogEntry) {
    const WEBHOOK_URL = process.env.WEBHOOK_URL;

    if (!WEBHOOK_URL) {
        console.warn("WEBHOOK_URL no está definida. No se enviará al webhook.");
        return;
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(logData),
        });

        if (!response.ok) {
            console.error(
                `Error al enviar al webhook: ${response.status} ${response.statusText}`
            );
        } else {
            console.log("Log enviado exitosamente al webhook");
        }
    } catch (error) {
        console.error("Error en la solicitud al webhook:", error);
    }
}
