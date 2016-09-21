//
//  UIWindow+LK.h
//  SeeYouV2
//
//  Created by upin on 13-7-2.
//  Copyright (c) 2013年 灵感方舟. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIWindow (LK)
+ (UIWindow *)getShowWindow;

- (void)removeKeyboardShadow;

+ (void)showToastCircleMessage:(NSString *)message subMes:(NSString *)subMes;

+ (void)showToastMessage:(NSString *)message;

/**
*   土司显示信息
*   @param  message 显示的信息
*   @param  color   文字颜色
*   @param interval 显示时间
*/
+ (void)showToastMessage:(NSString *)message withColor:(UIColor *)color;
+ (void)showToastMessage:(NSString *)message withColor:(UIColor *)color duration:(CGFloat)interval;

- (void)startLaunchForRootController:(UIViewController *)rootController;

///是否有键盘弹起来的gridview
- (BOOL)findSubviewIsGridCell;
@end
