//
//  NSObject+LK.h
//  Seeyou
//
//  Created by upin on 13-9-24.
//  Copyright (c) 2013年 linggan. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSObject (LK)

-(id)objectFromJSONDataOrString;

-(NSData*)dataFromJSONObject;
-(NSString*)stringFromJSONObject;

-(BOOL)isNotEmpty;
-(NSURL*)safe_URL;


-(id)UIMutableCopy;//<用于UI类的mutableCopy

@end
