# /formup — despliegue del backend (Google Apps Script)

El formulario en `/formup` manda un POST a un Web App de Google Apps Script,
que agrega cada respuesta como una fila en un Google Sheet — **solo cuando
la persona tildó el checkbox de opt-in al final del formulario**. Si no lo
tilda, el formulario nunca llega a llamar a este endpoint: no se guarda
nada. Este despliegue tenés que hacerlo vos desde tu cuenta de Google
(necesita tu aprobación de permisos, no lo puede hacer un tercero por vos).

## 1. Crear el Google Sheet

1. Andá a [sheets.google.com](https://sheets.google.com) y creá una planilla
   nueva. Nombrala, por ejemplo, **"Inspira RRHH — Candidatos"**.
2. (Opcional pero recomendado) Renombrá la primera hoja a **`Candidatos`**.
   El script busca una hoja con ese nombre; si no la encuentra, usa la hoja
   activa igual.

## 2. Pegar el Apps Script

1. Dentro de la planilla: **Extensiones > Apps Script**.
2. Borrá el contenido del archivo `Code.gs` que abre por default.
3. Pegá ahí todo el contenido de [`formup/apps-script.gs`](./apps-script.gs)
   de este repo.
4. Guardá el proyecto (ícono de disquete o `Cmd/Ctrl + S`). Podés dejarle
   el nombre por default o llamarlo "Inspira RRHH - formup".

## 3. (Opcional) Crear los encabezados de la hoja

Si preferís que las columnas ya vengan armadas antes de la primera
respuesta:

1. En el editor de Apps Script, arriba, elegí la función `setupSheet` en el
   dropdown de funciones (al lado del botón ▶ Ejecutar).
2. Apretá **▶ Ejecutar**.
3. La primera vez te va a pedir autorización: **Revisar permisos** → elegí
   tu cuenta de Google → **Avanzado** → **Ir a [nombre del proyecto]
   (no seguro)** → **Permitir**. Esto es normal: es tu propio script
   pidiendo acceso a tu propia planilla, Google lo marca "no seguro" por
   default porque no está verificado públicamente.
4. Volvé a la planilla: debería aparecer una hoja "Candidatos" con la fila
   de encabezados.

Si no hacés este paso, no pasa nada: el script crea los encabezados solo en
la primera respuesta real que reciba.

## 4. Desplegar como Web App

1. En el editor de Apps Script, arriba a la derecha: **Implementar >
   Nueva implementación** (Deploy > New deployment).
2. Al lado de "Seleccionar tipo", hacé clic en el ícono de engranaje ⚙️ y
   elegí **Aplicación web** (Web app).
3. Completá:
   - **Descripción**: "formup v1" (o lo que quieras).
   - **Ejecutar como**: **Yo (tu email)**.
   - **Quién tiene acceso**: **Cualquier usuario** (Anyone). Esto es
     necesario para que el sitio pueda mandarle datos desde el navegador
     del candidato sin que tenga que loguearse con Google. El script en sí
     solo permite agregar filas, no expone el contenido de la planilla.
4. Hacé clic en **Implementar** (Deploy).
5. Te va a volver a pedir autorización la primera vez (mismo flujo que el
   paso 3: Avanzado → Ir a... → Permitir).
6. Copiá la **URL de la aplicación web** que te da al final. Tiene esta
   forma:

   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

   Esa es la URL que necesito para conectar el formulario.

## 5. Conectar el formulario a esa URL

Una vez que tengas la URL del paso anterior, avisame o segui estos pasos vos
mismo:

1. En la raíz del repo, copiá `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Abrí `.env.local` y pegá la URL:
   ```
   VITE_FORMUP_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec
   ```
3. Reiniciá `npm run dev` si lo tenías corriendo, para que tome la variable.
4. Para producción (Vercel): en el dashboard del proyecto, **Settings >
   Environment Variables**, agregá `VITE_FORMUP_ENDPOINT` con el mismo
   valor, para los entornos que uses (Production / Preview). Vercel
   necesita un nuevo deploy para que la variable tome efecto — un
   redeploy alcanza, no hace falta tocar código.

## 6. Si alguna vez necesitás actualizar el script

Cuando cambies `formup/apps-script.gs` en el repo (por ejemplo, para
agregar una columna), tenés que volver a pegarlo en el editor de Apps
Script y crear **una nueva implementación** (Deploy > Manage deployments >
✏️ editar la implementación activa > Nueva versión > Implementar). Si
elegís "editar" en lugar de "nueva implementación" desde cero, la URL
`/exec` se mantiene igual y no hace falta tocar `VITE_FORMUP_ENDPOINT`.

## Columnas que arma el script

| Columna | Contenido |
|---|---|
| Marca temporal | Fecha/hora del envío (automática) |
| Nombre y apellido | Campo del form |
| Email | Campo del form |
| Teléfono | Campo del form (puede quedar vacío) |
| Experiencia laboral | Texto libre, campo abierto y opcional (puede quedar vacío) |
| Interés | "Psicología del Trabajo", "Recursos Humanos", "Ambos", o vacío |
| Consiente contacto futuro | Fijo: "Sí" — este endpoint solo se llama cuando el opt-in está tildado |
| Fecha de consentimiento | Misma fecha/hora que "Marca temporal" |
| Origen | Fijo: "UP - Psicología del Trabajo" |

Nada de "Perfil sugerido / Contactado / Notas" en esta versión — si las
querés igual para hacer seguimiento manual, agregalas vos directamente en
la planilla como columnas extra al final; el script no las toca.

## Notas técnicas

- El formulario manda el POST **sin header `Content-Type` explícito** (cae
  en `text/plain` por default del navegador). Es intencional: evita que el
  navegador dispare un preflight `OPTIONS`, que los Web Apps de Apps Script
  no saben responder. El script lee el body igual con
  `e.postData.contents` y lo parsea como JSON.
- Si en algún momento el endpoint no está configurado (`.env.local` vacío)
  o Apps Script devuelve un error, el formulario muestra un mensaje de
  error y **no pierde lo que el usuario ya tipeó** — puede reintentar sin
  volver a escribir todo. Esto solo puede pasar cuando el opt-in está
  tildado (es el único caso en que se llama a la red).
- Si la persona **no** tilda el opt-in, al enviar el formulario nunca se
  hace ningún request — no hay forma de que ese registro termine en la
  planilla ni en ningún otro lado. La pantalla de agradecimiento es
  idéntica en ambos casos, tildado o no.
