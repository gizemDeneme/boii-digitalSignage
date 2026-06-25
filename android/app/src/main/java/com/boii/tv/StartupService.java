package com.boii.tv;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

public class StartupService extends Service {
    private static final String CHANNEL_ID = "boii_startup";

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Intent launch = new Intent(this, MainActivity.class);
        launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

        PendingIntent pendingIntent = PendingIntent.getActivity(
            this, 0, launch,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        NotificationChannel channel = new NotificationChannel(
            CHANNEL_ID, "Boii TV", NotificationManager.IMPORTANCE_HIGH);
        channel.setSound(null, null);
        NotificationManager nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        nm.createNotificationChannel(channel);

        Notification notification = new Notification.Builder(this, CHANNEL_ID)
            .setContentTitle("Boii TV")
            .setSmallIcon(android.R.drawable.ic_media_play)
            .setFullScreenIntent(pendingIntent, true)
            .setCategory(Notification.CATEGORY_ALARM)
            .build();

        startForeground(1, notification);
        stopSelf();
        return START_NOT_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
