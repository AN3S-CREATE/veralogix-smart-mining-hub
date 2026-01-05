
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
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaAAAABDCAMAAADF/2omAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAAB/f3+AgIAAAAD/AAAA/wD/AP8AAAD+a2c2AAAAAnRSTlMAAQGU/a4AAAAJcEhZcwAADsMAAA7DAcdvqGQAAARoSURBVHja7Z1JrqwgEIbBJET0/k+8fQxIu04gLclg2M9VlTzBqDU1VX/vA/1P/j97gT9oA/1PGyB+wgY4AMcGG8AAYkP4BDYg/P8gD4g92AC5gTrYACtANtggpQHbYAvgBNkgrQE2gA2YIM0Bt8AGyCAtAbfBBsggzQG3wAY4IUEB2GBr4AQJDWCDbYALkhZgA2yBD5IWYAfcgAtJG2AD3AAbpDTAEthgA+SEtAF2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2yB9gf8/+cGPW/jAAAAAElFTkSuQmCC',
        imageHint: 'company logo',
        width: 420,
        height: 69
    },
    {
        id: 'sidebar-logo',
        description: 'The Veralogix logo displayed in the main application sidebar.',
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaAAAABDCAMAAADF/2omAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAAB/f3+AgIAAAAD/AAAA/wD/AP8AAAD+a2c2AAAAAnRSTlMAAQGU/a4AAAAJcEhZcwAADsMAAA7DAcdvqGQAAARoSURBVHja7Z1JrqwgEIbBJET0/k+8fQxIu04gLclg2M9VlTzBqDU1VX/vA/1P/j97gT9oA/1PGyB+wgY4AMcGG8AAYkP4BDYg/P8gD4g92AC5gTrYACtANtggpQHbYAvgBNkgrQE2gA2YIM0Bt8AGyCAtAbfBBsggzQG3wAY4IUEB2GBr4AQJDWCDbYALkhZgA2yBD5IWYAfcgAtJG2AD3AAbpDTAEthgA+SEtAF2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2wATbABmkNsAE2wAZpDbABNsAGaQ2-x-ewAuiYv8eQAAAABJRU5ErkJggg==',
        imageHint: 'company logo',
        width: 192,
        height: 31,
    },
     {
        id: 'login-background',
        description: 'A background image of professional mining equipment.',
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        imageHint: 'mining equipment'
    }
];
