//
//  RCTURLManager.m
//  WhiteBoardRN
//
//  Created by 傅浪 on 16/5/17.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ExportURLManager.h"
#import "URLManager.h"
//#import "UIDevice+BFKit.h"

@implementation ExportURLManager
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(presentURL:(NSURL *)url animated:(BOOL)animated) {
  [URLManager presentURL:url animated:animated];
}

RCT_EXPORT_METHOD(presentURLString:(NSString *)urlString animated:(BOOL)animated) {
  [URLManager presentURLString:urlString animated:animated];
}

RCT_EXPORT_METHOD(presentURLString:(NSString *)urlString query:(NSDictionary *)query animated:(BOOL)animated) {
  [URLManager presentURLString:urlString query:query animated:animated];
}

RCT_EXPORT_METHOD(regiteNetworkConfig:(NSDictionary *)userInfo) {
  
//  LoginEntity *loginEntity = [LoginEntity shareManager];
//  loginEntity.user_token = userInfo[@"user_token"];
//  loginEntity.user.name = userInfo[@"nickName"];
//  loginEntity.user.uid = userInfo[@"uid"];
//  loginEntity.user.head_pic = userInfo[@"headimg"];
  
//  [Action actionConfigHost:Dayi_URLHost client:@"" codeKey:Net_Tag rightCode:1 msgKey:@"msg"];
  
//  NSMutableDictionary *param = [NSMutableDictionary dictionary];
//  [param setValue:userInfo[@"user_token"] forKey:@"user_token"];
//  [param setValue:@"student"forKey:@"category"];
//  [param setValue:DY_APP forKey:@"appid"];
////  [param setValue:[UIDevice devicePlatformString] forKey:@"device_info"];
//  NSString* version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"];
//  [param setValue:version forKey:@"version_code"];
//  //用于企业版审核使用。
//  NSString *bundleIdentifier =[NSString stringWithFormat:@"%@_%@",[[[NSBundle mainBundle] infoDictionary] valueForKey:@"CFBundleVersion"],[[NSBundle mainBundle] bundleIdentifier]];
//  [param setValue:bundleIdentifier forKey:@"bundleIdentifier"];
//  [Request RequestConfigWithParams:param];
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
@end
