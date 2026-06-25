#!/bin/bash

# ── TV IP → Oda Numarası eşlemesi ─────────────────────────────
declare -A TV_ROOMS=(
  ["192.168.1.119"]="9"
  ["192.168.1.120"]="1"
  # ["192.168.1.121"]="2"
  # ["192.168.1.122"]="3"
  # ...
)
# ─────────────────────────────────────────────────────────────

APP="com.boii.tv.debug"
HTML="/sdcard/Android/data/${APP}/files/boii-tv.html"
CONFIG="/sdcard/Android/data/${APP}/files/boii-config.json"
LOCAL_HTML="/tmp/boii-tv.html"
LOCAL_CFG="/tmp/boii-config.json"

echo "📥  Son versiyon indiriliyor..."
curl -sL "https://raw.githubusercontent.com/gizemDeneme/boii-digitalSignage/main/boii-tv.html" -o "$LOCAL_HTML"
if [ $? -ne 0 ]; then
  echo "❌  İndirme başarısız." && exit 1
fi

OK=0
FAIL=0

for IP in "${!TV_ROOMS[@]}"; do
  ROOM="${TV_ROOMS[$IP]}"
  echo ""
  echo "📺  $IP (Oda $ROOM) bağlanılıyor..."

  adb connect "${IP}:5555" > /dev/null 2>&1
  sleep 0.5

  STATUS=$(adb -s "${IP}:5555" get-state 2>/dev/null)
  if [ "$STATUS" != "device" ]; then
    echo "    ⚠️  Bağlanamadı, atlanıyor."
    FAIL=$((FAIL + 1))
    continue
  fi

  # HTML güncelle
  adb -s "${IP}:5555" push "$LOCAL_HTML" "$HTML" > /dev/null 2>&1

  # Oda config dosyasını push et
  echo "{\"room\":\"$ROOM\"}" > "$LOCAL_CFG"
  adb -s "${IP}:5555" push "$LOCAL_CFG" "$CONFIG" > /dev/null 2>&1

  # Uygulamayı yeniden başlat
  adb -s "${IP}:5555" shell am force-stop "$APP" > /dev/null 2>&1
  adb -s "${IP}:5555" shell am start -n "${APP}/com.boii.tv.MainActivity" > /dev/null 2>&1

  echo "    ✅  Güncellendi."
  OK=$((OK + 1))
done

echo ""
echo "─────────────────────────────────────────────────────────────"
echo "  Toplam: ${#TV_ROOMS[@]} TV  |  ✅ $OK başarılı  |  ⚠️  $FAIL ulaşılamadı"
echo "─────────────────────────────────────────────────────────────"
