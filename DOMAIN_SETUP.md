# 🌐 Custom Domain Setup Guide - pulasa.com

## 🎯 Domain Structure
```
pulasa.com                    → Main e-commerce site
├── auction.pulasa.com        → Auction platform  
├── api.pulasa.com           → Auth service
└── auction-api.pulasa.com   → Auction server
```

## 📋 Step-by-Step Process

### Step 1: Purchase Domain
1. **Buy pulasa.com** from GoDaddy/Namecheap (~$10-15/year)
2. **Note:** Domain management credentials

### Step 2: Configure Vercel
1. **Main App (pulasa-main):**
   - Vercel Dashboard → Settings → Domains
   - Add: `pulasa.com`
   - Add: `auction.pulasa.com`

2. **Get DNS Records** from Vercel

### Step 3: Configure DNS Records
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

### Step 4: Configure Render Services
1. **Auth Service:**
   - Render Dashboard → Settings → Custom Domains
   - Add: `api.pulasa.com`

2. **Auction Server:**
   - Render Dashboard → Settings → Custom Domains  
   - Add: `auction-api.pulasa.com`

### Step 5: Update Environment Variables

**Main App (pulasa-main):**
```bash
VITE_UNIFIED_AUTH_URL=https://api.pulasa.com
VITE_API_BASE_URL=/api
VITE_AUCTION_API_URL=https://auction-api.pulasa.com/api
```

**Auction App (pulasa-auction-client):**
```bash
REACT_APP_UNIFIED_AUTH_URL=https://api.pulasa.com
REACT_APP_AUCTION_API_URL=https://auction-api.pulasa.com/api
```

### Step 6: Update Code URLs

**MongoDBService.ts:**
```typescript
this.baseUrl = 'https://api.pulasa.com';
```

**UnifiedAuthService.js:**
```javascript
const AUTH_SERVICE_URL = 'https://api.pulasa.com';
```

**SocketContext.js:**
```javascript
const SOCKET_URL = 'https://auction-api.pulasa.com';
```

**Navbar.js:**
```javascript
window.open('https://pulasa.com', '_blank');
```

### Step 7: Test Everything
1. **Main site:** https://pulasa.com
2. **Auction:** https://auction.pulasa.com  
3. **Auth API:** https://api.pulasa.com/api/health
4. **Auction API:** https://auction-api.pulasa.com/api/health

## ⚠️ Important Notes
- **DNS propagation:** Wait 24-48 hours
- **SSL certificates:** Automatic with Vercel/Render
- **CORS:** Update ALLOWED_ORIGINS in backend services
- **Cache:** Clear browser cache after changes

## 🚨 Troubleshooting
- **Domain not working:** Check DNS propagation at whatsmydns.net
- **SSL issues:** Ensure all URLs use HTTPS
- **CORS errors:** Update backend ALLOWED_ORIGINS
- **Old URLs:** Redeploy after env var changes

## ✅ Final Checklist
- [ ] Domain purchased
- [ ] Vercel domains configured
- [ ] DNS records added
- [ ] Render domains configured
- [ ] Environment variables updated
- [ ] Code URLs updated
- [ ] All subdomains tested
- [ ] SSL working
- [ ] Analytics setup (optional) 