# 🤖 AI4Devs 2025/10 Rookies

Repositorio privado de trabajo, ejercicios y demos del curso **AI4Devs 2025/10 Rookies**.  
Creado y mantenido por **Sergio Valdueza Lozano**.

---

## 📂 Estructura del repositorio

> 🧩 **Ejercicios:** tus entregas por módulo o bloque del curso.  
> 💡 **Demos:** ejemplos y notebooks compartidos por los formadores.  
> 🧰 **Utils:** scripts auxiliares, funciones o pruebas personales.

---

## ⚙️ Configuración del entorno

### Opción 1 – Usando `pip`
```bash
pip install -r requirements.txt
```

### Opción 2 – Usando `pip`
```
conda env create -f environment.yml
conda activate ai4devs
```

---

## 🧠 Objetivo

Centralizar todo el contenido práctico del curso AI4Devs 2025/10 Rookies:

Entregas semanales y prácticas personales.

Demos y notebooks de referencia.

Pruebas de librerías y APIs de IA.

Documentación de aprendizajes clave.

---

## 📥 Cómo se integraron las demos

Ambas demos se integraron usando `git subtree` (no submódulos), lo que significa que:

- El código está **copiado dentro del repo** (no depende de repos externos).
- Puedes modificarlo sin afectar los originales.
- Puedes actualizarlo más adelante con:
```
# Claude Code Demo
git subtree pull --prefix=demos/claude-code-demo https://github.com/LIDR-academy/claude-code-demo.git main --squash

# Gas Station Bot
git subtree pull --prefix=demos/gas-station-bot https://github.com/reverload/gas-station-bot.git main --squash
```

---

## 🔒 Privacidad y licencias

- Este repositorio es privado y de uso educativo.
- Las demos incluidas mantienen sus licencias originales:
  - `claude-code-demo`: MIT (uso libre con atribución).
  - `gas-station-bot`: GPL-3.0 (requiere mantener la misma licencia si se redistribuye).
- Si en el futuro haces público este repositorio, revisa las condiciones de ambas licencias.

---

## 🧑‍💻 Autor

Sergio Valdueza Lozano

📅 Octubre 2025

🧩 AI4Devs 2025/10 Rookies – Repositorio personal de trabajo

---

## 🧾 Licencia del repositorio

© 2025 Sergio Valdueza Lozano — Uso educativo y personal.

Todos los derechos reservados.

