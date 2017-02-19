//
//  React_Native_Taobao_Baichuan_Api.m
//  React-Native-Taobao-Baichuan-Api
//
//  Created by Xie, Wang on 10/28/16.
//  Copyright © 2016 Xie, Wang. All rights reserved.
//

#import "React_Native_Taobao_Baichuan_Api.h"
#import <UIKit/UIWebView.h>
#import "AppDelegate.h"

@implementation React_Native_Taobao_Baichuan_Api


RCT_EXPORT_MODULE(React_Native_Taobao_Baichuan_Api);


RCT_EXPORT_METHOD(jump:(NSString *)itemId)
{
  
  [self itemDatailPageWithItem: itemId];
  
}
RCT_EXPORT_METHOD(present:(NSString *)url)
{
  
  [self itemDetailPageWithURL: url];
  
}
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

-(void)itemDatailPageWithItem:(NSString *)item{
  NSString *itemID = item;
  id<AlibcTradePage> page = [AlibcTradePageFactory itemDetailPage: itemID];
  [self itemDetailPage:page];
}

-(void)itemDetailPageWithURL:(NSString *)url {
  id<AlibcTradePage> page = [AlibcTradePageFactory page: url];
  [self itemDetailPage:page];
}

-(void)itemDetailPage: (id) page{
  
  //淘客信息
  AlibcTradeTaokeParams *taoKeParams=[[AlibcTradeTaokeParams alloc] init];
  taoKeParams.pid= nil;
  //打开方式
  AlibcTradeShowParams* showParam = [[AlibcTradeShowParams alloc] init];
  showParam.openType = ALiOpenTypeAuto;
  showParam.isNeedPush = NO;
  
  //UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
  AppDelegate *share = (AppDelegate *)[UIApplication sharedApplication].delegate;
  UINavigationController *nav = (UINavigationController *) share.window.rootViewController;
  
  NSInteger ret = [[AlibcTradeSDK sharedInstance].tradeService
                   show: nav
                   page: page
                   showParams: showParam
                   taoKeParams: taoKeParams
                   trackParam:@{@"uid":@"13859102336"}
                   tradeProcessSuccessCallback:^(AlibcTradeResult * __nullable result) {
                     NSLog(@"%@", result);
                   }
                   tradeProcessFailedCallback:^(NSError * __nullable error) {
                     NSLog(@"%@", error);
                   }
                   ];
  //返回1,说明h5打开,否则不应该展示页面
  if (ret == 1) {
    //        [self.navigationController pushViewController:view animated:YES];
  }
  return ;
}


@end
