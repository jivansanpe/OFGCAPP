package com.ofgc.app;

import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.getcapacitor.BridgeActivity;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class MainActivity extends BridgeActivity {
  @Override
    protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);


    FirebaseMessaging.getInstance().getToken()
      .addOnCompleteListener(new OnCompleteListener<String>() {
        @Override
        public void onComplete(@NonNull Task<String> task) {
          if (!task.isSuccessful()) {
            System.out.println("Fetching FCM registration token failed");
            return;
          }

          // Get new FCM registration token
          String token = task.getResult();

          // Log and toast
          System.out.println("token: " + token);

          sendTokenToBackend(token);

        }

      });
  }

  private void sendTokenToBackend(final String token) {
    Thread thread = new Thread(new Runnable() {
      @Override
      public void run() {
        try {
          // Construct request body
          String requestBody = "{\"TOKEN\": \"" + token + "\"}";  // Cambio realizado: Agregado el token al cuerpo de la solicitud

          // Create POST request
          URL url = new URL("https://www.monche.es/OFGC/backend/OFGCAPP/public/api/device");  // Reemplaza con la URL correcta de tu backend
          HttpURLConnection conn = (HttpURLConnection) url.openConnection();
          conn.setRequestMethod("POST");
          conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
          conn.setDoOutput(true);

          // Write request body
          OutputStream outputStream = conn.getOutputStream();
          outputStream.write(requestBody.getBytes("UTF-8"));
          outputStream.close();

          // Get response code
          int responseCode = conn.getResponseCode();

          if (responseCode == HttpURLConnection.HTTP_OK) {
            // Request successful
            Log.d("Response", "Token sent successfully");
          } else {
            // Request failed
            Log.e("Response", "Failed to send token to backend. Response code: " + responseCode);
          }

          conn.disconnect();
        } catch (IOException e) {
          e.printStackTrace();
          Log.e("Response", "Failed to send token to backend. Exception: " + e.getMessage());
        }
      }
    });

    thread.start();
  }



}
