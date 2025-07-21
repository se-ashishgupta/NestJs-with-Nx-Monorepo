import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const startTime = new Date();

    // Log request start
    console.log(
      'Request received',
      req.method,
      req.url,
      startTime.toISOString()
    );

    // Capture the original end method
    const originalEnd = res.end;

    // Override the end method to log the response
    res.end = function (chunk?: any, encoding?: any) {
      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();

      console.log(
        'Response sent',
        req.method,
        req.url,
        res.statusCode,
        `${duration}ms`,
        endTime.toISOString()
      );

      // Call the original end method
      originalEnd.call(this, chunk, encoding);
    };

    next();
  }
}
