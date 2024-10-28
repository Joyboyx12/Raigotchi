import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		screens: {
			'xs':'540px',
			// => @media (min-width: 540px) { ... }
			'sm': '640px',
			// => @media (min-width: 640px) { ... }
	  
			'md': '768px',
			// => @media (min-width: 768px) { ... }
	  
			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }
	  
			'xl': '1366px',
			// => @media (min-width: 1280px) { ... }
	  
			'2xl': '1920px',
			// => @media (min-width: 1536px) { ... }
		  },
  		backgroundImage: {
			'bottom-frame': "url('/Bottom_Frame.png')",
			'top-frame': "url('/Top_Frame.png')",
			'bg': "url('/BG.png')",
			'pet-bg': "url('/Pet_Background.png')",
			'shop-tab': "url('/Shop_Tab.png')",
			'shop-tab-full': "url('/Shop_Tab_Full.png')",
			'pet_swap_header':"url('/Pet_swap_Header.png')",
			'pet_swap_tab':"url('/Pet_swap_Tab.png')",
			'pet_swap_box_1':"url('/Swap_Box_1.png')",
			'pet_swap_box_2':"url('/Swap_Box_2.png')",
			'pet_swap_box_4':"url('/Swap_Box_4.png')",

			'battle_header':"url('/Battle_Header.png')",
			'battle_bg':"url('/Battle_BG.png')",
			'battle_pet_infor':"url('/Battle_Pet_Infor.png')",
			'battle_log_tab':"url('/Battle_Log_Tab.png')",
			'battle_win':"url('/Battle_Win.png')",
			'battle_lost':"url('/Battle_Lost.png')",
			'battle_draw':"url('/Battle_Draw.png')",
			'mint_coin_tab':"url('/Mint_Coin_Tab.png')",
			'mint_big_tab':"url('/Mint_Big_Tab.png')",
			'mint_section_tab':"url('/Mint_SectionTab.png')",
			'mint_small_tab':"url('/Mint_SmallTab.png')",
			'mint_confirm_menu':"url('/Mint_Confirm_Menu.png')",
			'accessories_tab_active': "url('/AccessoriesTab_Active.png')",
			'background_tab_active': "url('/BackgroundTab_Active.png')",
			'decorations_tab_active': "url('/DecorationsTab_Active.png')",
			'shop_decorations_menu': "url('/Shop_Decorations_Menu.png')",
			'shop_accessories_menu': "url('/Shop_Accessories_Menu.png')",
			'shop_background_menu': "url('/Shop_Backgrounds_Menu.png')",
			'shop_bottom_tab': "url('/Shop_Bottom_Tab.png')",






	













			



			'item-box': "url('/ItemBox.png')",
			'price-box': "url('/Price_Box.png')",
			'price-box_2': "url('/Price_Box_2.png')",
			'price-box_3': "url('/Price_Box_3.png')",


			'pet-tab-box': "url('/Pet_Tab_Box.png')",
			'pet-tab-bg': "url('/Pet_Tab_Bg.png')",








  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
