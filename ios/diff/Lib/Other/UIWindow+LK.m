//
//  UIWindow+LK.m
//  SeeYouV2
//
//  Created by upin on 13-7-2.
//  Copyright (c) 2013年 灵感方舟. All rights reserved.
//

#import "UIWindow+LK.h"
#import <QuartzCore/QuartzCore.h>
#import <Toast/UIView+Toast.h>

@interface LKLaunchController:UIViewController
-(void)setLaunchImage:(UIImage*)img;

@property(strong,nonatomic)UIViewController* rootViewController;
@property(strong,nonatomic)UIWindow* window;
@end

@implementation LKLaunchController
-(void)setLaunchImage:(UIImage *)img
{
    UIImageView* iv =  (UIImageView*)self.view;
    iv.image = img;
    
    CATransition *transition = [CATransition animation];
    transition.duration = 0.8f;
    transition.type = kCATransitionFade;
    [iv.layer addAnimation:transition forKey:nil];
}
-(void)loadView
{
    UIImageView* imgview = [[UIImageView alloc]initWithFrame:CGRectZero];
    
    NSString* launchname=nil;
    CGRect srect = [UIScreen mainScreen].bounds;
    if(srect.size.height >= 568)
    {
        launchname = @"Default-568h@2x";
    }
    else if([UIScreen mainScreen].scale >=2)
    {
        launchname = @"Default@2x";
    }
    else
    {
        launchname = @"Default";
    }
    NSString* filepath = [[NSBundle mainBundle] pathForResource:launchname ofType:@"png"];
    imgview.image = [UIImage imageWithContentsOfFile:filepath];
    self.view = imgview;
}
//-(void)viewDidLoad
//{
//    [super viewDidLoad];
//    NSString* modelPath = [NSFileManager pathForPublicFile:@"splash-screen.plist" inDir:@"splash-screen"];
//    NSDictionary* dic = [NSDictionary dictionaryWithContentsOfFile:modelPath];
//    
//    //下载新的闪屏
//    [LKLaunchController startDownloadSplashScreenInfo];
//    
//    
//    if(dic == nil)
//    {
//        [self showRootViewController:0.5];
//        return;
//    }
//    
//    //判断要显示的时间是否过期
//    NSString* utcDate = [dic safeObjectForKey:@"expiration"];
//    NSDateFormatter* formatter = [NSDateFormatter getDateTimeFormatter];
//    NSDate* expirationDate = [formatter dateFromString:utcDate];
//    if( expirationDate == nil || [[NSDate date] compare:expirationDate] == NSOrderedDescending)
//    {
//        [self showRootViewController:0.5];
//        return;
//    }
//    
//    NSString* imageUrl = [dic safeObjectForKey:@"image_url"];
//    NSUInteger hash = [imageUrl hash];
//    NSString* imagePath = [NSFileManager pathForPublicFile:[NSString stringWithFormat:@"%u",hash] inDir:@"splash-screen"];
//    UIImage* splashImage = [UIImage imageWithContentsOfFile:imagePath];
//    if(splashImage)
//    {
//        UIImage* drawImage = [UIImage decodedImageWithImage:splashImage];
//        [self setLaunchImage:drawImage];
//        
//        float duration = [[dic safeObjectForKey:@"duration_of_presentation"] floatValue];
//        duration = MAX(0, MIN(duration, 10));
//        
//        [self showRootViewController:duration];
//    }
//    else{
//        [self showRootViewController:0.5];
//    }
//    
//}
//
//+(void)startDownloadSplashScreenInfo
//{
//    NSString* resolution = [NSString stringWithFormat:@"%.0f,%.0f",[UIScreen mainScreen].bounds.size.width,[UIScreen mainScreen].bounds.size.height];
//    NSDictionary* pars = @{@"resolution":resolution,@"scale":@([UIScreen mainScreen].scale),@"package_id":[SYPublicFun channelID]};
//    [SYBBSClient getPath:@"splash-screen" customHost:data_seeyouyima_com params:pars headers:nil success:^(AFHTTPRequestOperation *operation, NSData *responseData) {
//        
//        NSDictionary* splashInfo = [NSData dictionaryWithJSONData:responseData];
//        if(splashInfo.count>0)
//        {
//            //先保存为 new-plist 直到图片下载完成 才更名为正式
//            NSString* newPath = [NSFileManager pathForPublicFile:@"splash-screen-new.plist" inDir:@"splash-screen"];
//            [splashInfo writeToFile:newPath atomically:YES];
//            
//            
//            NSString* imageUrl = [splashInfo safeObjectForKey:@"image_url"];
//            if(imageUrl.isNotEmptyString)
//            {
//                //用imageURL hash值 来做图片名 保证不重复下载
//                NSUInteger hash = [imageUrl hash];
//                NSString* imagePath = [NSFileManager pathForPublicFile:[NSString stringWithFormat:@"%u",hash] inDir:@"splash-screen"];
//                if([NSFileManager isFileExists:imagePath] == NO)
//                {
//                    [LKLaunchController imageDownloadWithURL:imageUrl toPath:imagePath];
//                }
//                else{
//                    [LKLaunchController imageDownloadFinished];
//                }
//            }
//            
//        }else{
//            NSString* mainPath = [NSFileManager pathForPublicFile:@"splash-screen.plist" inDir:@"splash-screen"];
//            [[NSFileManager defaultManager] removeItemAtPath:mainPath error:nil];
//        }
//        
//    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
//        
//        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(10 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//            [LKLaunchController startDownloadSplashScreenInfo];
//        });
//        
//    }];
//}
//+(void)imageDownloadWithURL:(NSString*)imageURL toPath:(NSString*)imagePath
//{
//    NSString* copyImageURL = [imageURL copy];
//    NSString* copyImagePath = [imagePath copy];
//    [[SDWebImageDownloader sharedDownloader] downloadImageWithURL:[NSURL URLWithString:copyImageURL] options:SDWebImageDownloaderContinueInBackground progress:nil completed:^(UIImage *image, NSData *data, NSError *error, BOOL finished) {
//        
//        if(image && data)
//        {
//            if([data writeToFile:copyImagePath atomically:YES])
//            {
//                [LKLaunchController imageDownloadFinished];
//            }
//            
//        }else{
//            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//                [LKLaunchController imageDownloadWithURL:copyImageURL toPath:copyImagePath];
//            });
//        }
//        
//    }];
//}
/*
+(void)imageDownloadFinished
{
    NSFileManager* filemanager = [NSFileManager defaultManager];
    
    NSString* mainPath = [NSFileManager pathForPublicFile:@"splash-screen.plist" inDir:@"splash-screen"];
    NSString* newPath = [NSFileManager pathForPublicFile:@"splash-screen-new.plist" inDir:@"splash-screen"];
    
    [filemanager removeItemAtPath:mainPath error:nil];
    [filemanager moveItemAtPath:newPath toPath:mainPath error:nil];
}
*/
-(void)showRootViewController:(double)delayInSeconds
{
    NSLog(@"will start show root viewController");
    UIViewController* root = _rootViewController;
    UIWindow* window = _window;
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayInSeconds * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        
        [[UIApplication sharedApplication] setStatusBarHidden:NO];
        [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent];
        [[UIApplication sharedApplication] setStatusBarOrientation:UIInterfaceOrientationPortrait];
        
        window.rootViewController = root;
        NSLog(@"start show root viewController");
        
        CATransition *transition = [CATransition animation];
        transition.duration = 0.8f;
        transition.type = kCATransitionFade;
        [window.layer addAnimation:transition forKey:nil];
    });
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations
{
    return UIInterfaceOrientationMaskPortrait;
}
- (BOOL)shouldAutorotate
{
    return NO;
}
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return interfaceOrientation == UIInterfaceOrientationPortrait;
}
@end

