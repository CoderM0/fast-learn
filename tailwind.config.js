import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                lightbl: "rgb(42 172 222)",
                borange: "rgb(237 146 53)",
                lorange: "#FAB10C",
            },
            transitionProperty: {
                height: "max-height",
                spacing: "margin, padding",
            },
        },
    },

    plugins: [forms],
};
