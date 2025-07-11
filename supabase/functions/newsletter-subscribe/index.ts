import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface SubscribeRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Newsletter subscribe function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  try {
    const { email }: SubscribeRequest = await req.json();
    console.log("Processing subscription for:", email);

    // First, add email to database
    const { error: dbError } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email }]);

    if (dbError) {
      console.error("Database error:", dbError);
      if (dbError.code === '23505') { // Unique constraint violation
        return new Response(
          JSON.stringify({ error: "Cette adresse email est déjà inscrite" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
      throw dbError;
    }

    console.log("Email added to database successfully");

    // Then send welcome email
    const emailResponse = await resend.emails.send({
      from: "African Thinkers Network <newsletter@resend.dev>",
      to: [email],
      subject: "🌍 Bienvenue dans African Thinkers Network !",
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenue - African Thinkers Network</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #006B3F 0%, #D4AF37 100%);
              color: white;
              text-align: center;
              padding: 40px 20px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .subtitle {
              font-size: 16px;
              opacity: 0.9;
            }
            .content {
              padding: 40px 30px;
              background-color: #ffffff;
            }
            .welcome-title {
              color: #006B3F;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
              text-align: center;
            }
            .welcome-text {
              color: #333333;
              font-size: 16px;
              margin-bottom: 20px;
              text-align: center;
            }
            .benefits {
              background-color: #f8f9fa;
              border-left: 4px solid #D4AF37;
              padding: 20px;
              margin: 30px 0;
            }
            .benefits h3 {
              color: #006B3F;
              margin-top: 0;
              font-size: 18px;
            }
            .benefits ul {
              color: #555555;
              padding-left: 20px;
            }
            .benefits li {
              margin-bottom: 8px;
            }
            .quote-section {
              background-color: #006B3F;
              color: white;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
              border-radius: 8px;
            }
            .quote {
              font-style: italic;
              font-size: 18px;
              margin-bottom: 15px;
            }
            .quote-author {
              font-weight: bold;
              color: #D4AF37;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 30px;
              text-align: center;
              color: #666666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">African Thinkers Network</div>
              <div class="subtitle">Réseau des Penseurs Africains</div>
            </div>

            <div class="content">
              <h1 class="welcome-title">🎉 Bienvenue dans notre communauté !</h1>
              
              <p class="welcome-text">
                Félicitations ! Vous venez de rejoindre la plus grande communauté 
                dédiée à la valorisation de la pensée africaine. Ensemble, nous 
                explorons l'héritage intellectuel de l'Afrique à travers les siècles.
              </p>

              <div class="benefits">
                <h3>🌟 Ce que vous allez recevoir :</h3>
                <ul>
                  <li><strong>Actualités exclusives</strong> sur les penseurs africains</li>
                  <li><strong>Découvertes historiques</strong> et analyses approfondies</li>
                  <li><strong>Citations inspirantes</strong> des grands esprits africains</li>
                  <li><strong>Nouveaux contenus</strong> chaque semaine</li>
                  <li><strong>Accès prioritaire</strong> aux événements et conférences</li>
                </ul>
              </div>

              <div class="quote-section">
                <div class="quote">
                  "L'Afrique n'a pas d'histoire, elle n'est qu'un continent de ténèbres. 
                  Cette phrase, nous devons la combattre par la science."
                </div>
                <div class="quote-author">— Cheikh Anta Diop</div>
              </div>

              <p class="welcome-text">
                Merci de nous faire confiance dans cette mission de 
                reconnaissance et de valorisation de notre patrimoine intellectuel.
              </p>
            </div>

            <div class="footer">
              <p><strong>African Thinkers Network</strong></p>
              <p>Valoriser et promouvoir l'héritage intellectuel africain à travers les âges</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Inscription réussie ! Un email de bienvenue vous a été envoyé." 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in newsletter-subscribe function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);