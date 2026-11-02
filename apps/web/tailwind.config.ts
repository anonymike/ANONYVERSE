import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { ink: "#07090D", anony: "#F04452", lime: "#B7F36B", silver: "#9BA7B8" } } }, plugins: [] };
export default config;
