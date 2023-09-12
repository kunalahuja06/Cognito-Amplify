import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// AWS amplify config
import { Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