@implementation UIWindow (LK)
///是否有键盘弹起来的gridview
- (BOOL)findSubviewIsGridCell
{
    for (UIView* subview in self.subviews)
    {
        if([subview isKindOfClass:NSClassFromString(@"UIPeripheralHostView")])
        {
            return [UIWindow findSubviewIsGridCell:subview];
        }
    }
    return NO;
}
///是否有键盘弹起来的gridview
+ (BOOL)findSubviewIsGridCell:(UIView*)view
{
    for (UIView* subview in view.subviews)
    {

        if([subview isKindOfClass:NSClassFromString(@"UIKeyboardCandidateBarShadowView")])
        {
            return YES;
        }
        if([self findSubviewIsGridCell:subview])
        {
            return YES;
        }
    }
    return NO;
}

+(UIWindow*)getShowWindow
{
    UIWindow *window = nil;
    NSArray *windows = [UIApplication sharedApplication].windows;
    for (UIWindow *uiWindow in windows)
    {
        //有inputView或者键盘时，避免提示被挡住，应该选择这个 UITextEffectsWindow 来显示
        if ([NSStringFromClass(uiWindow.class) isEqualToString:@"UITextEffectsWindow"])
        {
            window = uiWindow;
            break;
        }
    }
    if (!window)
    {
        window = [[UIApplication sharedApplication] keyWindow];
    }
    return window;
}

