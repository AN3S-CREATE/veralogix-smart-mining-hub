
export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = [
    {
        id: 'login-logo',
        description: 'The main logo displayed on the login page.',
        imageUrl: '/logo-placeholder.png',
        imageHint: 'company logo'
    },
    {
        id: 'sidebar-logo',
        description: 'The Veralogix logo displayed in the main application sidebar.',
        imageUrl: '/veralogix-logo.png',
        imageHint: 'company logo'
    },
     {
        id: 'login-background',
        description: 'The background image for the login page.',
        imageUrl: '/background.png',
        imageHint: 'mining equipment'
    }
];
