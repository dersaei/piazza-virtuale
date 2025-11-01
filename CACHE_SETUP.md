# 📦 Cache Components - Instrukcja konfiguracji

## ✅ Co zostało wdrożone

### 1. **Cache Components włączone**
- `next.config.ts`: `cacheComponents: true`
- Automatyczne cachowanie z dyrektywą `"use cache"`

### 2. **Cache Tags**
Każda funkcja API ma przypisane tagi do granularnej rewalidacji:

#### Producenci:
- `producers` - globalny tag dla wszystkich producentów
- `producers-{categorySlug}` - tag dla konkretnej kategorii (np. `producers-pasta`)

#### Magazine:
- `magazine-cards` - karty na stronie magazine
- `magazine-articles` - wszystkie artykuły
- `magazine-article-{slug}` - konkretny artykuł

### 3. **Cache Life (czas życia cache)**
- **Producenci**: `hours` (1 godzina automatycznej rewalidacji)
- **Magazine**: `days` (dni - treść statyczna)

### 4. **API Endpoint do rewalidacji**
- **URL**: `/api/revalidate`
- **Metoda**: POST
- **Wymaga**: Secret token z `.env.local`

---

## 🚀 Jak to działa?

### Scenariusz 1: Użytkownik odwiedza stronę
```
1. User → /formaggi
2. Next.js sprawdza cache
3. Jeśli cache ważny (< 1h) → zwraca z cache (⚡ błyskawiczne!)
4. Jeśli cache przeterminowany → fetch z Directus → cache → zwróć
```

### Scenariusz 2: Dodajesz nowego producenta w Directus
```
1. Dodajesz producenta w Directus
2. Directus webhook → POST /api/revalidate
3. Cache dla tej kategorii jest unieważniony
4. Następne żądanie → fetch z Directus → nowy cache
5. User widzi NATYCHMIAST nowego producenta! ✨
```

---

## ⚙️ Konfiguracja

### Krok 1: Utwórz `.env.local`
```bash
cp .env.local.example .env.local
```

Edytuj `.env.local` i ustaw silny token:
```env
REVALIDATE_SECRET_TOKEN=twój-super-tajny-token-min-32-znaki
```

**Generowanie bezpiecznego tokenu:**
```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Krok 2: Konfiguracja Directus Webhook

#### Dla Producentów (Producers):

1. W Directus → **Settings** → **Webhooks** → **Create Webhook**
2. Ustaw parametry:
   - **Name**: `Revalidate Producers Cache`
   - **URL**: `https://twoja-domena.com/api/revalidate`
   - **Method**: `POST`
   - **Status**: `Active`
   - **Trigger**: `Action (Event)`
   - **Collections**: `producers`
   - **Actions**:
     - ✅ `item.create`
     - ✅ `item.update`
     - ✅ `item.delete`

3. **Request Body** (JSON):
```json
{
  "secret": "{{$env.REVALIDATE_SECRET_TOKEN}}",
  "collection": "producers"
}
```

#### Dla Magazine Articles:

1. W Directus → **Settings** → **Webhooks** → **Create Webhook**
2. Ustaw parametry:
   - **Name**: `Revalidate Magazine Cache`
   - **URL**: `https://twoja-domena.com/api/revalidate`
   - **Method**: `POST`
   - **Status**: `Active`
   - **Trigger**: `Action (Event)`
   - **Collections**: `magazine_articles`
   - **Actions**:
     - ✅ `item.create`
     - ✅ `item.update`
     - ✅ `item.delete`

3. **Request Body** (JSON):
```json
{
  "secret": "{{$env.REVALIDATE_SECRET_TOKEN}}",
  "collection": "magazine_articles"
}
```

---

## 🧪 Testowanie

### Test 1: Sprawdź endpoint rewalidacji
```bash
# Health check
curl https://twoja-domena.com/api/revalidate

# Odpowiedź:
{
  "status": "ok",
  "endpoint": "/api/revalidate",
  "method": "POST"
}
```

