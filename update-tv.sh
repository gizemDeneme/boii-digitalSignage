#!/bin/bash

# ── TV IP listesi ─────────────────────────────────────────────
TVS=(
  192.168.1.119
  192.168.1.120
  # 192.168.1.121
  # 192.168.1.122
  # ...
)
# ─────────────────────────────────────────────────────────────

APP="com.boii.tv.debug"
HTML="/sdcard/Android/data/${APP}/files/boii-tv.html"
LOCAL="/tmp/boii-tv.html"

echo "📥  Son versiyon indiriliyor..."
curl -sL "https://raw.githubusercontent.com/gizemDeneme/boii-digitalSignage/main/boii-tv.html" -o "$LOCAL"
if [ $? -ne 0 ]; then
  echo "❌  İndirme başarısız." && exit 1
fi

OK=0
FAIL=0

for IP in "${TVS[@]}"; do
  echo ""
  echo "📺  $IP bağlanılıyor..."

  adb connect "${IP}:5555" > /dev/null 2>&1
  sleep 0.5

  # Bağlantı kontrolü
  STATUS=$(adb -s "${IP}:5555" get-state 2>/dev/null)
  if [ "$STATUS" != "device" ]; then
    echo "    ⚠️  Bağlanamadı, atlanıyor."
    FAIL=$((FAIL + 1))
    continue
  fi

  adb -s "${IP}:5555" push "$LOCAL" "$HTML" > /dev/null 2>&1
  adb -s "${IP}:5555" shell am force-stop "$APP" > /dev/null 2>&1
  adb -s "${IP}:5555" shell am start -n "${APP}/com.boii.tv.MainActivity" > /dev/null 2>&1

  echo "    ✅  Güncellendi."
  OK=$((OK + 1))
done

echo ""
echo "─────────────────────────────────────"
echo "  Toplam: ${#TVS[@]} TV  |  ✅ $OK başarılı  |  ⚠️  $FAIL ulaşılamadı"
echo "─────────────────────────────────────"
