# Demos del curso AI4Devs

Este directorio contiene demos externas que usamos como referencia en el curso.  
Cada subcarpeta conserva su estructura original. Para detalles de instalación/uso, mira el `README.md` de cada demo.

## 📁 Contenido

### `claude-code-demo`
- **Origen:** LIDR-academy/claude-code-demo
- **Descripción breve:** App **Next.js** con chat de **IA** y **streaming** usando **OpenAI** + **Vercel AI SDK**, UI moderna (shadcn/ui). Basada en el workshop “Agentes IA en Claude Code 2.0”.
- **Inicio rápido:**
  ```
  cd demos/claude-code-demo
  cp .env.example .env   # añade tu OPENAI_API_KEY
  npm install            # o yarn / pnpm
  npm run dev
  ```
  abre http://localhost:3000

### `gas-station-bot`
- **Origen:** everload/gas-station-bot
- **Descripción breve:** Bot de **Telegram** en **Python** que consulta el endpoint público de gasolineras en España y devuelve la más barata cercana (usa `geopy`).
- **Inicio rápido:**
  ```
  cd demos/gas-station-bot
  pip install -r requirements.txt
  # configura tu token de Telegram en config.py
  python bot.py
  ```