+(UILabel*)labelWithText:(NSString*)text
{
    UILabel* lb = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 250, 0)];
    lb.font = [UIFont systemFontOfSize:16];
    lb.textColor = [UIColor whiteColor];
    lb.backgroundColor = [UIColor clearColor];
    lb.text = text;
    [lb sizeToFit];
    return lb;
}


- (void)removeKeyboardShadow
{
    NSEnumerator* enumerator = [UIApplication sharedApplication].windows.reverseObjectEnumerator;
    for (UIWindow *window in enumerator) {
        if (![window.class isEqual:[UIWindow class]]) {
            for (UIView *view in window.subviews) {
                if (strcmp("UIPeripheralHostView", object_getClassName(view)) == 0) {
                    UIView *shadowView = view.subviews[0];
                    if ([shadowView isKindOfClass:[UIImageView class]]) {
                        shadowView.hidden = YES;
                        return;
                    }
                }
            }
        }
    }
}


static __weak UIView *lastToast = nil;

+(void)showToastCircleMessage:(NSString*)message subMes:(NSString*)subMes
{
    UIWindow *window = [self getShowWindow];
    float duration = (float)message.length*0.08 + 0.3;
    
    UILabel* row1 = nil,*row2 = nil;
    
    if(message)
        row1 = [self labelWithText:message];
    if(subMes)
        row2 = [self labelWithText:subMes];
    
    float width = MAX(row1.frame.size.width, row2.frame.size.width);
    if(width == 0)
        return;
    
    float height = row1.frame.size.height + row2.frame.size.height;
    if(row1 && row2)
    {
        height +=2;
    }
    
    float diameter = sqrtf(width*width + height*height) + 10;
    
    CAShapeLayer* layer = [[CAShapeLayer alloc]init];
    
    CGPathRef pathRef = CGPathCreateWithEllipseInRect(CGRectMake(0, 0, diameter, diameter), NULL);
    layer.path = pathRef;
    CGPathRelease(pathRef);
    
    layer.fillColor = [UIColor colorWithWhite:0 alpha:0.5].CGColor;
    
    if (lastToast)
    {
        [lastToast removeFromSuperview];
        lastToast = nil;
    }
    __block UIView* showView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, diameter, diameter)];
    lastToast = showView;
    [showView.layer addSublayer:layer];
    
    showView.center = CGPointMake(window.frame.size.width/2, window.frame.size.height/2);
    showView.alpha = 0;
    [window addSubview:showView];
    
//    row1.origin = CGPointMake((diameter-row1.width)/2,(diameter - height )/2);
//    row2.origin = CGPointMake((diameter-row2.width)/2, (row1?(row1.bottom + 2):(diameter - height )/2));
    
    [showView addSubview:row1];
    [showView addSubview:row2];
    
    [UIView animateWithDuration:0.2 animations:^{
        showView.alpha = 1;
    } completion:^(BOOL finished) {
        
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(MIN(MAX(1, duration), 3) * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [UIView animateWithDuration:0.2 animations:^{
                showView.alpha = 0;
            } completion:^(BOOL finished) {
                [showView removeFromSuperview];
                showView = nil;
            }];
        });
    }];
}
+(void)showToastMessage:(NSString *)message
{
    [self showToastMessage:message withColor:nil];
}

+(void)showToastMessage:(NSString *)message withColor:(UIColor *)color
{
    UIWindow *window = [self getShowWindow];
    float duration = (float)message.length*0.08 + 0.3;
    [window makeToast:message  duration:MIN(MAX(1, duration), 3) position:@"CSToastPositionCenter"];
    
}
+(void)showToastMessage:(NSString *)message withColor:(UIColor *)color duration:(CGFloat)interval
{
    UIWindow *window = [self getShowWindow];
    float duration = (interval>0)?interval:1.5f;
    [window makeToast:message  duration:MIN(MAX(1, duration), 3) position:@"CSToastPositionCenter"];
}

-(void)startLaunchForRootController:(UIViewController *)rootController
{
    LKLaunchController* launch = [[LKLaunchController alloc]init];
    launch.rootViewController = rootController;
    launch.window = self;
    
    self.rootViewController = launch;
    [self makeKeyAndVisible];
}
@end
