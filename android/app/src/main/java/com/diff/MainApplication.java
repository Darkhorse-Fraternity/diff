package com.diff;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;
import android.util.Log;

import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;
import com.alibaba.baichuan.android.trade.AlibcTradeSDK;
import com.alibaba.baichuan.android.trade.callback.AlibcTradeInitCallback;
import com.alibaba.baichuan.android.trade.model.AlibcTaokeParams;
import com.avos.avoscloud.AVOSCloud;
import com.cmcewen.blurview.BlurViewPackage;
import com.facebook.react.ReactApplication;
import com.theweflex.react.WeChatPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.yamill.orientation.OrientationPackage;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.taobaobaichuanapi.BaiChuanPackage;

import java.util.Arrays;
import java.util.List;

import cn.reactnative.modules.update.UpdatePackage;
import io.liaoyuan.reactnative.leancloudpush.LeanCloudPushPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

//    @Override
//    protected String getJSBundleFile() {
//      return UpdateContext.getBundleUrl(MainApplication.this);
//    }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new WeChatPackage(),
                    new LeanCloudPushPackage(),
                    new BaiChuanPackage(),
                    new ReactNativeDialogsPackage(),
                    new BlurViewPackage(),
                    new OrientationPackage(),
                    new VectorIconsPackage(),
                    new RNDeviceInfo(),
                    new UpdatePackage(),
                    new ImagePickerPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }


    @Override
    public void onCreate() {
        super.onCreate();
        final Context mContext = this;
        new Runnable() {
            @Override
            public void run() {
                // put your logic here!
                // use the mContext instead of this here
                SoLoader.init(mContext, /* native exopackage */ false);
                // 初始化参数依次为 this, AppId, AppKey
                AVOSCloud.initialize(mContext, "XRPJYCFolp4c2RAcvyR9iOHN-gzGzoHsz",
                        "jaFau6aFf0nhWt4Ea4oYKBpd");

//        AlibcTradeSDK.setForceH5(TRUE);
                AlibcTradeSDK.asyncInit(mContext, new AlibcTradeInitCallback() {
                    @Override
                    public void onSuccess() {
                        //初始化成功，设置相关的全局配置参数
                        // ...
                        Log.d("1", "百川配置成功");
                        AlibcTaokeParams taokeParams = new AlibcTaokeParams("mm_48051893_0_0", "", "");
                        AlibcTradeSDK.setTaokeParams(taokeParams);
                        AlibcTradeSDK.setForceH5(true);
                    }

                    @Override
                    public void onFailure(int code, String msg) {
                        //初始化失败，可以根据code和msg判断失败原因，详情参见错误说明
                        Log.e("百川配置" + code, msg);
                    }
                });
            }
        }.run();


//        AlibabaAuth
    }
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }
}
