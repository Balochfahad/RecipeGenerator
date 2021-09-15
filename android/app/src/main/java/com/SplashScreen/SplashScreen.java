
/**
 * Created by Pir Shukarullah Shah on 5/11/17.
 */
package com.SplashScreen;

import android.app.Activity;
import android.app.Dialog;

import com.rich.RecipeGenerator.R;

import java.lang.ref.WeakReference;

public class SplashScreen {
    private static Dialog mSplashDialog;
    private static WeakReference<Activity> mActivity;

    private static void show(final Activity activity,final boolean fullScreen) {
        if (activity == null) return;
        mActivity = new WeakReference<Activity>(activity);
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!activity.isFinishing()) {

                    mSplashDialog = new Dialog(activity, R.style.SplashTheme);
                    mSplashDialog.setCancelable(false);

                    if (!mSplashDialog.isShowing()) {
                        mSplashDialog.show();
                    }
                }
            }
        });
    }

    public static void show(final Activity activity) {
        show(activity,false);
    }

    public static void hide(Activity activity) {
        if (activity == null) activity = mActivity.get();
        if (activity == null) return;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mSplashDialog != null && mSplashDialog.isShowing()) {
                    mSplashDialog.dismiss();
                }
            }
        });
    }
}
