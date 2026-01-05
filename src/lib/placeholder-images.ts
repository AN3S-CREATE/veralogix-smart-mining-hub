
import veralogixLogo from '@/assets/veralogix-logo.png';
import loginBackground from '@/assets/background.png';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: any; // Can be string or StaticImageData
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = [
    {
        id: 'login-logo',
        description: 'The main logo displayed on the login page.',
        imageUrl: veralogixLogo,
        imageHint: 'company logo'
    },
    {
        id: 'sidebar-logo',
        description: 'The Veralogix logo displayed in the main application sidebar.',
        imageUrl: veralogixLogo,
        imageHint: 'company logo'
    },
     {
        id: 'login-background',
        description: 'The background image for the login page.',
        imageUrl: loginBackground,
        imageHint: 'mining equipment'
    }
];
