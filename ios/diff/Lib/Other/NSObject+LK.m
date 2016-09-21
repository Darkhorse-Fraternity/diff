//
//  NSObject+LK.m
//  Seeyou
//
//  Created by upin on 13-9-24.
//  Copyright (c) 2013年 linggan. All rights reserved.
//

#import "NSObject+LK.h"

@implementation NSObject (LK)
-(id)lkObjectFromJSONData
{
    NSData* data = (NSData*)self;
    if(data.length > 0)
    {
        NSError* error = nil;
        id object = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
        if(error)
        {
            NSLog(@"\n jsonData 解析出错 %@ \n",[error debugDescription]);
        }
        return object;
    }
    return nil;
}
-(id)lkObjectFromJSONString
{
    NSString* string = (NSString*)self;
    NSData* data = [string dataUsingEncoding:NSUTF8StringEncoding];
    return [data lkObjectFromJSONData];
}
-(id)objectFromJSONDataOrString
{
    if([self isKindOfClass:[NSData class]])
    {
        return [self lkObjectFromJSONData];
    }
    if([self isKindOfClass:[NSString class]])
    {
        return [self lkObjectFromJSONString];
    }
    return nil;
}
-(NSData *)dataFromJSONObject
{
    if([self isKindOfClass:[NSNull class]])
        return nil;
    
    if([NSJSONSerialization isValidJSONObject:self])
    {
        NSError* error = nil;
        NSData* data = [NSJSONSerialization dataWithJSONObject:self options:NSJSONWritingPrettyPrinted error:&error];
        if (error) {
            NSLog(@"\n object 转换 jsonData 出错: %@ \n",error.debugDescription);
        }
        return data;
    }
    return nil;
}
-(NSString *)stringFromJSONObject
{
    NSData* data = [self dataFromJSONObject];
    if(data.length > 0)
    {
        return [[NSString alloc]initWithData:data encoding:NSUTF8StringEncoding];
    }
    return nil;
}





-(BOOL)isNotEmpty{
    return !(self == nil
             || [self isKindOfClass:[NSNull class]]
             || ([self respondsToSelector:@selector(length)]
                 && [(NSData *)self length] == 0)
             || ([self respondsToSelector:@selector(count)]
                 && [(NSArray *)self count] == 0));
    
}

-(id)UIMutableCopy
{
    NSData * tempArchive = [NSKeyedArchiver archivedDataWithRootObject:self];
    return  [NSKeyedUnarchiver unarchiveObjectWithData:tempArchive];
}


//转URL
-(NSURL*)safe_URL
{
    NSURL * URL = nil;
    
    if ([self isKindOfClass:[NSString class]])
    {
        if([(NSString *)self hasPrefix:@"http"]||[(NSString *)self hasPrefix:@"ftp"])
        {
            NSString *sreUrl = [(NSString*)self stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
            URL = [NSURL URLWithString:sreUrl];
        }
        else
        {
            URL = [NSURL fileURLWithPath:(NSString *)self];
        }
    }else if ([self isKindOfClass:[NSURL class]]){
        URL = (NSURL *)self;
    }
    return URL;
}


@end
