# Auth App (Registrering och Inloggning)

Detta projekt är en enkel autentiseringstjänst byggd med **Node.js**, **Express**, och en frontend med **HTML, CSS och JavaScript**. Applikationen tillåter användare att registrera sig, logga in och få tillgång till en skyddad sida när de är inloggade.

##  Funktionalitet
- Registrera ny användare
- Logga in och få feedback
- Visa skyddad information vid giltig inloggning
- Hantera felmeddelanden för felaktig inmatning

## Kommunikation med backend
Alla anrop går till backendens /api-endpoints.
📤 POST /api/register
- Skickar användarnamn och lösenord för att skapa ett konto
📤 POST /api/login
- Skickar användarnamn och lösenord för att få JWT-token
🔐 GET /api/protected
- Endast tillgänglig om token är sparad i t.ex. localStorage eller skickas med i headers

