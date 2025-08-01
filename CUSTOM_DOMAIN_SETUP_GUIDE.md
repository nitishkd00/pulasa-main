# 🌐 Custom Domain Setup Guide for Pulasa Application

## 📋 Overview

This guide will help you set up a custom domain (`pulasa.com`) with subdomain structure for your Pulasa application. The setup will include:

- **Main App:** `pulasa.com` (main e-commerce site)
- **Auction App:** `auction.pulasa.com` (auction platform)
- **API Services:** `api.pulasa.com` (backend services)

---

## 🎯 Domain Structure

```
pulasa.com                    → Main Pulasa e-commerce site
├── auction.pulasa.com        → Auction platform
├── api.pulasa.com           → Unified Auth Service
└── auction-api.pulasa.com   → Auction Server API
```

---

## 📝 Prerequisites

1. **Domain Name:** Purchase `pulasa.com` from a domain registrar (GoDaddy, Namecheap, etc.)
2. **Vercel Account:** For frontend hosting
3. **Render Account:** For backend services
4. **DNS Access:** Ability to manage DNS records

---

## 🚀 Step 1: Purchase Domain

### 1.1 Choose Domain Registrar
- **Recommended:** GoDaddy, Namecheap, or Google Domains
- **Cost:** ~$10-15/year for `.com` domain

### 1.2 Purchase Domain
1. Go to your chosen registrar
2. Search for `pulasa.com`
3. Complete purchase
4. Note down your domain management credentials

---

## 🔧 Step 2: Configure Vercel for Main Domain

### 2.1 Add Custom Domain to Main App
1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your `pulasa-main` project

2. **Add Domain**
   - Click **Settings** → **Domains**
   - Click **Add Domain**
   - Enter: `pulasa.com`
   - Click **Add**

