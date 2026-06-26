#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Boii TV — İlk Kurulum Scripti
# Kullanım: ./setup-tv.sh <IP> <ODA_NO>
# Örnek:    ./setup-tv.sh 192.168.1.3 3
# ─────────────────────────────────────────────────────────────

IP="$1"
ROOM="$2"
LOCAL_APK="$3"

if [ -z "$IP" ] || [ -z "$ROOM" ]; then
  echo "Kullanım: $0 <IP> <ODA_NO> [APK_YOLU]"
  echo "Örnek:    $0 192.168.1.3 3"
  echo "Örnek:    $0 192.168.1.3 3 ~/Desktop/boii-tv-debug.apk"
  exit 1
fi

APP="com.boii.tv.debug"
APK_URL="https://github.com/gizemDeneme/boii-digitalSignage/releases/latest/download/app-debug.apk"
HTML_URL="https://raw.githubusercontent.com/gizemDeneme/boii-digitalSignage/main/boii-tv.html"
HTML_REMOTE="/sdcard/Android/data/${APP}/files/boii-tv.html"
CONFIG_REMOTE="/sdcard/Android/data/${APP}/files/boii-config.json"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Boii TV  |  Oda $ROOM  |  $IP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. ADB bağlantısı
echo ""
echo "🔌  ADB bağlanılıyor..."
adb connect "${IP}:5555" > /dev/null 2>&1
sleep 1
STATUS=$(adb -s "${IP}:5555" get-state 2>/dev/null)
if [ "$STATUS" != "device" ]; then
  echo "❌  Bağlanamadı. TV'de Geliştirici Modu + ADB açık mı?"
  echo "    Ayarlar → Cihaz Tercihleri → Hakkında → 7 kez Yapı → Geri → Geliştirici → USB Hata Ayıklama"
  exit 1
fi
echo "    ✅  Bağlandı."

# 2. Varsa eski APK'yı kaldır
echo ""
echo "🗑   Eski sürüm kontrol ediliyor..."
INSTALLED=$(adb -s "${IP}:5555" shell pm list packages 2>/dev/null | grep "$APP")
if [ -n "$INSTALLED" ]; then
  echo "    Eski sürüm bulundu, kaldırılıyor..."
  adb -s "${IP}:5555" shell am force-stop "$APP" > /dev/null 2>&1
  adb -s "${IP}:5555" shell pm uninstall --user 0 "$APP" > /dev/null 2>&1
  echo "    ✅  Kaldırıldı."
else
  echo "    Yüklü değil, devam ediliyor."
fi

# 3. APK indir veya yerel kullan
echo ""
if [ -n "$LOCAL_APK" ] && [ -f "$LOCAL_APK" ]; then
  echo "📦  Yerel APK kullanılıyor: $LOCAL_APK"
  APK_PATH="$LOCAL_APK"
else
  echo "📦  APK indiriliyor..."
  curl -sL "$APK_URL" -o /tmp/boii-tv-setup.apk
  if [ $? -ne 0 ] || [ ! -s /tmp/boii-tv-setup.apk ]; then
    echo "❌  APK indirilemedi."
    exit 1
  fi
  APK_PATH="/tmp/boii-tv-setup.apk"
fi

echo "📲  APK yükleniyor..."
adb -s "${IP}:5555" install "$APK_PATH"
if [ $? -ne 0 ]; then
  echo "❌  Yükleme başarısız."
  exit 1
fi
echo "    ✅  APK yüklendi."

# 4. İzinleri ver
echo ""
echo "🔑  İzinler veriliyor..."
adb -s "${IP}:5555" shell appops set "$APP" USE_FULL_SCREEN_INTENT allow > /dev/null 2>&1
echo "    ✅  USE_FULL_SCREEN_INTENT verildi."

# 5. HTML indir ve push et
echo ""
echo "📥  HTML indiriliyor..."
curl -sL "$HTML_URL" -o /tmp/boii-tv.html
if [ $? -ne 0 ]; then
  echo "❌  HTML indirilemedi."
  exit 1
fi

# Dizini oluştur ve dosyaları push et
adb -s "${IP}:5555" shell mkdir -p "/sdcard/Android/data/${APP}/files/" > /dev/null 2>&1

echo "📤  HTML push ediliyor..."
adb -s "${IP}:5555" push /tmp/boii-tv.html "$HTML_REMOTE" > /dev/null 2>&1
echo "    ✅  HTML push edildi."

# 6. Oda config'i push et
echo ""
echo "⚙️   Oda config yazılıyor (Oda $ROOM)..."
echo "{\"room\":\"$ROOM\"}" > /tmp/boii-config.json
adb -s "${IP}:5555" push /tmp/boii-config.json "$CONFIG_REMOTE" > /dev/null 2>&1
echo "    ✅  Config push edildi."

# 7. Uygulamayı başlat
echo ""
echo "▶️   Uygulama başlatılıyor..."
adb -s "${IP}:5555" shell am start -n "${APP}/com.boii.tv.MainActivity" > /dev/null 2>&1
sleep 2

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅  Oda $ROOM kurulumu tamamlandı!"
echo "  📺  TV'de Boii uygulaması açılmış olmalı."
echo "  💡  Reboot testi: adb -s ${IP}:5555 shell reboot"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
