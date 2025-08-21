## Deploying to Render

1) Prerequisites
- PostgreSQL database URL (Render Postgres/Neon)
- Cloudinary account URL for media storage
- Email SMTP credentials (e.g., Gmail App Password) if using email in production

2) Ensure these files exist
- `requirements.txt` (includes `gunicorn`)
- `Procfile`
- `render.yaml`

3) Environment variables (Render Dashboard)
- `ENVIRONMENT=production`
- `DJANGO_SECRET_KEY=...`
- `DATABASE_URL=postgres://...`
- `CLOUDINARY_URL=cloudinary://...`
- `ALLOWED_HOSTS=yourservice.onrender.com`
- `CSRF_TRUSTED_ORIGINS=https://yourservice.onrender.com`
- `EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend`
- `EMAIL_HOST=smtp.gmail.com`
- `EMAIL_PORT=587`
- `EMAIL_USE_TLS=True`
- `EMAIL_HOST_USER=youraddress@gmail.com`
- `EMAIL_HOST_PASSWORD=your_app_password`
- `DEFAULT_FROM_EMAIL=youraddress@gmail.com`

4) Build and start
- Render uses `render.yaml`:
  - Build: `pip install -r requirements.txt && python ngo/manage.py collectstatic --noinput && python ngo/manage.py migrate --noinput`
  - Start: `gunicorn ngo.wsgi:application --log-file -`

5) Notes
- Static served via WhiteNoise; media via Cloudinary in production
- Email backend switches by `ENVIRONMENT` (console in development, SMTP in production)
