
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
        imageUrl: 'https://picsum.photos/seed/veralogix-logo/420/69',
        imageHint: 'company logo',
        width: 420,
        height: 69
    },
    {
        id: 'sidebar-logo',
        description: 'The Veralogix logo displayed in the main application sidebar.',
        imageUrl: 'https://picsum.photos/seed/sidebar-logo/192/31',
        imageHint: 'company logo',
        width: 192,
        height: 31,
    },
     {
        id: 'login-background',
        description: 'A background image of professional mining equipment.',
        imageUrl: 'https://picsum.photos/seed/mining-background/1920/1080',
        imageHint: 'mining equipment'
    }
];
