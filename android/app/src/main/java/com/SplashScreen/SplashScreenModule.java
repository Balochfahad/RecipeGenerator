package com.SplashScreen;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by shukarullah on 5/12/17.
 */

public class SplashScreenModule extends ReactContextBaseJavaModule {
    public SplashScreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SplashScreen";
    }

    @ReactMethod
    public void show() {
        SplashScreen.show(getCurrentActivity());
    }


    @ReactMethod
    public void hide() {
        SplashScreen.hide(getCurrentActivity());
    }
}
