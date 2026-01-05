
export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  width?: number;
  height?: number;
};

export const PlaceHolderImages: ImagePlaceholder[] = [
    {
        id: 'login-logo',
        description: 'The main logo displayed on the login page.',
        imageUrl: 'https://picsum.photos/seed/veralogix-logo/240/60',
        imageHint: 'company logo',
        width: 240,
        height: 60,
    },
    {
        id: 'sidebar-logo',
        description: 'The Veralogix logo displayed in the main application sidebar.',
        imageUrl: 'https://picsum.photos/seed/sidebar-logo/192/40',
        imageHint: 'company logo',
        width: 192,
        height: 40,
    },
     {
        id: 'login-background',
        description: 'The background image for the login page.',
        imageUrl: 'https://picsum.photos/seed/login-bg/1920/1080',
        imageHint: 'mining equipment'
    }
];
