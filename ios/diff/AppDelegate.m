/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "Orientation.h"
#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "RCTHotUpdate.h"
#import "../Libraries/LinkingIOS/RCTLinkingManager.h"
#import <KSCrash/KSCrashInstallationStandard.h>
#import <AlibcTradeSDK/AlibcTradeSDK.h>
//#import "RCTLinkingManager.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  
#if DEBUG
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
#else
  jsCodeLocation=[RCTHotUpdate bundleURL];
#endif
  


  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"diff"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  
  //crash
  KSCrashInstallationStandard* installation = [KSCrashInstallationStandard sharedInstance];
  installation.url = [NSURL URLWithString:@"https://collector.bughd.com/kscrash?key=172342e117bb9342b289336f0ffe6819"];
  [installation install];
  [installation sendAllReportsWithCompletion:nil];
  
   [self aliBaichuanStart];
  return YES;
}


-(void)aliBaichuanStart
{
  
  // 百川平台基础SDK初始化，加载并初始化各个业务能力插件
  [[AlibcTradeSDK sharedInstance] asyncInitWithSuccess:^{
    NSLog(@"阿里百川配置成功");
  } failure:^(NSError *error) {
    NSLog(@"Init failed: %@", error.description);
  }];
  
  // 开发阶段打开日志开关，方便排查错误信息
  //默认调试模式打开日志,release关闭,可以不调用下面的函数
  //  [[AlibcTradeSDK sharedInstance] setDebugLogOpen:DEBUG];
  
  // 配置全局的淘客参数
  //如果没有阿里妈妈的淘客账号,setTaokeParams函数需要调用
  AlibcTradeTaokeParams *taokeParams = [[AlibcTradeTaokeParams alloc] init];
  taokeParams.pid = @"mm_48051893_0_0"; //mm_XXXXX为你自己申请的阿里妈妈淘客pid
  [[AlibcTradeSDK sharedInstance] setTaokeParams:taokeParams];
  
  //设置全局的app标识，在电商模块里等同于isv_code
  //没有申请过isv_code的接入方,默认不需要调用该函数
  //  [[AlibcTradeSDK sharedInstance] setISVCode:@"your_isv_code"];
  
  // 设置全局配置，是否强制使用h5
  [[AlibcTradeSDK sharedInstance] setIsForceH5:YES];
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

//- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString*, id> *)options
//{
//  return false;
//}
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  
  BOOL isHandled = [[AlibcTradeSDK sharedInstance] handleOpenURL:url]; // 如果百川处理过会返回YES
  if (!isHandled) {
    // 其他处理逻辑
  }
  
  
  return isHandled && [RCTLinkingManager application:application openURL:url
                                   sourceApplication:sourceApplication annotation:annotation];
}

@end
