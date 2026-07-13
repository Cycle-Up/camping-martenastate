// Keep-alive voor het gratis Supabase-project.
// Gratis Supabase-projecten pauzeren na ~7 dagen zonder activiteit; dan valt
// het gastenboek uit. Deze functie doet 1x per dag (via Vercel Cron, zie
// vercel.json) een lichte leesquery op de gastenboek-tabel, zodat het project
// "actief" blijft en niet automatisch pauzeert.
//
// De anon-key staat toch al publiek in gastenboek.html (alleen-lezen/insert),
// dus hier worden geen geheimen blootgesteld.
//
// NB: werkt alleen als het project draait. Staat het al gepauzeerd, herstel
// het dan eenmalig in het Supabase-dashboard; daarna houdt deze cron het wakker.

const SB_URL = 'https://ubhqqvassnkyfsftrmyh.supabase.co/rest/v1/gastenboek?select=id&limit=1';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViaHFxdmFzc25reWZzZnRybXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwOTQyODksImV4cCI6MjA5NDY3MDI4OX0.e5cLy8QeibuUG-5qRTAWlbXWBuPMa-gzWq4YyqAqD6U';

export default async function handler(req, res) {
  try {
    const r = await fetch(SB_URL, {
      headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY },
    });
    res.status(200).json({ ok: r.ok, status: r.status, at: new Date().toISOString() });
  } catch (e) {
    res.status(200).json({ ok: false, error: String(e), at: new Date().toISOString() });
  }
}
