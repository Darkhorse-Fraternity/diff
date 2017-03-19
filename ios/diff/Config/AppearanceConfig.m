//
//  AppearConfig.m
//  WhiteBoardRN
//
//  Created by 傅浪 on 16/7/14.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "AppearanceConfig.h"
#import <UIKit/UIKit.h>
#import "HexColors.h"
@implementation AppearanceConfig
+ (void)appearanceConfig {
  UIColor *MainColor = [UIColor hx_colorWithHexRGBAString:@"#ea6047"];
  UIColor *subColor = [UIColor hx_colorWithHexRGBAString:@"ffffff"];
  [[UIWindow appearance]setTintColor:MainColor];
  
  [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDefault];
  
  //UINavigationBar
  [[UINavigationBar appearance] setBarTintColor:  MainColor];
  [[UINavigationBar appearance] setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:subColor, NSForegroundColorAttributeName, [UIFont boldSystemFontOfSize:17.],NSFontAttributeName,nil]];
  [[UINavigationBar appearance] setTintColor:subColor];
  
  //    UIImage *navgationShadow = [UIImage imageWithColor:[UIColor redColor] size:CGSizeMake(100, 1)];
  //    [[UINavigationBar appearance] setShadowImage:navgationShadow];
  //    UIImage *navgationBg = [UIImage imageWithColor:[UIColor clearColor]];
  //    [[UINavigationBar appearance]setBackgroundImage:navgationBg forBarMetrics:UIBarMetricsDefault];
  
  //UITabBar
  [[UITabBar appearance]setBarTintColor:[UIColor whiteColor] ];
  
  
  //UIButton
  [[UIButton appearance]setBackgroundColor:[UIColor redColor]];
  [[UIButton appearance]setTintColor:MainColor ];
  [[UIButton appearanceWhenContainedIn:[UINavigationBar class], nil] setTintColor:MainColor];
  [[UIButton appearanceWhenContainedIn:[UINavigationBar class], nil] setBackgroundColor:[UIColor clearColor]];
  [[UIButton appearanceWhenContainedIn:[UISearchBar class], nil] setTintColor:MainColor];
  [[UIButton appearanceWhenContainedIn:[UISearchBar class], nil] setBackgroundColor:[UIColor clearColor]];
  
  
  
  //UIBarButtonItem
  [[UIBarButtonItem appearance] setTintColor:MainColor];
  [[UIBarButtonItem appearanceWhenContainedIn:[UISearchBar class], nil] setTintColor:MainColor];
  [[UIBarButtonItem appearanceWhenContainedIn:[UINavigationBar class], nil] setTintColor:MainColor];
  [[UIBarButtonItem appearanceWhenContainedIn:[UIToolbar class], nil] setTintColor:MainColor];
  
  
  //UIProgressView
  [[UIProgressView appearance]setTintColor:MainColor];
  
  
  //UIPageControl
  [[UIPageControl appearance]setCurrentPageIndicatorTintColor:MainColor];
  [[UIPageControl appearance]setPageIndicatorTintColor:[UIColor whiteColor]];
  
  //SearchBar
  [[UISearchBar appearance]setTintColor:MainColor];
  
  //UISegmentedControl
  [[UISegmentedControl appearance]setTintColor:MainColor];
  
  
  //UISlider
  [[UISlider appearance]setTintColor:MainColor];
  
  //UISwitch
  [[UISwitch appearance]setTintColor:[UIColor hx_colorWithHexRGBAString:@"#262324"]];
  [[UISwitch appearance]setOnTintColor:MainColor];
  
  //UITabBar
  [[UITabBar appearance]setTintColor:MainColor];
  //UIToolbar
  [[UIToolbar appearance]setTintColor:MainColor];
  
  
 
}
@end
