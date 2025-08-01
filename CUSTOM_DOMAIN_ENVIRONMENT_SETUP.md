# 🌐 Custom Domain Environment Setup - pulasa.com

## 📋 Current Environment Variables (Before Custom Domain)

### 1. pulasa-main (Vercel)
```bash
VITE_UNIFIED_AUTH_URL = Empty
VITE_API_BASE_URL = /api
VITE_AUCTION_API_URL = /auction-api
```

### 2. pulasa-auction-client (Vercel)
```bash
REACT_APP_AUCTION_API_URL=https://pulasa-auction-server.onrender.com
NODE_ENV=production
MONGODB_URI=mongodb+srv://nitishkumardevoju:muwLYrPn5blRAGCd@pulasa.sjvscku.mongodb.net/?retryWrites=true&w=majority&appName=pulasa
JWT_SECRET=pulasa-super-secret-jwt-key-2024-make-it-long-and-random
UNIFIED_AUTH_URL=https://pulasa-auth-api.onrender.com
RAZORPAY_KEY_ID=rzp_test_placeholder
RAZORPAY_KEY_SECRET=placeholder_secret_key
CLIENT_URL=https://placeholder-auction-client.vercel.app
```

### 3. pulasa-auction-server (Render)
```bash
CLIENT_URL=https://pulasa-auction-client.vercel.app
JWT_SECRET=pulasa-super-secret-jwt-key-2024-make-it-long-and-random
MONGODB_URI="mongodb+srv://nitishkumardevoju:muwLYrPn5blRAGCd@pulasa.sjvscku.mongodb.net/?retryWrites=true&w=majority&appName=pulasa"
NODE_ENV=production
RAZORPAY_KEY_ID=rzp_test_placeholder
RAZORPAY_KEY_SECRET=placeholder_secret_key
UNIFIED_AUTH_URL=https://pulasa-auth-api.onrender.com
```

### 4. pulasa-auth-service (Render)
```bash
ALLOWED_ORIGINS=https://pulasa-main.vercel.app,https://pulasa-auction-client.vercel.app
JWT_SECRET=pulasa-super-secret-jwt-key-2024-make-it-long-and-random
MONGODB_URI="mongodb+srv://nitishkumardevoju:muwLYrPn5blRAGCd@pulasa.sjvscku.mongodb.net/?retryWrites=true&w=majority&appName=pulasa"
NODE_ENV=production
RAZORPAY_KEY_ID=rzp_test_placeholder
RAZORPAY_KEY_SECRET=placeholder_secret_key
```

---

## 🎯 Updated Environment Variables (After Custom Domain)

### 1. pulasa-main (Vercel) - UPDATED
```bash
VITE_UNIFIED_AUTH_URL=https://api.pulasa.com
VITE_API_BASE_URL=https://api.pulasa.com/api
VITE_AUCTION_API_URL=https://auction-api.pulasa.com/api
```

### 2. pulasa-auction-client (Vercel) - UPDATED
```bash
REACT_APP_AUCTION_API_URL=https://auction-api.pulasa.com
NODE_ENV=production
MONGODB_URI=mongodb+srv://nitishkumardevoju:muwLYrPn5blRAGCd@pulasa.sjvscku.mongodb.net/?retryWrites=true&w=majority&appName=pulasa
JWT_SECRET=pulasa-super-secret-jwt-key-2024-make-it-long-and-random
UNIFIED_AUTH_URL=https://api.pulasa.com
RAZORPAY_KEY_ID=rzp_test_placeholder
RAZORPAY_KEY_SECRET=placeholder_secret_key
CLIENT_URL=https://auction.pulasa.com
```

### 3. pulasa-auction-server (Render) - UPDATED
```bash
CLIENT_URL=https://auction.pulasa.com
JWT_SECRET=pulasa-super-secret-jwt-key-2024-make-it-long-and-random
MONGODB_URI="mongodb+srv://nitishkumardevoju:muwLYrPn5blRAGCd@pulasa.sjvscku.mongodb.net/?retryWrites=true&w=majority&appName=pulasa"
NODE_ENV=production
RAZORPAY_KEY_ID=rzp_test_placeholder
RAZORPAY_KEY_SECRET=placeholder_secret_key
UNIFIED_AUTH_URL=https://api.pulasa.com
```

### 4. pulasa-auth-service (Render) - UPDATED
```bash
ALLOWED_ORIGINS=https://pulasa.com,https://auction.pulasa.com
JWT_SECRET=pulasa-super-secret-jwt-key-2024-make-it-long-and-random
MONGODB_URI="mongodb+srv://nitishkumardevoju:muwLYrPn5blRAGCd@pulasa.sjvscku.mongodb.net/?retryWrites=true&w=majority&appName=pulasa"
NODE_ENV=production
RAZORPAY_KEY_ID=rzp_test_placeholder
RAZORPAY_KEY_SECRET=placeholder_secret_key
```

---

## 🔧 Step-by-Step Update Process

### Step 1: Purchase Domain
1. **Buy pulasa.com** from GoDaddy/Namecheap (~$10-15/year)
2. **Note:** Domain management credentials

### Step 2: Configure Vercel Domains
1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)

2. **For pulasa-main project:**
   - Select `pulasa-main` project
   - Go to **Settings** → **Domains**
   - Click **Add Domain**
   - Enter: `pulasa.com`
   - Click **Add**

