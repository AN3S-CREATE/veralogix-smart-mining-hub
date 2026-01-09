// =================================================================
// CRITICAL - DO NOT MODIFY
// =================================================================
// This file contains approved, production branding assets.
// The image paths are final and have been explicitly approved.
// Do not change these paths or replace them with placeholders.
// Modifying this file will break critical branding.
// =================================================================

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
        imageUrl: '/veralogix-logo.png',
        imageHint: 'company logo',
        width: 420,
        height: 69
    },
    {
        id: 'sidebar-logo',
        description: 'The Veralogix logo displayed in the main application sidebar.',
        imageUrl: '/veralogix-logo.png',
        imageHint: 'company logo',
        width: 192,
        height: 31,
    },
     {
        id: 'login-background',
        description: 'A background image of professional mining equipment.',
        imageUrl: '/background.png',
        imageHint: 'mining equipment'
    }
];
