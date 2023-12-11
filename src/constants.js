export const BLOG_TITLE = 'Motion Book';

export const DARK_COLORS = {
    '--color-text-100': '#FFFCE1',
    '--color-text-200': '#BBBAA6',
    '--color-text-300': '#7C7C6F',
    '--color-surface-100': '#0E100F',
    '--color-surface-200': '#2C2D29',
    '--color-surface-300': '#42433D',
    '--color-accent': '#F100CB',
};

export const LIGHT_COLORS = {
    '--color-text-100': '#1C1C1C',
    '--color-text-200': '#93918F',
    '--color-text-300': '#8E8E85',
    '--color-surface-100': '#F8F6F5',
    '--color-surface-200': '#D5D5D3',
    '--color-surface-300': '#C0C1BD',
    '--color-accent': '#F100CB',
};

// Add in semantic / special colors

export const LIGHT_SHADOWS = {
    '--shadow-page': `
    0px 1px 2px hsl(50deg 60% 50% / 0.25),
    0px 3px 6px hsl(50deg 60% 50% / 0.25),
    0px 9px 18px hsl(50deg 60% 50% / 0.25),
    0px 18px 36px hsl(50deg 60% 50% / 0.25),
    0px 54px 108px hsl(50deg 60% 50% / 0.25)
  `,
    '--shadow-card': `
    0px 1px 2px hsl(50deg 20% 50% / 0.2),
    0px 2px 4px hsl(50deg 20% 50% / 0.2),
    0px 4px 8px hsl(50deg 20% 50% / 0.2),
    0px 8px 16px hsl(50deg 20% 50% / 0.2)
  `,
};
export const DARK_SHADOWS = {
    '--shadow-page': 'none',
    '--shadow-card': 'none',
};

export const LIGHT_TOKENS = {
    ...LIGHT_COLORS,
    ...LIGHT_SHADOWS,
};

export const DARK_TOKENS = {
    ...DARK_COLORS,
    ...DARK_SHADOWS,
};
