import { SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerServerlessOptions: SwaggerCustomOptions = {
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',

  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
  ],

  customSiteTitle: 'GBS Backend API Docs',
};
