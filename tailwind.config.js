/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        HOME_PATTERN: "url('/images/home-bg.png')",
        HEADER_PATTERN: "url('/images/header-bg.png')",
        FOOTER_PATTERN: "url('/images/footer-shape.svg')",
        AUTH_BTN_PATTERN: "url('/images/auth-btn-bg.png')",
      },
      fontFamily: {
        'caushan-script': ['Caushan Script"', 'cursive'],
      },
      dropShadow: {
        INNER_SHADOW: '0 0px 3px rgba(0, 0, 0, 0.3)',
        OUTER_SHADOW: '0 8px 20px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        OUTLINE: '#807667',
        ON_SURFACE: '#564A36',
        ON_SURFACE_VAR: '#6D5E46',
        OUTLINE_VAR: '#BFA98D',
        OUTLINE_VAR_HIGH: '#5C4D3D',
        ON_PRIM_CONTAINER: '#FFE9C2',
        PRIM: '#7A590C',
        ON_PRIM: '#FFFDFA',
        ON_SURFACE_VAR_LOW: '#A1845E',
        PRIM_CONTAINER: '#665A3D',
        SURFACE_CONTAINER: '#F8ECDF',
        TERTIARY: '#4C6545',
        ERROR: '#BA1A1A',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate', 'tailwind-clip-path')],
};
