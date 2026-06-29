# 🚀 Instrucciones para Desplegar MNW Gratis en Internet

He preparado tu proyecto para que puedas subirlo completamente gratis a internet. Usaremos **Vercel** para el frontend (el sitio web principal) y **Render** para el backend (el sistema de administración y formulario).

---

## 📋 Requisitos Previos
1. Tener una cuenta en **GitHub** ([github.com](https://github.com)).
2. Tener una cuenta en **Vercel** ([vercel.com](https://vercel.com)) — *puedes iniciar sesión con tu cuenta de GitHub*.
3. Tener una cuenta en **Render** ([render.com](https://render.com)) — *puedes iniciar sesión con tu cuenta de GitHub*.

---

## 🛠️ Paso 1: Subir tu código a GitHub

Ya he inicializado Git en tu computadora y guardado todos tus archivos listos para enviar. Sigue estos pasos para subirlo a tu cuenta de GitHub:

1. Ve a [github.com/new](https://github.com/new) e inicia sesión.
2. Crea un repositorio nuevo con el nombre de tu preferencia (ej. `mnw-networking`). Deja las opciones de "Add a README" desmarcadas.
3. Abre tu terminal de comandos en la carpeta de este proyecto (`C:\Users\parra\OneDrive\Desktop\Networking`) y ejecuta los siguientes comandos que te dará GitHub (reemplazando con la URL de tu repositorio):

```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO_DE_GITHUB/TU_REPOSITORIO.git
git push -u origin main
```

---

## ⚙️ Paso 2: Desplegar el Backend en Render

El backend es el encargado de procesar el formulario de contacto y almacenar/administrar las actividades semanales.

1. Ve a tu panel de [Render](https://dashboard.render.com/) y da clic en **New +** ➔ **Web Service**.
2. Selecciona **Build and deploy from a Git repository** y conecta tu repositorio recién creado.
3. Configura el servicio con los siguientes datos:
   * **Name:** `mnw-backend` (o el que gustes).
   * **Region:** Selecciona la más cercana (ej. Oregon u Ohio).
   * **Branch:** `main`
   * **Root Directory:** `backend` (⚠️ *Muy importante: escribe "backend" aquí*).
   * **Runtime:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `node server.js`
   * **Instance Type:** `Free` (Gratuito).

4. **Variables de Entorno (Environment Variables):**
   Da clic en la pestaña **Environment** en Render y agrega las siguientes variables de entorno:
   * `ADMIN_USERNAME` = `admin` (o tu usuario personalizado).
   * `ADMIN_PASSWORD` = `mnw2026admin` (o tu contraseña personalizada).
   * `JWT_SECRET` = `un_secreto_muy_seguro_123` (cualquier texto largo aleatorio).
   * `PORT` = `3001`
   * `FRONTEND_URL` = (Déjalo en blanco por ahora, lo actualizaremos en el paso 3).

5. Da clic en **Create Web Service**. Render tardará unos minutos en construir tu servidor. Una vez listo, copia la URL que te proporciona Render al inicio (ej. `https://mnw-backend.onrender.com`).

---

## 💻 Paso 3: Desplegar el Frontend en Vercel

El frontend es el sitio web que visitarán los usuarios.

1. Ve a [Vercel](https://vercel.com/dashboard) y da clic en **Add New...** ➔ **Project**.
2. Selecciona tu repositorio de GitHub e impórtalo.
3. Configura el proyecto con los siguientes datos:
   * **Framework Preset:** `Vite` (se detecta automáticamente).
   * **Root Directory:** Dejar en blanco (la raíz del repositorio).
   * **Build and Development Settings:** Dejar por defecto.
   
4. **Environment Variables (Variables de Entorno):**
   Expande la sección y agrega la URL de tu backend para que el formulario se comunique con él:
   * `VITE_API_URL` = `https://tu-backend-de-render.onrender.com/api` (reemplaza con la URL que copiaste en el Paso 2, agregando `/api` al final).

5. Da clic en **Deploy**. Vercel compilará tu sitio web en segundos y te dará una URL pública gratuita (ej. `https://mnw-networking.vercel.app`).

---

## 🔗 Paso 4: Conectar y probar todo
Una vez que Vercel te dé tu URL pública (ej. `https://mnw-networking.vercel.app`):
1. Vuelve a tu panel de **Render** en la configuración de tu Backend.
2. En la pestaña **Environment**, actualiza la variable `FRONTEND_URL` con tu URL de Vercel (ej. `https://mnw-networking.vercel.app`). Esto es necesario para habilitar el acceso seguro (CORS).
3. ¡Listo! Ya puedes visitar tu sitio web en Vercel, probar el formulario de contacto e ingresar al panel de administración haciendo clic en el punto secreto al final del footer.

---

### ⚠️ Nota sobre las imágenes en Render Gratis:
Como el plan de Render es gratuito, sus contenedores son temporales. Si subes fotos de actividades desde el panel de administración, estas se guardarán en el servidor, pero si el servidor se reinicia (pasa una vez al día automáticamente en el plan gratuito), las fotos locales de las actividades se borrarán. 

Si en algún momento notas esto y deseas que las fotos de las actividades sean permanentes sin pagar nada, avísame y conectamos el backend con **Cloudinary** (un servicio de almacenamiento en la nube gratuito que yo te puedo configurar en 5 minutos).