3. **Configure Domain**
   - Vercel will show DNS records to add
   - **Note down these records** (you'll need them later)

### 2.2 Add Subdomain for Auction App
1. **Add Auction Subdomain**
   - In the same Domains section
   - Click **Add Domain**
   - Enter: `auction.pulasa.com`
   - Click **Add**

---

## 🌐 Step 3: Configure DNS Records

### 3.1 Access DNS Management
1. **Login to Domain Registrar**
   - Go to your domain registrar's dashboard
   - Find DNS management section
   - Look for "DNS Records" or "Zone File"

### 3.2 Add Vercel DNS Records

#### For Main Domain (`pulasa.com`):
```
Type: A
Name: @
Value: 76.76.19.36
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### For Auction Subdomain (`auction.pulasa.com`):
```
Type: CNAME
Name: auction
Value: cname.vercel-dns.com
TTL: 3600
```

### 3.3 Add API Subdomains

#### For Auth API (`api.pulasa.com`):
```
Type: CNAME
Name: api
Value: pulasa-auth-service.onrender.com
TTL: 3600
```

#### For Auction API (`auction-api.pulasa.com`):
```
Type: CNAME
Name: auction-api
Value: pulasa-auction-server.onrender.com
TTL: 3600
```

---

## ⚙️ Step 4: Configure Render Services

### 4.1 Update Unified Auth Service
1. **Go to Render Dashboard**
   - Visit [render.com/dashboard](https://render.com/dashboard)
   - Select `pulasa-auth-service`

2. **Add Custom Domain**
   - Go to **Settings** → **Custom Domains**
   - Click **Add Custom Domain**
   - Enter: `api.pulasa.com`
   - Click **Add**

3. **Update Environment Variables**
   ```bash
   ALLOWED_ORIGINS=https://pulasa.com,https://auction.pulasa.com
   ```

### 4.2 Update Auction Server
1. **Go to Render Dashboard**
   - Select `pulasa-auction-server`

2. **Add Custom Domain**
   - Go to **Settings** → **Custom Domains**
   - Click **Add Custom Domain**
   - Enter: `auction-api.pulasa.com`
   - Click **Add**

3. **Update Environment Variables**
   ```bash
   ALLOWED_ORIGINS=https://pulasa.com,https://auction.pulasa.com
   CLIENT_URL=https://auction.pulasa.com
   ```

---

## 🔄 Step 5: Update Application Code

### 5.1 Update Main App Environment Variables

**File:** `pulasa/.env.production`
```bash
VITE_UNIFIED_AUTH_URL=https://api.pulasa.com
VITE_API_BASE_URL=/api
VITE_AUCTION_API_URL=https://auction-api.pulasa.com/api
```

### 5.2 Update Auction Client Environment Variables

**File:** `auction/client/.env.production`
```bash
REACT_APP_UNIFIED_AUTH_URL=https://api.pulasa.com
REACT_APP_AUCTION_API_URL=https://auction-api.pulasa.com/api
```

### 5.3 Update Vercel Environment Variables

#### For Main App (`pulasa-main`):
1. **Go to Vercel Dashboard**
   - Select `pulasa-main` project
   - Go to **Settings** → **Environment Variables**

2. **Add/Update Variables:**
   ```bash
   VITE_UNIFIED_AUTH_URL=https://api.pulasa.com
   VITE_API_BASE_URL=/api
   VITE_AUCTION_API_URL=https://auction-api.pulasa.com/api
   ```

#### For Auction App (`pulasa-auction-client`):
1. **Go to Vercel Dashboard**
   - Select `pulasa-auction-client` project
   - Go to **Settings** → **Environment Variables**

2. **Add/Update Variables:**
   ```bash
   REACT_APP_UNIFIED_AUTH_URL=https://api.pulasa.com
   REACT_APP_AUCTION_API_URL=https://auction-api.pulasa.com/api
   ```

---

## 🔗 Step 6: Update Code References

### 6.1 Update MongoDBService URLs

**File:** `pulasa/src/services/MongoDBService.ts`
```typescript
constructor() {
  this.baseUrl = 'https://api.pulasa.com';
  this.sessionKey = 'pulasa_unified_session';
}
```

### 6.2 Update Auction Client URLs

**File:** `auction/client/src/services/UnifiedAuthService.js`
```javascript
const AUTH_SERVICE_URL = 'https://api.pulasa.com';
```

**File:** `auction/client/src/contexts/SocketContext.js`
```javascript
const SOCKET_URL = 'https://auction-api.pulasa.com';
```

### 6.3 Update Navigation Links

**File:** `auction/client/src/components/Navbar.js`
```javascript
const handleGoToMainSite = () => {
  window.open('https://pulasa.com', '_blank');
};
```

---

## 🧪 Step 7: Test Everything

### 7.1 Test Main Domain
1. **Visit:** `https://pulasa.com`
2. **Check:** Main app loads correctly
3. **Test:** Login functionality
4. **Test:** Navigation to auction app

### 7.2 Test Auction Subdomain
1. **Visit:** `https://auction.pulasa.com`
2. **Check:** Auction app loads correctly
3. **Test:** Authentication transfer
4. **Test:** Bidding functionality

### 7.3 Test API Endpoints
1. **Auth API:** `https://api.pulasa.com/api/health`
2. **Auction API:** `https://auction-api.pulasa.com/api/health`

---

## 🔒 Step 8: SSL Certificate Setup

### 8.1 Vercel SSL (Automatic)
- Vercel automatically provides SSL certificates
- No additional setup required

### 8.2 Render SSL (Automatic)
- Render automatically provides SSL certificates
- No additional setup required

---

## 📊 Step 9: Monitoring & Analytics

### 9.1 Google Analytics
1. **Create Property**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create new property for `pulasa.com`

2. **Add Tracking Code**
   - Add GA4 tracking code to both apps
   - Track subdomains separately

### 9.2 Vercel Analytics
1. **Enable Analytics**
   - Go to Vercel project settings
   - Enable Web Analytics
   - Monitor performance

---

## 🚨 Troubleshooting

### Common Issues:

#### 1. DNS Propagation
- **Problem:** Domain not resolving
- **Solution:** Wait 24-48 hours for DNS propagation
- **Check:** Use [whatsmydns.net](https://whatsmydns.net)

#### 2. SSL Certificate Issues
- **Problem:** Mixed content warnings
- **Solution:** Ensure all URLs use HTTPS
- **Check:** Update all hardcoded URLs

#### 3. CORS Errors
- **Problem:** Cross-origin requests blocked
- **Solution:** Update `ALLOWED_ORIGINS` in backend services
- **Check:** Browser console for CORS errors

#### 4. Environment Variables Not Working
- **Problem:** Old URLs still being used
- **Solution:** Redeploy applications after updating env vars
- **Check:** Clear browser cache

---

## 📞 Support Resources

### Domain Registrar Support
- **GoDaddy:** [help.godaddy.com](https://help.godaddy.com)
- **Namecheap:** [support.namecheap.com](https://support.namecheap.com)

### Platform Support
- **Vercel:** [vercel.com/support](https://vercel.com/support)
- **Render:** [render.com/docs](https://render.com/docs)

### DNS Tools
- **DNS Checker:** [whatsmydns.net](https://whatsmydns.net)
- **SSL Checker:** [sslshopper.com](https://sslshopper.com)

---

## ✅ Checklist

- [ ] Purchase `pulasa.com` domain
- [ ] Add custom domains in Vercel
- [ ] Configure DNS records
- [ ] Add custom domains in Render
- [ ] Update environment variables
- [ ] Update code references
- [ ] Test all subdomains
- [ ] Verify SSL certificates
- [ ] Set up analytics
- [ ] Test all functionality

---

## 🎉 Final Result

After completing all steps, you'll have:

```
✅ pulasa.com              → Main e-commerce site
✅ auction.pulasa.com      → Auction platform  
✅ api.pulasa.com         → Auth service
✅ auction-api.pulasa.com → Auction server
✅ SSL certificates       → Secure HTTPS
✅ Analytics tracking     → Performance monitoring
```

**Your Pulasa application will be live with a professional custom domain structure!** 🚀 