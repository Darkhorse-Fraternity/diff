//
//  RCTToast.m
//  WhiteBoardRN
//
//  Created by 林通 on 5/20/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTToastIOS.h"
#import <UIKit/UIKit.h>
#import "UIWindow+LK.h"
#import <Toast/UIView+Toast.h>
@implementation RCTToastIOS

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(show:(NSString *)message withColor:(UIColor *)color duration:(CGFloat)interval) {

  [UIWindow showToastMessage:message withColor:color duration:interval];
}



- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
@end
