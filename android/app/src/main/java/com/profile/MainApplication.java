package com.profile;

import android.app.Application;
import android.content.Context;
import com.rnfs.RNFSPackage;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.reactnativevietnam.RNNetworkStatePackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactlibrary.RNSmtpMailerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.wix.RNCameraKit.RNCameraKitPackage;
import java.lang.reflect.InvocationTargetException;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.modules.i18nmanager.I18nUtil;
import java.util.List;
import java.util.Arrays;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {

         return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNNetworkStatePackage(),
            new NetInfoPackage(),
            new LinearGradientPackage(),
            new SafeAreaContextPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new RNSmtpMailerPackage(),
            new AsyncStoragePackage(),
            new RNCameraKitPackage(),
            new RNFSPackage());
            
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
    sharedI18nUtilInstance.allowRTL(getApplicationContext(), true);
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
