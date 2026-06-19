#!/bin/bash
echo "Boii TV güncelleniyor..."
curl -sL "https://raw.githubusercontent.com/gizemDeneme/boii-digitalSignage/main/boii-tv.html" -o /tmp/boii-tv.html
adb connect 192.168.1.120:5555 > /dev/null
adb push /tmp/boii-tv.html /sdcard/Android/data/com.boii.tv.debug/files/boii-tv.html
adb shell am force-stop com.boii.tv.debug
adb shell am start -n com.boii.tv.debug/com.boii.tv.MainActivity
echo "Tamam!"
