//
//  URLManager.m
//  rssreader
//
//  Created by zhuchao on 15/3/6.
//  Copyright (c) 2015年 zhuchao. All rights reserved.
//

#import "URLManager.h"
#import "NSString+EasyExtend.h"
@implementation URLManager

//建立单例
+ (instancetype )manager{
    static dispatch_once_t onceToken;
    static URLManager *_singleton = nil;
    dispatch_once(&onceToken,^{
        _singleton = [[super alloc] init];
    });
    return _singleton;
}

+(void)loadConfigFromPlist:(NSString *)plistPath{
    [URLManager manager].config = [NSMutableDictionary dictionaryWithContentsOfFile:plistPath];
}

+ (void)pushURLString:(NSString *)urlString animated:(BOOL)animated{
    UIViewController *viewController = [UIViewController initFromString:[urlString trim] fromConfig:[URLManager manager].config];
    [URLNavigation pushViewController:viewController animated:animated];
}

+ (void)pushURL:(NSURL *)url animated:(BOOL)animated{
    UIViewController *viewController = [UIViewController initFromURL:url fromConfig:[URLManager manager].config];
    [URLNavigation pushViewController:viewController animated:animated];
}

+ (void)pushURLString:(NSString *)urlString animated:(BOOL)animated replace:(BOOL)replace{
    UIViewController *viewController = [UIViewController initFromString:[urlString trim] fromConfig:[URLManager manager].config];
    [URLNavigation pushViewController:viewController animated:YES replace:replace];
}

+ (void)pushURL:(NSURL *)url animated:(BOOL)animated replace:(BOOL)replace{
    UIViewController *viewController = [UIViewController initFromURL:url fromConfig:[URLManager manager].config];
    [URLNavigation pushViewController:viewController animated:animated replace:replace];
}

+ (void)presentURLString:(NSString *)urlString animated:(BOOL)animated{
    UIViewController *viewController = [UIViewController initFromString:urlString fromConfig:[URLManager manager].config];
    [URLNavigation presentViewController:viewController animated:animated];
}

+ (void)presentURL:(NSURL *)url animated:(BOOL)animated{
    UIViewController *viewController = [UIViewController initFromURL:url fromConfig:[URLManager manager].config];
    [URLNavigation presentViewController:viewController animated:animated];
}

+ (void)presentURLString:(NSString *)urlString query:(NSDictionary *)query animated:(BOOL)animated{
    UIViewController *viewController = [UIViewController initFromString:urlString withQuery:query fromConfig:[URLManager manager].config];
    [URLNavigation presentViewController:viewController animated:animated];
}

+ (void)presentURL:(NSURL *)url query:(NSDictionary *)query animated:(BOOL)animated{
    UIViewController *viewController = [UIViewController initFromURL:url withQuery:query fromConfig:[URLManager manager].config];
    [URLNavigation presentViewController:viewController animated:animated];
}

+ (void)pushURL:(NSURL *)url query:(NSDictionary *)query animated:(BOOL)animated{
    UIViewController *viewController = [UIViewController initFromURL:url withQuery:query fromConfig:[URLManager manager].config];
    [URLNavigation pushViewController:viewController animated:animated];
}

+ (void)pushURL:(NSURL *)url query:(NSDictionary *)query animated:(BOOL)animated replace:(BOOL)replace{
    UIViewController *viewController = [UIViewController initFromURL:url withQuery:query fromConfig:[URLManager manager].config];
    [URLNavigation pushViewController:viewController animated:animated replace:replace];
}

+ (void)pushURLString:(NSString *)urlString query:(NSDictionary *)query animated:(BOOL)animated{
    UIViewController *viewController = [UIViewController initFromString:[urlString trim] withQuery:query fromConfig:[URLManager manager].config];
    [URLNavigation pushViewController:viewController animated:animated];
}

+ (void)pushURLString:(NSString *)urlString query:(NSDictionary *)query animated:(BOOL)animated replace:(BOOL)replace{
    UIViewController *viewController = [UIViewController initFromString:[urlString trim] withQuery:query fromConfig:[URLManager manager].config];
    [URLNavigation pushViewController:viewController animated:animated replace:replace];
}

+ (void)presentURL:(NSURL *)url animated:(BOOL)animated withNavigationClass:(Class)clazz{
    UIViewController *viewController = [UIViewController initFromURL:url fromConfig:[URLManager manager].config];
    UINavigationController *nav =  [[clazz alloc]initWithRootViewController:viewController];
    [URLNavigation presentViewController:nav animated:animated];
}

+ (void)presentURL:(NSURL *)url query:(NSDictionary *)query animated:(BOOL)animated withNavigationClass:(Class)clazz{
    UIViewController *viewController = [UIViewController initFromURL:url withQuery:query fromConfig:[URLManager manager].config];
    UINavigationController *nav =  [[clazz alloc]initWithRootViewController:viewController];
    [URLNavigation presentViewController:nav animated:animated];
}

+ (void)presentURLString:(NSString *)urlString animated:(BOOL)animated withNavigationClass:(Class)clazz{
    
    UIViewController *viewController = [UIViewController initFromString:urlString fromConfig:[URLManager manager].config];
    if ([clazz isSubclassOfClass:[UINavigationController class]]) {
        UINavigationController *nav =  [[clazz alloc]initWithRootViewController:viewController];
        [URLNavigation presentViewController:nav animated:animated];
    }
}

+ (void)presentURLString:(NSString *)urlString query:(NSDictionary *)query animated:(BOOL)animated withNavigationClass:(Class)clazz{
    UIViewController *viewController = [UIViewController initFromString:urlString withQuery:query fromConfig:[URLManager manager].config];
    if ([clazz isSubclassOfClass:[UINavigationController class]]) {
        UINavigationController *nav =  [[clazz alloc]initWithRootViewController:viewController];
        [URLNavigation presentViewController:nav animated:animated];
    }
}
@end