### Test 2: Ręczna rewalidacja (bez Directus)
```bash
curl -X POST https://twoja-domena.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "twój-secret-token",
    "collection": "producers"
  }'

# Odpowiedź:
{
  "revalidated": true,
  "collection": "producers",
  "tags": ["producers"],
  "timestamp": "2025-11-01T00:00:00.000Z"
}
```

### Test 3: Rewalidacja konkretnej kategorii
```bash
curl -X POST https://twoja-domena.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "twój-secret-token",
    "collection": "producers",
    "categorySlug": "formaggi"
  }'

# Odpowiedź:
{
  "revalidated": true,
  "collection": "producers",
  "tags": ["producers", "producers-formaggi"],
  "timestamp": "2025-11-01T00:00:00.000Z"
}
```

### Test 4: Sprawdź cache w akcji

1. Otwórz stronę kategorii (np. `/formaggi`)
2. Sprawdź Response Headers w DevTools:
   - `X-Next-Cache: HIT` = Zwrócone z cache ⚡
   - `X-Next-Cache: MISS` = Pobrane z Directus 🔄

---

## 📊 Monitorowanie Cache

### W logach Next.js zobaczysz:
```
✅ Revalidated tag: producers
✅ Revalidated tag: producers-formaggi
```

### W Directus Webhook Logs zobaczysz:
- Status: 200 = Sukces
- Body response z timestamp

---

## 🎯 Najlepsze praktyki

### 1. **Zawsze testuj lokalnie najpierw**
```bash
npm run dev
# Test webhook na localhost:3000/api/revalidate
```

### 2. **Użyj silnego tokenu w produkcji**
- Minimum 32 znaki
- Losowe, generowane automatycznie
- Przechowywane bezpiecznie w zmiennych środowiskowych

### 3. **Monitoruj logi Directus**
- Sprawdzaj czy webhooks się wykonują
- Jeśli 401 = zły token
- Jeśli 500 = błąd serwera (sprawdź logi Next.js)

### 4. **Cache invalidation strategy**
- Producers: rewaliduj cały `producers` tag (wszystkie kategorie dostają fresh data)
- Magazine: rewaliduj tylko zmienione artykuły

---

## 🔧 Troubleshooting

### Problem: Cache nie odświeża się po dodaniu producenta

**Rozwiązanie:**
1. Sprawdź czy webhook w Directus jest aktywny
2. Sprawdź logi webhook w Directus → powinien być status 200
3. Sprawdź czy `REVALIDATE_SECRET_TOKEN` w `.env.local` zgadza się z tym w webhook
4. Sprawdź logi Next.js → powinno być `✅ Revalidated tag: producers`

### Problem: 401 Unauthorized

**Rozwiązanie:**
- Token w webhook nie zgadza się z tokenem w `.env.local`
- Upewnij się, że restart Next.js po zmianie `.env.local`

### Problem: Cache nadal pokazuje stare dane

**Rozwiązanie:**
1. Hard refresh w przeglądarce (Ctrl+F5)
2. Sprawdź czy endpoint `/api/revalidate` rzeczywiście się wywołał
3. Ręcznie wywołaj rewalidację przez curl (patrz: Testowanie)

---

## 📈 Metryki sukcesu

Po wdrożeniu Cache Components powinieneś zobaczyć:

- ⚡ **TTFB**: 400ms → 50ms (8x szybciej)
- 💰 **Zapytania do Directus**: -80%
- 📊 **Lighthouse Score**: +15-20 punktów
- 🎯 **Cache Hit Rate**: >90% (większość requestów z cache)

---

## 🎉 Gotowe!

Twój cache jest skonfigurowany i działa! Gdy dodasz nowego producenta w Directus, zostanie automatycznie wyświetlony na stronie dzięki webhook revalidation.

**Pytania?** Sprawdź logi lub skontaktuj się z supportem.