3. **For pulasa-auction-client project:**
   - Select `pulasa-auction-client` project
   - Go to **Settings** → **Domains**
   - Click **Add Domain**
   - Enter: `auction.pulasa.com`
   - Click **Add**

### Step 3: Configure Render Custom Domains
1. **For pulasa-auth-service:**
   - Go to [render.com/dashboard](https://render.com/dashboard)
   - Select `pulasa-auth-service`
   - Go to **Settings** → **Custom Domains**
   - Click **Add Custom Domain**
   - Enter: `api.pulasa.com`
   - Click **Add**

2. **For pulasa-auction-server:**
   - Select `pulasa-auction-server`
   - Go to **Settings** → **Custom Domains**
   - Click **Add Custom Domain**
   - Enter: `auction-api.pulasa.com`
   - Click **Add**

### Step 4: Configure DNS Records
**In your domain registrar's DNS settings:**

```
# Main domain
Type: A
Name: @
Value: 76.76.19.36

Type: CNAME  
Name: www
Value: cname.vercel-dns.com

# Auction subdomain
Type: CNAME
Name: auction
Value: cname.vercel-dns.com

# API subdomains
Type: CNAME
Name: api
Value: pulasa-auth-service.onrender.com

Type: CNAME
Name: auction-api
Value: pulasa-auction-server.onrender.com
```

### Step 5: Update Environment Variables

#### 5.1 Update pulasa-main (Vercel)
1. **Go to Vercel Dashboard**
   - Select `pulasa-main` project
   - Go to **Settings** → **Environment Variables**

2. **Update/Add Variables:**
   ```bash
   VITE_UNIFIED_AUTH_URL=https://api.pulasa.com
   VITE_API_BASE_URL=https://api.pulasa.com/api
   VITE_AUCTION_API_URL=https://auction-api.pulasa.com/api
   ```

#### 5.2 Update pulasa-auction-client (Vercel)
1. **Go to Vercel Dashboard**
   - Select `pulasa-auction-client` project
   - Go to **Settings** → **Environment Variables**

2. **Update Variables:**
   ```bash
   REACT_APP_AUCTION_API_URL=https://auction-api.pulasa.com
   UNIFIED_AUTH_URL=https://api.pulasa.com
   CLIENT_URL=https://auction.pulasa.com
   ```

#### 5.3 Update pulasa-auction-server (Render)
1. **Go to Render Dashboard**
   - Select `pulasa-auction-server`
   - Go to **Environment** tab

2. **Update Variables:**
   ```bash
   CLIENT_URL=https://auction.pulasa.com
   UNIFIED_AUTH_URL=https://api.pulasa.com
   ```

#### 5.4 Update pulasa-auth-service (Render)
1. **Go to Render Dashboard**
   - Select `pulasa-auth-service`
   - Go to **Environment** tab

2. **Update Variables:**
   ```bash
   ALLOWED_ORIGINS=https://pulasa.com,https://auction.pulasa.com
   ```

### Step 6: Update Code URLs (If Needed)

#### 6.1 Update MongoDBService.ts
**File:** `pulasa/src/services/MongoDBService.ts`
```typescript
constructor() {
  this.baseUrl = 'https://api.pulasa.com';
  this.sessionKey = 'pulasa_unified_session';
}
```

#### 6.2 Update UnifiedAuthService.js
**File:** `auction/client/src/services/UnifiedAuthService.js`
```javascript
constructor() {
  this.baseURL = 'https://api.pulasa.com';
  this.tokenKey = 'pulasa_ecommerce_token';
}
```

#### 6.3 Update SocketContext.js
**File:** `auction/client/src/contexts/SocketContext.js`
```javascript
const SOCKET_URL = 'https://auction-api.pulasa.com';
```

#### 6.4 Update Navbar.js
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

## ⚠️ Important Notes

### DNS Propagation
- **Wait 24-48 hours** for DNS changes to propagate globally
- **Check propagation:** Use [whatsmydns.net](https://whatsmydns.net)

### SSL Certificates
- **Vercel:** Automatic SSL certificates
- **Render:** Automatic SSL certificates
- **No manual setup required**

### CORS Configuration
- **Backend services** will automatically allow the new domains
- **No additional CORS setup** needed

### Cache Clearing
- **Clear browser cache** after changes
- **Hard refresh:** Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

---

## 🚨 Troubleshooting

### Common Issues:

#### 1. Domain Not Resolving
- **Problem:** Domain shows "not found"
- **Solution:** Wait for DNS propagation (24-48 hours)
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

## ✅ Final Checklist

- [ ] Purchase `pulasa.com` domain
- [ ] Add custom domains in Vercel (pulasa.com, auction.pulasa.com)
- [ ] Add custom domains in Render (api.pulasa.com, auction-api.pulasa.com)
- [ ] Configure DNS records
- [ ] Update pulasa-main environment variables
- [ ] Update pulasa-auction-client environment variables
- [ ] Update pulasa-auction-server environment variables
- [ ] Update pulasa-auth-service environment variables
- [ ] Update code URLs (if needed)
- [ ] Test all subdomains
- [ ] Verify SSL certificates
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
✅ Professional setup     → Custom domain architecture
```

**Your Pulasa application will be live with a professional custom domain structure!** 🚀 