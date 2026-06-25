package com.boii.tv;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class MainActivity extends Activity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Tam ekran, uyku modunu engelle (TV her zaman açık kalmalı)
        getWindow().addFlags(
            WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON |
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );

        webView = new WebView(this);
        setContentView(webView);

        // Sistem navigasyon çubuğunu gizle
        webView.setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
            View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
            View.SYSTEM_UI_FLAG_FULLSCREEN |
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
            View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        );

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        // CDN'den (unpkg.com, Google Fonts) yüklemeye izin ver
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        // Dokunmatik zoom'u kapat (kumanda ile kullanılıyor)
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                File configFile = new File(getExternalFilesDir(null), "boii-config.json");
                if (!configFile.exists()) return;
                try {
                    StringBuilder sb = new StringBuilder();
                    BufferedReader br = new BufferedReader(new FileReader(configFile));
                    String line;
                    while ((line = br.readLine()) != null) sb.append(line);
                    br.close();
                    String json = sb.toString().trim();
                    view.evaluateJavascript(
                        "window.__BOII_CONFIG=" + json + ";" +
                        "if(typeof window.__onBoiiConfig==='function')window.__onBoiiConfig();",
                        null
                    );
                } catch (IOException e) { /* config okunamadı, misafir adı gösterilmez */ }
            }
        });
        webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setVerticalScrollBarEnabled(false);

        // ADB push ile güncelleme: adb push boii-tv.html /sdcard/Android/data/com.boii.tv/files/boii-tv.html
        File externalHtml = new File(getExternalFilesDir(null), "boii-tv.html");
        if (externalHtml.exists()) {
            webView.loadUrl("file://" + externalHtml.getAbsolutePath());
        } else {
            webView.loadUrl("file:///android_asset/boii-tv.html");
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        // Geri tuşu: uygulama kapanmasın, WebView'e ilet (Escape olarak)
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            webView.dispatchKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_ESCAPE));
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onResume() {
        super.onResume();
        webView.onResume();
        // Tam ekranı yeniden uygula (bildirim paneli sonrası)
        webView.setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
            View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
            View.SYSTEM_UI_FLAG_FULLSCREEN |
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
            View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        );
    }

    @Override
    protected void onPause() {
        super.onPause();
        webView.onPause();
    }
}
